import React, { useState, useRef } from 'react';
import { styles } from '../styles';

const ImageSelector = ({ onImageSelect, onClose }) => {
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef(null);
  
  // Sample images for quick selection
  const sampleImages = [
    'https://picsum.photos/800/400',
    'https://picsum.photos/id/1015/800/400',
    'https://picsum.photos/id/1018/800/400',
    'https://picsum.photos/id/1019/800/400',
    'https://picsum.photos/id/1025/800/400',
    'https://picsum.photos/id/1035/800/400'
  ];
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: 0 }}>Select Image</h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0 5px'
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px',
        maxHeight: '300px',
        overflowY: 'auto',
        width: '100%'
      }}>
        {sampleImages.map((src, i) => (
          <div 
            key={i}
            style={{
              width: '150px',
              height: '100px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              ':hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => onImageSelect(src)}
          >
            <img 
              src={src}
              alt={`Sample ${i+1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '450px'
      }}>
        {/* File upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Upload from computer
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileUpload}
        />
        
        {/* URL input */}
        <div style={{
          display: 'flex',
          width: '100%'
        }}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && inputUrl) {
                onImageSelect(inputUrl);
              }
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px 0 0 4px',
              border: '1px solid #ddd',
              borderRight: 'none'
            }}
          />
          <button
            onClick={() => {
              if (inputUrl) {
                onImageSelect(inputUrl);
              }
            }}
            style={{
              backgroundColor: '#9D74FF',
              color: 'white',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              padding: '0 15px',
              cursor: inputUrl ? 'pointer' : 'not-allowed',
              opacity: inputUrl ? 1 : 0.7
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector; 