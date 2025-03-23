import React from 'react';
import { EditorContent } from '@tiptap/react';

import { styles } from '../styles';

const TitleImageSlide = ({
  titleEditor,
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
        <div style={styles.slide.titleImageContainer}>
          <div style={styles.slide.imageWrapper}>
            <img
              src={imageUrl}
              alt="Slide image"
              style={styles.slide.mainImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleImageSlide;
