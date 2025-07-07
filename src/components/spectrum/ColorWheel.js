import React, { useState, useRef, useCallback, useEffect } from 'react';
import './ColorWheel.css';

const ColorWheel = ({ 
  value = { hue: 0, saturation: 100, value: 100 },
  disabled = false,
  size = 'medium',
  onChange,
  onChangeEnd,
  ...props 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ angle: 0, distance: 0 });
  const wheelRef = useRef(null);
  const handleRef = useRef(null);

  // Convert HSV to polar coordinates for positioning
  const hsvToPolar = useCallback((hue, saturation) => {
    const angle = (hue * Math.PI) / 180;
    const distance = saturation / 100;
    return { angle, distance };
  }, []);

  // Convert polar coordinates to HSV
  const polarToHsv = useCallback((angle, distance) => {
    const hue = ((angle * 180) / Math.PI + 360) % 360;
    const saturation = Math.min(100, distance * 100);
    return { hue, saturation };
  }, []);

  // Calculate position from mouse/touch coordinates
  const getPositionFromEvent = useCallback((e) => {
    if (!wheelRef.current) return position;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    
    const x = clientX - rect.left - centerX;
    const y = clientY - rect.top - centerY;
    
    const angle = Math.atan2(y, x);
    const distance = Math.min(1, Math.sqrt(x * x + y * y) / (centerX * 0.9)); // 0.9 to keep within wheel bounds
    
    return { angle, distance };
  }, [position]);

  // Update color based on position
  const updateColor = useCallback((newPosition) => {
    const { hue, saturation } = polarToHsv(newPosition.angle, newPosition.distance);
    
    if (onChange) {
      onChange({
        hue: Math.round(hue),
        saturation: Math.round(saturation),
        value: value.value
      });
    }
  }, [onChange, polarToHsv, value.value]);

  // Handle mouse/touch start
  const handleStart = useCallback((e) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    const newPosition = getPositionFromEvent(e);
    setPosition(newPosition);
    updateColor(newPosition);
  }, [disabled, getPositionFromEvent, updateColor]);

  // Handle mouse/touch move
  const handleMove = useCallback((e) => {
    if (!isDragging || disabled) return;
    
    e.preventDefault();
    const newPosition = getPositionFromEvent(e);
    setPosition(newPosition);
    updateColor(newPosition);
  }, [isDragging, disabled, getPositionFromEvent, updateColor]);

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (isDragging && onChangeEnd) {
      const { hue, saturation } = polarToHsv(position.angle, position.distance);
      onChangeEnd({
        hue: Math.round(hue),
        saturation: Math.round(saturation),
        value: value.value
      });
    }
    setIsDragging(false);
  }, [isDragging, onChangeEnd, polarToHsv, position, value.value]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (disabled) return;

    let newAngle = position.angle;
    let newDistance = position.distance;
    const step = Math.PI / 36; // 5 degrees
    const distanceStep = 0.05; // 5% saturation

    switch (e.key) {
      case 'ArrowLeft':
        newAngle -= step;
        break;
      case 'ArrowRight':
        newAngle += step;
        break;
      case 'ArrowUp':
        newDistance = Math.min(1, newDistance + distanceStep);
        break;
      case 'ArrowDown':
        newDistance = Math.max(0, newDistance - distanceStep);
        break;
      default:
        return;
    }

    e.preventDefault();
    const newPosition = { angle: newAngle, distance: newDistance };
    setPosition(newPosition);
    updateColor(newPosition);
  }, [disabled, position, updateColor]);

  // Update position when value changes externally
  useEffect(() => {
    const newPosition = hsvToPolar(value.hue, value.saturation);
    setPosition(newPosition);
  }, [value.hue, value.saturation, hsvToPolar]);

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleMove(e);
      const handleMouseUp = () => handleEnd();
      const handleTouchMove = (e) => handleMove(e);
      const handleTouchEnd = () => handleEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  // Calculate handle position
  const handlePosition = {
    left: `${50 + position.distance * 45 * Math.cos(position.angle)}%`,
    top: `${50 + position.distance * 45 * Math.sin(position.angle)}%`
  };

  // Calculate handle color
  const handleColor = `hsl(${value.hue}, ${value.saturation}%, ${Math.max(20, Math.min(80, value.value))}%)`;

  const classNames = [
    'spectrum-colorwheel',
    `spectrum-colorwheel--size-${size}`,
    disabled && 'spectrum-colorwheel--disabled',
    isDragging && 'spectrum-colorwheel--dragging'
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <div
        ref={wheelRef}
        className="spectrum-colorwheel-wheel"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        role="slider"
        aria-label="Color wheel"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(value.hue)}
        aria-valuetext={`Hue: ${Math.round(value.hue)}°, Saturation: ${Math.round(value.saturation)}%`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <div 
          ref={handleRef}
          className="spectrum-colorwheel-handle"
          style={{ 
            ...handlePosition,
            backgroundColor: handleColor
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ColorWheel; 