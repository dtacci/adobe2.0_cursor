import React, { useState, useEffect } from 'react';
import './BuggyComponent.css';

const BuggyComponent = ({ data, onUpdate }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // BUG 1: Logic error - wrong comparison operator
  useEffect(() => {
    if (data.length = 0) { // Should be === not =
      setItems([]);
      return;
    }
    
    // BUG 2: Missing error handling for async operation
    fetchData();
  }, [data]); // BUG 3: Missing fetchData in dependency array

  // BUG 4: Async function without proper error handling
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('/api/data'); // No try-catch
    const result = await response.json();
    setItems(result);
    setLoading(false);
  };

  // BUG 5: Performance issue - creating new object on every render
  const processItems = () => {
    return items.map(item => {
      return {
        ...item,
        processed: true,
        timestamp: new Date() // New object every render
      };
    });
  };

  // BUG 6: Potential XSS vulnerability
  const renderHTML = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  // BUG 7: Infinite loop potential
  const handleClick = (id) => {
    const newItems = items.map(item => {
      if (item.id = id) { // Should be === not =
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setItems(newItems);
    onUpdate(newItems); // Could cause parent re-render and infinite loop
  };

  // BUG 8: Type mismatch - expecting string but might get number
  const formatPrice = (price) => {
    return price.toFixed(2); // Will crash if price is not a number
  };

  // BUG 9: Memory leak - not cleaning up event listener
  useEffect(() => {
    const handleScroll = () => {
      console.log('scrolling');
    };
    window.addEventListener('scroll', handleScroll);
    // Missing cleanup function
  }, []);

  // BUG 10: Incorrect conditional rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; // error might be string, not object
  }

  return (
    <div className="buggy-component">
      <h2>Buggy Component</h2>
      {/* BUG 11: Missing key prop in list */}
      {processItems().map(item => (
        <div onClick={() => handleClick(item.id)}>
          <span>{item.name}</span>
          <span>{formatPrice(item.price)}</span>
          {renderHTML(item.description)}
        </div>
      ))}
    </div>
  );
};

export default BuggyComponent; 