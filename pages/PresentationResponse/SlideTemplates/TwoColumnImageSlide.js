import React from 'react';
import { EditorContent } from '@tiptap/react';

import { styles } from '../styles';

const TwoColumnImageSlide = ({
  titleEditor,
  leftColumnEditor,
  leftBulletsEditor,
  rightColumnEditor,
  rightBulletsEditor,
  handleEditorClick,
  getEditorContainerStyle,
  handleSlideContainerClick,
  SlideToolbar,
  FormattingToolbar,
  showToolbar,
  template,
  handleLayoutChange,
  handleUndoRedo,
  handleImageSelect,
  imageUrl = 'https://picsum.photos/800/400'
}) => {
  return (
    <article style={styles.slide.container} onClick={handleSlideContainerClick}>
      <SlideToolbar 
        template={template} 
        onLayoutChange={handleLayoutChange}
        onUndoRedo={handleUndoRedo}
        onImageSelect={handleImageSelect}
      />
      {showToolbar && <FormattingToolbar />}
      <div style={styles.slide.content}>
        <div 
          style={getEditorContainerStyle('title', { marginBottom: '10px' })}
          onClick={handleEditorClick(titleEditor, 'title')}
        >
          <EditorContent editor={titleEditor} />
        </div>
        <div style={styles.slide.threeColumnContainer}>
          <div style={styles.slide.column}>
            <div 
              style={getEditorContainerStyle('leftTitle', { marginBottom: '10px' })}
              onClick={handleEditorClick(leftColumnEditor, 'leftTitle')}
            >
              <EditorContent editor={leftColumnEditor} />
            </div>
            <div 
              style={getEditorContainerStyle('leftBullets')}
              onClick={handleEditorClick(leftBulletsEditor, 'leftBullets')}
            >
              <EditorContent editor={leftBulletsEditor} />
            </div>
          </div>
          <div style={styles.slide.column}>
            <div 
              style={getEditorContainerStyle('rightTitle', { marginBottom: '10px' })}
              onClick={handleEditorClick(rightColumnEditor, 'rightTitle')}
            >
              <EditorContent editor={rightColumnEditor} />
            </div>
            <div 
              style={getEditorContainerStyle('rightBullets')}
              onClick={handleEditorClick(rightBulletsEditor, 'rightBullets')}
            >
              <EditorContent editor={rightBulletsEditor} />
            </div>
          </div>
          <div style={styles.slide.imageColumn}>
            <img
              src={imageUrl}
              alt="Slide image"
              style={styles.slide.contentImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TwoColumnImageSlide;
