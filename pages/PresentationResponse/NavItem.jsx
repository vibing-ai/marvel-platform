import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { styles } from './styles';

const ItemTypes = {
  SLIDE: 'slide'
};

const NavItem = ({ number, text, id, index, moveSlide }) => {
  // Create a ref for the drop target
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SLIDE,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SLIDE,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveSlide(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  // Initialize drag and drop refs
  drag(drop(ref));
  
  const opacity = isDragging ? 0.4 : 1;
  const backgroundColor = isDragging ? '#f0f0f0' : 'transparent';
  const border = isDragging ? '1px dashed #ccc' : 'none';
  
  const style = {
    ...styles.navItem.container,
    opacity,
    backgroundColor,
    border,
    cursor: 'move',
    boxShadow: isDragging ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'opacity 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.1s',
    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
  };

  return (
    <div
      ref={ref}
      style={style}
      role="button"
      tabIndex={0}
      data-handler-id={handlerId}
      aria-label={`Slide ${number}: ${text}`}
    >
      <span style={styles.navItem.number}>{number}</span>
      <span style={styles.navItem.text}>{text}</span>
    </div>
  );
};

export default NavItem;