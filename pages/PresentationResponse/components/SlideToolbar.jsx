import React, { useState } from 'react';
import { styles } from '../styles';
import { isImageTemplate, getToggleTemplate, getAllTemplates } from '../utils/layoutUtils';

const SlideToolbar = ({ template, onLayoutChange, onUndoRedo, onImageSelect }) => {
  // State for dropdown menus
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  
  // Helper to check if current template has an image
  const hasImage = isImageTemplate(template);
  
  // Get all available slide templates
  const slideTemplates = getAllTemplates();
  
  const buttonStyles = {
    base: {
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '6px 10px',
      margin: '0 4px',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '32px',
      height: '32px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease',
      color: '#333',
    },
    hover: {
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    active: {
      backgroundColor: '#f0f0f0',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    },
    icon: {
      marginRight: '5px',
      fontSize: '14px',
    }
  };
  
  return (
    <div style={{
      ...styles.slideToolbar.container,
      padding: '8px 10px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e1e4e8',
      borderRadius: '4px 4px 0 0',
    }}>
      <div style={styles.slideToolbar.buttonGroup}>
        <button
          style={buttonStyles.base}
          title="Undo"
          onClick={() => onUndoRedo('undo')}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyles.base)}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, buttonStyles.active)}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
        >
          <span style={{ fontSize: '16px' }}>↩</span>
        </button>
        <button
          style={buttonStyles.base}
          title="Redo"
          onClick={() => onUndoRedo('redo')}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyles.base)}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, buttonStyles.active)}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
        >
          <span style={{ fontSize: '16px' }}>↪</span>
        </button>
      </div>
      
      <div style={styles.slideToolbar.buttonGroup}>
        <button
          style={buttonStyles.base}
          title="Insert"
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyles.base)}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, buttonStyles.active)}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
        >
          <span style={{ fontSize: '16px' }}>+</span>
        </button>
      </div>

      <div style={styles.slideToolbar.buttonGroup}>
        <button
          style={{
            ...buttonStyles.base,
            minWidth: '70px',
          }}
          title="Card Styling"
          onMouseOver={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.hover, minWidth: '70px'})}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.base, minWidth: '70px'})}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.active, minWidth: '70px'})}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.hover, minWidth: '70px'})}
        >
          <span style={buttonStyles.icon}>🎨</span>
          <span>Style</span>
        </button>
      </div>
      
      <div style={styles.slideToolbar.buttonGroup}>
        <button
          style={{
            ...buttonStyles.base,
            minWidth: '70px',
          }}
          title={hasImage ? "Change Image" : "Add Image"}
          onClick={() => onImageSelect()}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.hover, minWidth: '70px'})}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.base, minWidth: '70px'})}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.active, minWidth: '70px'})}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, {...buttonStyles.hover, minWidth: '70px'})}
        >
          <span style={buttonStyles.icon}>🖼️</span>
          <span>Image</span>
        </button>
      </div>

      <div style={{...styles.slideToolbar.buttonGroup, position: 'relative'}}>
        <button
          style={buttonStyles.base}
          title="Slide Options"
          onClick={() => setShowOptionsMenu(!showOptionsMenu)}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyles.base)}
          onMouseDown={(e) => Object.assign(e.currentTarget.style, buttonStyles.active)}
          onMouseUp={(e) => Object.assign(e.currentTarget.style, buttonStyles.hover)}
        >
          <span style={{ fontSize: '16px' }}>⋮</span>
        </button>
        
        {showOptionsMenu && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '6px',
            padding: '5px 0',
            zIndex: 1000,
            minWidth: '220px',
            marginTop: '5px',
            border: '1px solid #eaeaea',
          }}>
            <div style={{ 
              padding: '8px 15px',
              fontSize: '12px',
              color: '#777',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #eee',
              letterSpacing: '0.5px',
            }}>
              Change Layout
            </div>
            
            {/* Text-based templates */}
            <div style={{ 
              padding: '8px 15px', 
              fontSize: '12px', 
              color: '#777', 
              fontWeight: 'bold',
              letterSpacing: '0.5px',
            }}>
              Text Layouts
            </div>
            {slideTemplates.text.map(item => (
              <button 
                key={item.id}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 15px',
                  paddingLeft: '25px',
                  border: 'none',
                  backgroundColor: template === item.id ? '#f0f0f0' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  position: 'relative',
                  color: '#333',
                  transition: 'background-color 0.2s ease',
                }}
                onClick={() => {
                  onLayoutChange(item.id);
                  setShowOptionsMenu(false);
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = template === item.id ? '#e8e8e8' : '#f5f5f5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = template === item.id ? '#f0f0f0' : 'transparent';
                }}
              >
                {template === item.id && (
                  <span style={{ 
                    position: 'absolute', 
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '10px',
                    color: '#9D74FF',
                  }}>✓</span>
                )}
                {item.name}
              </button>
            ))}
            
            {/* Image-based templates */}
            <div style={{ 
              padding: '8px 15px', 
              fontSize: '12px', 
              color: '#777', 
              fontWeight: 'bold',
              marginTop: '5px',
              borderTop: '1px solid #eee',
              letterSpacing: '0.5px',
            }}>
              Image Layouts
            </div>
            {slideTemplates.image.map(item => (
              <button 
                key={item.id}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 15px',
                  paddingLeft: '25px',
                  border: 'none',
                  backgroundColor: template === item.id ? '#f0f0f0' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  position: 'relative',
                  color: '#333',
                  transition: 'background-color 0.2s ease',
                }}
                onClick={() => {
                  onLayoutChange(item.id);
                  setShowOptionsMenu(false);
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = template === item.id ? '#e8e8e8' : '#f5f5f5';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = template === item.id ? '#f0f0f0' : 'transparent';
                }}
              >
                {template === item.id && (
                  <span style={{ 
                    position: 'absolute', 
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '10px',
                    color: '#9D74FF',
                  }}>✓</span>
                )}
                {item.name}
              </button>
            ))}
            
            <div style={{ borderTop: '1px solid #eee', margin: '5px 0' }}></div>
            
            {/* Other actions */}
            <button 
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 15px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ marginRight: '8px', color: '#e74c3c' }}>🗑️</span>
              Delete Slide
            </button>
            <button 
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 15px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ marginRight: '8px', color: '#3498db' }}>📋</span>
              Duplicate Slide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideToolbar; 