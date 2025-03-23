'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import TitleBodySlide from './SlideTemplates/TitleBodySlide';
import TitleBulletsSlide from './SlideTemplates/TitleBulletsSlide';
import TitleImageSlide from './SlideTemplates/TitleImageSlide';
import TitleBodyImageSlide from './SlideTemplates/TitleBodyImageSlide';
import TitleBulletsImageSlide from './SlideTemplates/TitleBulletsImageSlide';
import TwoColumnImageSlide from './SlideTemplates/TwoColumnImageSlide';
import { styles, globalStyles } from './styles';
import { Slide } from '@mui/material';

// Import the new components and utilities
import ImageSelector from './components/ImageSelector';
import SlideToolbar from './components/SlideToolbar';
import { getToggleTemplate, isImageTemplate } from './utils/layoutUtils';

// Create a separate component for editable slides
const EditableSlide = React.memo(({ slide, index, updateSlideContent }) => {
  console.log("Rendering EditableSlide with slide data:", slide);
  const { template, title, content, subtitle, imageUrl, leftContent, rightContent, caption } = slide;
  
  // Track active editor with a ref to prevent state updates from causing re-renders
  const [showToolbar, setShowToolbar] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const activeEditorRef = useRef(null);
  
  // Auto-save timeout ref to prevent too many saves
  const saveTimeoutRef = useRef(null);
  
  // Create editor for title
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: title,
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'title';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Use a simple timeout to prevent flickering
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Set a new timeout to save after 500ms of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        updateSlideContent(index, 'title', editor.getHTML());
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });

  // Create editor for content
  const contentEditor = useEditor({
    extensions: [StarterKit],
    content: Array.isArray(content) ? 
      `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      content,
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'content';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Use a simple timeout to prevent flickering
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Set a new timeout to save after 500ms of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        // For bullet lists, extract the list items
        if (template === 'titleBullets' || template === 'titleBulletsImage') {
          const doc = new DOMParser().parseFromString(editor.getHTML(), 'text/html');
          const listItems = Array.from(doc.querySelectorAll('li')).map(li => li.innerHTML);
          updateSlideContent(index, 'content', listItems);
        } else {
          updateSlideContent(index, 'content', editor.getHTML());
        }
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });

  // Create a dedicated bulletsEditor for bullet list layouts
  const bulletsEditor = useEditor({
    extensions: [StarterKit],
    content: Array.isArray(content) ? 
      `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      '<ul><li>Add bullet points here</li></ul>',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'bullets';
      setShowToolbar(true);
    },
    onBlur: () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const doc = new DOMParser().parseFromString(editor.getHTML(), 'text/html');
        const listItems = Array.from(doc.querySelectorAll('li')).map(li => li.innerHTML);
        updateSlideContent(index, 'content', listItems);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });

  // Create editors for left and right columns in twoColumnImage
  const leftColumnEditor = useEditor({
    extensions: [StarterKit],
    content: leftContent?.title || 'Left Column',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'leftTitle';
      setShowToolbar(true);
    },
    onBlur: () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const newLeftContent = {
          ...(leftContent || {}),
          title: editor.getHTML()
        };
        updateSlideContent(index, 'leftContent', newLeftContent);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });
  
  const leftBulletsEditor = useEditor({
    extensions: [StarterKit],
    content: leftContent?.bullets ? 
      `<ul>${leftContent.bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      '<ul><li>Add points here</li></ul>',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'leftBullets';
      setShowToolbar(true);
    },
    onBlur: () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const doc = new DOMParser().parseFromString(editor.getHTML(), 'text/html');
        const bullets = Array.from(doc.querySelectorAll('li')).map(li => li.innerHTML);
        const newLeftContent = {
          ...(leftContent || {}),
          bullets
        };
        updateSlideContent(index, 'leftContent', newLeftContent);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });
  
  const rightColumnEditor = useEditor({
    extensions: [StarterKit],
    content: rightContent?.title || 'Right Column',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'rightTitle';
      setShowToolbar(true);
    },
    onBlur: () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const newRightContent = {
          ...(rightContent || {}),
          title: editor.getHTML()
        };
        updateSlideContent(index, 'rightContent', newRightContent);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });
  
  const rightBulletsEditor = useEditor({
    extensions: [StarterKit],
    content: rightContent?.bullets ? 
      `<ul>${rightContent.bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      '<ul><li>Add points here</li></ul>',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'rightBullets';
      setShowToolbar(true);
    },
    onBlur: () => {
      setTimeout(() => {
        if (!document.activeElement || !document.activeElement.closest('[role="textbox"]')) {
          setShowToolbar(false);
        }
      }, 100);
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        const doc = new DOMParser().parseFromString(editor.getHTML(), 'text/html');
        const bullets = Array.from(doc.querySelectorAll('li')).map(li => li.innerHTML);
        const newRightContent = {
          ...(rightContent || {}),
          bullets
        };
        updateSlideContent(index, 'rightContent', newRightContent);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'false',
        role: 'textbox'
      }
    }
  });

  // Clean up any lingering timeouts on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Get the currently active editor
  const getCurrentEditor = () => {
    if (activeEditorRef.current === 'title') return titleEditor;
    if (activeEditorRef.current === 'content') return contentEditor;
    if (activeEditorRef.current === 'bullets') return bulletsEditor;
    if (activeEditorRef.current === 'leftTitle') return leftColumnEditor;
    if (activeEditorRef.current === 'leftBullets') return leftBulletsEditor;
    if (activeEditorRef.current === 'rightTitle') return rightColumnEditor;
    if (activeEditorRef.current === 'rightBullets') return rightBulletsEditor;
    return null;
  };

  // Add the layout change handler
  const handleLayoutChange = (newTemplate) => {
    if (newTemplate !== template) {
      // If changing to an image template and no image URL exists, add a placeholder
      let updatedSlide = { ...slide, template: newTemplate };
      if (isImageTemplate(newTemplate) && !slide.imageUrl) {
        updatedSlide.imageUrl = 'https://picsum.photos/800/400';
      }
      
      // Update the template
      updateSlideContent(index, 'template', newTemplate);
      
      // If adding an image, also update the imageUrl if needed
      if (updatedSlide.imageUrl && isImageTemplate(newTemplate)) {
        updateSlideContent(index, 'imageUrl', updatedSlide.imageUrl);
      }
    }
  };
  
  // Add the image change handler
  const handleImageChange = (newImageUrl) => {
    updateSlideContent(index, 'imageUrl', newImageUrl);
    setShowImageSelector(false);
  };
  
  // Add handler for undo/redo
  const handleUndoRedo = (action) => {
    const editor = getCurrentEditor();
    if (!editor) return;
    
    if (action === 'undo') {
      editor.chain().focus().undo().run();
    } else if (action === 'redo') {
      editor.chain().focus().redo().run();
    }
  };
  
  // Handler to toggle the image selector
  const handleImageSelect = () => {
    setShowImageSelector(!showImageSelector);
  };

  // Handle toolbar button clicks
  const handleToolbarAction = (action) => {
    const editor = getCurrentEditor();
    if (!editor) return;
    
    // Keep focus on the editor after running the command
    switch (action) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'undo':
        editor.chain().focus().undo().run();
        break;
      case 'redo':
        editor.chain().focus().redo().run();
        break;
      default:
        break;
    }
  };

  const SlideToolbarComponent = () => {
    return (
      <div style={styles.slideToolbar.container}>
        <div style={styles.slideToolbar.buttonGroup}>
          <button
            style={styles.slideToolbar.button}
            title="Undo"
            onClick={() => titleEditor?.chain().focus().undo().run()}
          >
            ↩
          </button>
          <button
            style={styles.slideToolbar.button}
            title="Redo"
            onClick={() => titleEditor?.chain().focus().redo().run()}
          >
            ↪
          </button>
        </div>
        
        <div style={styles.slideToolbar.buttonGroup}>
          <button
            style={styles.slideToolbar.button}
            title="Insert"
          >
            +
          </button>
        </div>

        <div style={styles.slideToolbar.buttonGroup}>
          <button
            style={styles.slideToolbar.button}
            title="Card Styling"
          >
            <span style={{ fontSize: '14px' }}>Style</span>
          </button>
        </div>

        <div style={styles.slideToolbar.buttonGroup}>
          <button
            style={styles.slideToolbar.button}
            title="AI Options"
          >
            <span style={{ fontSize: '14px' }}>AI</span>
          </button>
        </div>

        <div style={styles.slideToolbar.buttonGroup}>
          <button
            style={styles.slideToolbar.button}
            title="Slide Options"
          >
            <span style={{ fontSize: '14px' }}>⋮</span>
          </button>
        </div>
      </div>
    );
  };

  // Toolbar component that works with the active editor
  const FormattingToolbar = () => {
    const editor = getCurrentEditor();
    
    if (!editor) {
      return null;
    }

    return (
      <div 
        style={styles.editor.toolbarContainer}
        data-tiptap-toolbar="true"
        onMouseDown={(e) => {
          // Prevent editor from losing focus when clicking toolbar
          e.preventDefault();
        }}
      >
        <div style={styles.editor.toolbar}>
          <button
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent editor from losing focus
              handleToolbarAction('bold');
            }}
            style={{
              ...styles.editor.toolbarButton,
              fontWeight: 'bold',
              backgroundColor: editor.isActive('bold') ? '#EBE5FF' : 'transparent',
            }}
          >
            B
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('italic');
            }}
            style={{
              ...styles.editor.toolbarButton,
              fontStyle: 'italic',
              backgroundColor: editor.isActive('italic') ? '#EBE5FF' : 'transparent',
            }}
          >
            I
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('strike');
            }}
            style={{
              ...styles.editor.toolbarButton,
              textDecoration: 'line-through',
              backgroundColor: editor.isActive('strike') ? '#EBE5FF' : 'transparent',
            }}
          >
            S
          </button>
          <div style={styles.editor.separator}></div>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('h1');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('heading', { level: 1 }) ? '#EBE5FF' : 'transparent',
            }}
          >
            H1
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('h2');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('heading', { level: 2 }) ? '#EBE5FF' : 'transparent',
            }}
          >
            H2
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('h3');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('heading', { level: 3 }) ? '#EBE5FF' : 'transparent',
            }}
          >
            H3
          </button>
          <div style={styles.editor.separator}></div>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('bulletList');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('bulletList') ? '#EBE5FF' : 'transparent',
            }}
          >
            Bullet
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('orderedList');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('orderedList') ? '#EBE5FF' : 'transparent',
            }}
          >
            Number
          </button>
          <div style={styles.editor.separator}></div>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('blockquote');
            }}
            style={{
              ...styles.editor.toolbarButton,
              backgroundColor: editor.isActive('blockquote') ? '#EBE5FF' : 'transparent',
            }}
          >
            Quote
          </button>
          <div style={styles.editor.separator}></div>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('undo');
            }}
            style={{
              ...styles.editor.toolbarButton,
              opacity: editor.can().undo() ? 1 : 0.5,
            }}
            disabled={!editor.can().undo()}
          >
            Undo
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              handleToolbarAction('redo');
            }}
            style={{
              ...styles.editor.toolbarButton,
              opacity: editor.can().redo() ? 1 : 0.5,
            }}
            disabled={!editor.can().redo()}
          >
            Redo
          </button>
        </div>
      </div>
    );
  };

  // Common title editor for all slide templates
  const TitleEditor = () => (
    <div 
      style={{
        ...styles.slide.title,
        border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
        padding: '5px',
        borderRadius: '4px',
        cursor: 'text',
        minHeight: '60px',
      }}
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation to prevent slide click handler
        if (titleEditor) {
          titleEditor.commands.focus();
          activeEditorRef.current = 'title';
          setShowToolbar(true);
          
          // Make sure the editor is enabled
          if (!titleEditor.isEditable) {
            titleEditor.setEditable(true);
          }
        }
      }}
    >
      <EditorContent editor={titleEditor} />
    </div>
  );

  // Common content editor for all slide templates
  const ContentEditor = () => (
    <div 
      style={{
        ...styles.slide.body,
        border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : '1px solid transparent',
        padding: '5px',
        borderRadius: '4px',
        cursor: 'text',
        minHeight: '100px',
      }}
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation to prevent slide click handler
        if (contentEditor) {
          contentEditor.commands.focus();
          activeEditorRef.current = 'content';
          setShowToolbar(true);
          
          // Make sure the editor is enabled
          if (!contentEditor.isEditable) {
            contentEditor.setEditable(true);
          }
        }
      }}
    >
      <EditorContent editor={contentEditor} />
    </div>
  );

  // Common bulleted list editor for all slide templates
  const BulletsEditor = () => (
    <div 
      style={{
        ...styles.slide.bulletList,
        border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : '1px solid transparent',
        padding: '5px 20px',
        borderRadius: '4px',
        cursor: 'text',
        minHeight: '100px',
      }}
      onClick={(e) => {
        e.stopPropagation(); // Stop propagation to prevent slide click handler
        if (contentEditor) {
          contentEditor.commands.focus();
          activeEditorRef.current = 'content';
          setShowToolbar(true);
          
          // Make sure the editor is enabled
          if (!contentEditor.isEditable) {
            contentEditor.setEditable(true);
          }
        }
      }}
    >
      <EditorContent editor={contentEditor} />
    </div>
  );

  // Remove the complex slide container click handler
  const handleSlideContainerClick = (e) => {
    // Only show toolbar if clicking on an editor element, not the whole slide
    if (!e.target.closest('[role="textbox"]') && 
        !e.target.classList.contains('tiptap-editor-content')) {
      setShowToolbar(false);
    }
  };

  // Render the slide based on the template
  const renderSlide = () => {
    // Create the base slide based on template
    let slideContent;
    
    switch (template) {
      case 'titleBody':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <div style={{
                border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
                marginBottom: '10px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (titleEditor) {
                  titleEditor.commands.focus();
                  activeEditorRef.current = 'title';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!titleEditor.isEditable) {
                    titleEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={titleEditor} />
              </div>
              <div style={{
                border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (contentEditor) {
                  contentEditor.commands.focus();
                  activeEditorRef.current = 'content';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!contentEditor.isEditable) {
                    contentEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={contentEditor} />
              </div>
            </div>
          </article>
        );
        break;
        
      case 'titleBullets':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <div style={{
                border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
                marginBottom: '10px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (titleEditor) {
                  titleEditor.commands.focus();
                  activeEditorRef.current = 'title';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!titleEditor.isEditable) {
                    titleEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={titleEditor} />
              </div>
              <div style={{
                border: activeEditorRef.current === 'bullets' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (bulletsEditor) {
                  bulletsEditor.commands.focus();
                  activeEditorRef.current = 'bullets';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!bulletsEditor.isEditable) {
                    bulletsEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={bulletsEditor} />
              </div>
            </div>
          </article>
        );
        break;
        
      case 'titleImage':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <div style={styles.slide.titleImageContainer}>
                <div style={{
                  border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'text',
                  marginBottom: '10px',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent slide click handler
                  if (titleEditor) {
                    titleEditor.commands.focus();
                    activeEditorRef.current = 'title';
                    setShowToolbar(true);
                    
                    // Make sure the editor is enabled
                    if (!titleEditor.isEditable) {
                      titleEditor.setEditable(true);
                    }
                  }
                }}>
                  <EditorContent editor={titleEditor} />
                </div>
                <div style={styles.slide.imageWrapper}>
                  <img
                    src={imageUrl || 'https://picsum.photos/800/400'}
                    alt={title || 'Slide image'}
                    style={styles.slide.mainImage}
                  />
                </div>
              </div>
            </div>
          </article>
        );
        break;
        
      case 'titleBodyImage':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <div style={{
                border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
                marginBottom: '10px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (titleEditor) {
                  titleEditor.commands.focus();
                  activeEditorRef.current = 'title';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!titleEditor.isEditable) {
                    titleEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={titleEditor} />
              </div>
              <div style={styles.slide.bodyImageContainer}>
                <div style={{
                  border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : '1px solid transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'text',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent slide click handler
                  if (contentEditor) {
                    contentEditor.commands.focus();
                    activeEditorRef.current = 'content';
                    setShowToolbar(true);
                    
                    // Make sure the editor is enabled
                    if (!contentEditor.isEditable) {
                      contentEditor.setEditable(true);
                    }
                  }
                }}>
                  <EditorContent editor={contentEditor} />
                </div>
                <div style={styles.slide.imageWrapper}>
                  <img
                    src={imageUrl || 'https://picsum.photos/800/400'}
                    alt={title || 'Slide image'}
                    style={styles.slide.contentImage}
                  />
                </div>
              </div>
            </div>
          </article>
        );
        break;
        
      case 'titleBulletsImage':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <div style={{
                border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                padding: '5px',
                borderRadius: '4px',
                cursor: 'text',
                marginBottom: '10px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Stop propagation to prevent slide click handler
                if (titleEditor) {
                  titleEditor.commands.focus();
                  activeEditorRef.current = 'title';
                  setShowToolbar(true);
                  
                  // Make sure the editor is enabled
                  if (!titleEditor.isEditable) {
                    titleEditor.setEditable(true);
                  }
                }
              }}>
                <EditorContent editor={titleEditor} />
              </div>
              <div style={styles.slide.bodyImageContainer}>
                <div style={{
                  border: activeEditorRef.current === 'bullets' ? '1px dashed #9D74FF' : '1px solid transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'text',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent slide click handler
                  if (bulletsEditor) {
                    bulletsEditor.commands.focus();
                    activeEditorRef.current = 'bullets';
                    setShowToolbar(true);
                    
                    // Make sure the editor is enabled
                    if (!bulletsEditor.isEditable) {
                      bulletsEditor.setEditable(true);
                    }
                  }
                }}>
                  <EditorContent editor={bulletsEditor} />
                </div>
                <div style={styles.slide.imageWrapper}>
                  <img
                    src={imageUrl || 'https://picsum.photos/800/400'}
                    alt={title || 'Slide image'}
                    style={styles.slide.contentImage}
                  />
                </div>
              </div>
            </div>
          </article>
        );
        break;
        
      case 'twoColumnImage':
        slideContent = (
          <article style={styles.slide.container} onClick={handleSlideContainerClick}>
            <SlideToolbar 
              template={template} 
              onLayoutChange={handleLayoutChange}
              onUndoRedo={handleUndoRedo}
              onImageSelect={handleImageSelect}
            />
            {showToolbar && <FormattingToolbar />}
            <div style={styles.slide.content}>
              <TitleEditor />
              <div style={styles.slide.threeColumnContainer}>
                <div style={styles.slide.column}>
                  <div style={{
                    border: activeEditorRef.current === 'leftTitle' ? '1px dashed #9D74FF' : '1px solid transparent',
                    padding: '5px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop propagation to prevent slide click handler
                    if (leftColumnEditor) {
                      leftColumnEditor.commands.focus();
                      activeEditorRef.current = 'leftTitle';
                      setShowToolbar(true);
                      
                      // Make sure the editor is enabled
                      if (!leftColumnEditor.isEditable) {
                        leftColumnEditor.setEditable(true);
                      }
                    }
                  }}>
                    <EditorContent editor={leftColumnEditor} />
                  </div>
                  <div style={{
                    border: activeEditorRef.current === 'leftBullets' ? '1px dashed #9D74FF' : '1px solid transparent',
                    padding: '5px',
                    borderRadius: '4px',
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop propagation to prevent slide click handler
                    if (leftBulletsEditor) {
                      leftBulletsEditor.commands.focus();
                      activeEditorRef.current = 'leftBullets';
                      setShowToolbar(true);
                      
                      // Make sure the editor is enabled
                      if (!leftBulletsEditor.isEditable) {
                        leftBulletsEditor.setEditable(true);
                      }
                    }
                  }}>
                    <EditorContent editor={leftBulletsEditor} />
                  </div>
                </div>
                <div style={styles.slide.column}>
                  <div style={{
                    border: activeEditorRef.current === 'rightTitle' ? '1px dashed #9D74FF' : '1px solid transparent',
                    padding: '5px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop propagation to prevent slide click handler
                    if (rightColumnEditor) {
                      rightColumnEditor.commands.focus();
                      activeEditorRef.current = 'rightTitle';
                      setShowToolbar(true);
                      
                      // Make sure the editor is enabled
                      if (!rightColumnEditor.isEditable) {
                        rightColumnEditor.setEditable(true);
                      }
                    }
                  }}>
                    <EditorContent editor={rightColumnEditor} />
                  </div>
                  <div style={{
                    border: activeEditorRef.current === 'rightBullets' ? '1px dashed #9D74FF' : '1px solid transparent',
                    padding: '5px',
                    borderRadius: '4px',
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Stop propagation to prevent slide click handler
                    if (rightBulletsEditor) {
                      rightBulletsEditor.commands.focus();
                      activeEditorRef.current = 'rightBullets';
                      setShowToolbar(true);
                      
                      // Make sure the editor is enabled
                      if (!rightBulletsEditor.isEditable) {
                        rightBulletsEditor.setEditable(true);
                      }
                    }
                  }}>
                    <EditorContent editor={rightBulletsEditor} />
                  </div>
                </div>
                <div style={styles.slide.imageColumn}>
                  <img
                    src={imageUrl || 'https://picsum.photos/800/400'}
                    alt={title || 'Slide image'}
                    style={styles.slide.contentImage}
                  />
                </div>
              </div>
            </div>
          </article>
        );
        break;
        
      case 'oneColumnImage':
        slideContent = (
          <div style={styles.slide.content}>
            <article style={styles.slide.article}>
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <div style={{
                  border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : '1px solid transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'text',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent slide click handler
                  if (titleEditor) {
                    titleEditor.commands.focus();
                    activeEditorRef.current = 'title';
                    setShowToolbar(true);
                    
                    // Make sure the editor is enabled
                    if (!titleEditor.isEditable) {
                      titleEditor.setEditable(true);
                    }
                  }
                }}>
                  <EditorContent editor={titleEditor} />
                </div>
                <div style={{
                  border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : '1px solid transparent',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'text',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation to prevent slide click handler
                  if (contentEditor) {
                    contentEditor.commands.focus();
                    activeEditorRef.current = 'content';
                    setShowToolbar(true);
                    
                    // Make sure the editor is enabled
                    if (!contentEditor.isEditable) {
                      contentEditor.setEditable(true);
                    }
                  }
                }}>
                  <EditorContent editor={contentEditor} />
                </div>
              </div>
            </article>
          </div>
        );
        break;
        
      default:
        slideContent = null;
    }
    
    // Add the image selector overlay if needed
    if (showImageSelector) {
      return (
        <div style={{ position: 'relative' }}>
          {slideContent}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <ImageSelector
              onImageSelect={handleImageChange}
              onClose={() => setShowImageSelector(false)}
            />
          </div>
        </div>
      );
    }
    
    return slideContent;
  };

  return renderSlide();
});

const Slides = () => {
  const [presentationData, setPresentationData] = useState([]);
  const [revealLoaded, setRevealLoaded] = useState(false);
  const revealRef = useRef(null);
  
  // Add global styles once when component mounts
  useEffect(() => {
    // Add global styles for TipTap editors
    if (!document.getElementById('tiptap-global-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'tiptap-global-styles';
      styleTag.innerHTML = globalStyles;
      document.head.appendChild(styleTag);
      
      return () => {
        // Clean up styles on unmount
        const styleElement = document.getElementById('tiptap-global-styles');
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, []);

  // Function to update slide content with debounce for auto-save
  const updateSlideContent = (index, field, value) => {
    setPresentationData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      
      // Save to sessionStorage
      try {
        sessionStorage.setItem('presentationData', JSON.stringify(newData));
        console.log(`Auto-saved slide ${index}, field: ${field}`);
      } catch (error) {
        console.error('Error saving to session storage:', error);
      }
      
      return newData;
    });
  };

  // Load presentation data
  useEffect(() => {
    // Get presentation data from sessionStorage
    const storedData = sessionStorage.getItem('presentationData');
    if (storedData) {
      setPresentationData(JSON.parse(storedData));
    } else {
      // Use the existing sample data
      const sampleData = [
        // First vertical group
        {
          template: 'titleBullets',
          title: 'Welcome to Presentation',
          content: [
            'Create professional presentations',
            'Easily add and arrange slides',
            'Choose from multiple layouts',
            'Present with confidence'
          ],
          group: 'intro'
        },
        {
          template: 'titleBodyImage',
          title: 'Key Features',
          content: [
            'Our platform offers a simple yet powerful presentation builder that helps you create engaging slides.',
          ],
          imageUrl: 'https://picsum.photos/id/1005/800/600',
          group: 'intro'
        },
        
        // Standalone horizontal slide - Using titleImage instead of stretchImage
        {
          template: 'titleImage',
          title: 'Full-Size Image Example',
          imageUrl: 'https://picsum.photos/id/1018/1200/800',
        },

        // Second vertical group - Advanced layouts
        {
          template: 'titleBodyImage',
          title: 'Advanced Layout Options',
          content: [
            'Explore different layout configurations for presenting complex information',
          ],
          imageUrl: 'https://picsum.photos/id/1025/800/600',
          group: 'advancedLayouts',
        },
        {
          template: 'twoColumnImage',
          title: 'Two Columns with Image',
          leftContent: {
            title: 'Left Column',
            bullets: ['Point 1', 'Point 2', 'Point 3'],
          },
          rightContent: {
            title: 'Right Column',
            bullets: ['Item A', 'Item B', 'Item C'],
          },
          imageUrl: 'https://picsum.photos/id/1020/800/600',
          group: 'advancedLayouts',
        },

        // Third vertical group - Design tips
        {
          template: 'titleBodyImage',
          title: 'Design Tips',
          content: [
            'Effective strategies for creating visually appealing presentations',
          ],
          imageUrl: 'https://picsum.photos/id/1029/800/600',
          group: 'designTips',
        },
        {
          template: 'titleBulletsImage',
          title: 'Visual Consistency',
          content: [
            'Use a consistent color scheme throughout',
            'Maintain uniform typography and sizing',
            'Align elements to create visual harmony',
          ],
          imageUrl: 'https://picsum.photos/id/1040/800/600',
          group: 'designTips',
        },
        {
          template: 'titleBulletsImage',
          title: 'Image Selection',
          content: [
            'Choose high-quality, relevant images',
            'Consider the emotional impact of your visuals',
            'Ensure proper contrast with text elements',
          ],
          imageUrl: 'https://picsum.photos/id/1050/800/600',
          group: 'designTips',
        },
      ];
      setPresentationData(sampleData);
      sessionStorage.setItem('presentationData', JSON.stringify(sampleData));
    }
  }, []);

  // Initialize Reveal.js
  useEffect(() => {
    if (typeof window !== 'undefined' && presentationData.length > 0 && !revealLoaded) {
      const loadReveal = async () => {
        try {
          const Reveal = (await import('reveal.js')).default;
          if (revealRef.current) {
            const deck = new Reveal(revealRef.current, {
              controls: true,
              progress: true,
              center: true,
              hash: true,
              width: '100%',
              height: '100%',
              transition: 'slide',
              navigationMode: 'default',
              controlsLayout: 'bottom-right',
              controlsTutorial: true,
              margin: 0.05,
              minScale: 0.2,
              maxScale: 2.0,
            });

            await deck.initialize();
            window.Reveal = deck;
            setRevealLoaded(true);
          }
        } catch (error) {
          console.error('Failed to load or initialize Reveal.js:', error);
        }
      };

      loadReveal();
    }
  }, [presentationData, revealLoaded]);

  // Helper to check if we can navigate in a direction
  const canNavigate = (direction) => {
    if (!window.Reveal) return false;
    const routes = window.Reveal.availableRoutes();
    return routes && routes[direction];
  };

  const renderSlides = () => {
    if (presentationData.length === 0) {
      console.log("No presentation data found");
      return (
        <section>
          <h2>No presentation data found</h2>
          <p>Make sure you have stored your presentation data in sessionStorage.</p>
        </section>
      );
    }

    console.log("Rendering slides with data:", presentationData);

    // Group slides by group property if it exists
    const groupedSlides = {};
    presentationData.forEach((slide, idx) => {
      const group = slide.group || `standalone_${Math.random().toString(36).substring(2, 11)}`;
      if (!groupedSlides[group]) {
        groupedSlides[group] = [];
      }
      groupedSlides[group].push({ ...slide, originalIndex: idx });
    });

    console.log("Grouped slides:", groupedSlides);

    // Render slides according to groups
    return Object.keys(groupedSlides).map((group, groupIndex) => {
      const slides = groupedSlides[group];
      console.log(`Rendering group ${group} with ${slides.length} slides`);

      // If this is a standalone slide (no group property in the original slide)
      if (group.startsWith('standalone_') && slides.length === 1) {
        const slide = slides[0];
        console.log(`Rendering standalone slide: ${slide.template}`);
        return (
          <section key={groupIndex} data-transition="slide">
            <EditableSlide 
              slide={slide} 
              index={slide.originalIndex} 
              updateSlideContent={updateSlideContent} 
            />
          </section>
        );
      }

      // If this is a group of vertical slides
      console.log(`Rendering slide group: ${group} with ${slides.length} slides`);
      return (
        <section key={groupIndex} data-transition="slide">
          {slides.map((slide, slideIndex) => (
            <section key={`${groupIndex}-${slideIndex}`} data-transition="slide">
              <EditableSlide 
                slide={slide} 
                index={slide.originalIndex} 
                updateSlideContent={updateSlideContent} 
              />
            </section>
          ))}
        </section>
      );
    });
  };

  // Navigation methods
  const goToNext = () => {
    if (window.Reveal) window.Reveal.next();
  };

  const goToPrev = () => {
    if (window.Reveal) window.Reveal.prev();
  };

  const goToUp = () => {
    if (window.Reveal) window.Reveal.up();
  };

  const goToDown = () => {
    if (window.Reveal) window.Reveal.down();
  };

  const toggleOverview = () => {
    if (window.Reveal) window.Reveal.toggleOverview();
  };

  const refreshSlides = () => {
    if (window.Reveal) {
      window.Reveal.sync();
      window.Reveal.layout();
      console.log('Slides refreshed');
      console.log('Available routes:', window.Reveal.availableRoutes());
    }
  };

  return (
    <div
      className="presentation-wrapper"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Reveal container */}
      <div
        className="reveal"
        ref={revealRef}
        style={{ flex: 1, width: '100%', overflow: 'hidden' }}
      >
        <div className="slides">{renderSlides()}</div>
      </div>

      {/* Navigation controls */}
      <div
        style={{
          padding: '10px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <button
          onClick={goToPrev}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('left')}
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('right')}
        >
          Next
        </button>
        <button
          onClick={goToUp}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('up')}
        >
          Up
        </button>
        <button
          onClick={goToDown}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('down')}
        >
          Down
        </button>
        <button
          onClick={toggleOverview}
          style={{ margin: '0 5px', padding: '5px 15px' }}
        >
          Overview
        </button>
        <button
          onClick={refreshSlides}
          style={{ margin: '0 5px', padding: '5px 15px' }}
        >
          Refresh
        </button>
      </div>

      {/* Debug navigation information */}
      <div
        style={{ padding: '5px', backgroundColor: '#eee', fontSize: '12px' }}
      >
        <strong>Navigation Status:</strong>{' '}
        {revealLoaded
          ? `Routes: ${
              window.Reveal
                ? JSON.stringify(window.Reveal.availableRoutes())
                : 'Calculating...'
            }`
          : 'Reveal not loaded'}
      </div>
    </div>
  );
};

export default Slides;
