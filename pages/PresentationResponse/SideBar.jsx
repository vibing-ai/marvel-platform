import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import NavItem from './NavItem';
import { styles } from './styles';

const STORAGE_KEY = 'presentationData';

const Sidebar = () => {
  const [presentationData, setPresentationData] = useState([]);

  // Load data from session storage on component mount
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPresentationData(parsedData);
      }
    } catch (error) {
      console.error('Error loading presentation data:', error);
    }
  }, []);

  // Handle slide reordering with memoized callback
  const moveSlide = useCallback((dragIndex, hoverIndex) => {
    // Skip if indices are invalid
    if (dragIndex < 0 || hoverIndex < 0 || 
        dragIndex >= presentationData.length || 
        hoverIndex >= presentationData.length) {
      return;
    }
    
    setPresentationData(prevSlides => {
      // Create a new array to avoid mutations
      const newSlides = [...prevSlides];
      
      // Remove the dragged item
      const draggedSlide = newSlides[dragIndex];
      
      // Safety check
      if (!draggedSlide) return prevSlides;
      
      // Remove from old position and insert at new position
      newSlides.splice(dragIndex, 1);
      newSlides.splice(hoverIndex, 0, draggedSlide);
      
      // Save the updated order to session storage
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSlides));
      } catch (error) {
        console.error('Error saving presentation data:', error);
      }
      
      return newSlides;
    });
  }, [presentationData.length]);

  return (
    <DndProvider backend={HTML5Backend}>
      <nav style={{
        ...styles.sidebar.container,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <div style={{
          ...styles.sidebar.navItems,
          flex: 1,
          overflowY: 'auto'
        }}>
          {presentationData.length > 0 ? (
            presentationData.map((slide, index) => (
              <NavItem
                key={`slide-${slide.id || index}`}
                id={slide.id || index}
                index={index}
                number={index + 1}
                text={slide.title || `Slide ${index + 1}`}
                moveSlide={moveSlide}
              />
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No slides available
            </div>
          )}
        </div>
      </nav>
    </DndProvider>
  );
};

export default Sidebar;