import React from 'react';
import { EditorContent } from '@tiptap/react';

import { styles } from '../styles';

const TitleBodySlide = ({ 
  titleEditor, 
  contentEditor, 
  handleEditorClick, 
  getEditorContainerStyle,
  handleSlideContainerClick,
  SlideToolbar,
  FormattingToolbar,
  showToolbar,
  template,
  handleLayoutChange,
  handleUndoRedo,
  handleImageSelect
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
        <div 
          style={getEditorContainerStyle('content')}
          onClick={handleEditorClick(contentEditor, 'content')}
        >
          <EditorContent editor={contentEditor} />
        </div>
      </div>
    </article>
  );
};

export default TitleBodySlide;
