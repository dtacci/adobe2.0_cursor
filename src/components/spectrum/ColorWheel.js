import React, { useState, useRef, useCallback, useEffect } from 'react';
import './ColorWheel.css';

const ColorWheel = ({ 
  value = 0, // hue value from 0-360
  disabled = false,
  size = 'medium',
  onChange,
  onChangeEnd,
  className = '',
  ...props 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const wheelRef = useRef(null);
  const handleRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;

  // Convert hue to angle (0-360 degrees)
  const angle = currentValue;

  // Calculate handle position
  const wheelRadius = 80; // Base radius for calculations
  const handleRadius = wheelRadius - 10; // Handle positioned slightly inside the wheel
  const angleRad = (angle * Math.PI) / 180;
  const handleX = 50 + (handleRadius / wheelRadius) * 50 * Math.cos(angleRad - Math.PI / 2);
  const handleY = 50 + (handleRadius / wheelRadius) * 50 * Math.sin(angleRad - Math.PI / 2);

  const updateHue = useCallback((clientX, clientY) => {
    if (!wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Calculate angle in degrees (0-360)
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // Normalize to 0-360 with 0 at top
    
    const newValue = Math.round(angle);
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  }, [value, onChange]);

  const handleMouseDown = useCallback((e) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    updateHue(e.clientX, e.clientY);
  }, [disabled, updateHue]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || disabled) return;
    updateHue(e.clientX, e.clientY);
  }, [isDragging, disabled, updateHue]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (onChangeEnd) {
        onChangeEnd(currentValue);
      }
    }
  }, [isDragging, onChangeEnd, currentValue]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;

    let newValue = currentValue;
    const step = e.shiftKey ? 10 : 1;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = (currentValue - step + 360) % 360;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = (currentValue + step) % 360;
        break;
      case 'Home':
        e.preventDefault();
        newValue = 0;
        break;
      case 'End':
        e.preventDefault();
        newValue = 359;
        break;
      default:
        return;
    }

    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
    
    if (onChangeEnd) {
      onChangeEnd(newValue);
    }
  }, [disabled, currentValue, value, onChange, onChangeEnd]);

  // Global mouse event handlers for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const classNames = [
    'spectrum-colorwheel',
    `spectrum-colorwheel--size-${size}`,
    disabled && 'spectrum-colorwheel--disabled',
    isDragging && 'spectrum-colorwheel--dragging',
    className
  ].filter(Boolean).join(' ');

  const wheelStyle = {
    background: `conic-gradient(
      hsl(0, 100%, 50%) 0deg,
      hsl(60, 100%, 50%) 60deg,
      hsl(120, 100%, 50%) 120deg,
      hsl(180, 100%, 50%) 180deg,
      hsl(240, 100%, 50%) 240deg,
      hsl(300, 100%, 50%) 300deg,
      hsl(360, 100%, 50%) 360deg
    )`
  };

  const handleStyle = {
    left: `${handleX}%`,
    top: `${handleY}%`,
    backgroundColor: `hsl(${currentValue}, 100%, 50%)`
  };

  return (
    <div className={classNames} {...props}>
      <div 
        ref={wheelRef}
        className="spectrum-colorwheel-gradient"
        style={wheelStyle}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-label="Color wheel hue selection"
        aria-valuenow={currentValue}
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuetext={`${currentValue} degrees hue`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <div 
          ref={handleRef}
          className="spectrum-colorwheel-handle"
          style={handleStyle}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ColorWheel; 