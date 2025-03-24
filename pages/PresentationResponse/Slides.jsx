'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Import the template components
import TitleBodySlide from './SlideTemplates/TitleBodySlide';
import TitleBulletsSlide from './SlideTemplates/TitleBulletsSlide';
import TitleImageSlide from './SlideTemplates/TitleImageSlide';
import TitleBodyImageSlide from './SlideTemplates/TitleBodyImageSlide';
import TitleBulletsImageSlide from './SlideTemplates/TitleBulletsImageSlide';
import TwoColumnImageSlide from './SlideTemplates/TwoColumnImageSlide';
import OneColumnImageSlide from './SlideTemplates/OneColumnImageSlide';
import StretchImageSlide from './SlideTemplates/StretchImageSlide';

import { styles, globalStyles } from './styles';
import { Slide } from '@mui/material';

// Import the new components and utilities
import ImageSelector from './components/ImageSelector';
import SlideToolbar from './components/SlideToolbar';
import { getToggleTemplate, isImageTemplate } from './utils/layoutUtils';
import FormattingToolbar from './components/FormattingToolbar';

/**
 * EditableSlide Component
 * 
 * A dedicated component for handling editable slides with TipTap editor integration.
 * This component manages editor state, focus, and content updates for each slide.
 * 
 * Architecture:
 * - Uses TipTap editors for rich text editing
 * - Manages focus state and active editor tracking
 * - Handles content updates and auto-save functionality
 * - Supports different slide templates with specialized editors
 */
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
    content: title || '',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'title';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Simple timeout to prevent flickering
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
    content: Array.isArray(content) && (template === 'titleBullets' || template === 'titleBulletsImage') ? 
      `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      Array.isArray(content) ? 
      `<p>${content.join('</p><p>')}</p>` : 
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
      content ? `<ul><li>${content}</li></ul>` : '<ul><li></li></ul>',
    editable: true,
    onFocus: () => {
      activeEditorRef.current = 'bullets';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Simple timeout to prevent flickering
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
        const doc = new DOMParser().parseFromString(editor.getHTML(), 'text/html');
        const listItems = Array.from(doc.querySelectorAll('li')).map(li => li.innerHTML);
        updateSlideContent(index, 'bullets', listItems);
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
      // Simple timeout to prevent flickering
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
      // Simple timeout to prevent flickering
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
      // Simple timeout to prevent flickering
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
      // Simple timeout to prevent flickering
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

  // Get the current active editor based on activeEditorRef
  const getCurrentEditor = () => {
    if (!activeEditorRef.current) return null;
    
    switch (activeEditorRef.current) {
      case 'title':
        return titleEditor;
      case 'content':
        return contentEditor;
      case 'bullets':
        return bulletsEditor;
      case 'leftTitle':
        return leftColumnEditor;
      case 'rightTitle':
        return rightColumnEditor;
      case 'leftBullets':
        return leftBulletsEditor;
      case 'rightBullets':
        return rightBulletsEditor;
      default:
        return null;
    }
  };

  // Handle toolbar actions
  const handleToolbarAction = (action) => {
    const editor = getCurrentEditor();
    if (!editor) return;
    
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

  // Helper for creating editor container styles
  const getEditorContainerStyle = (editorType, additionalStyle = {}) => {
    const isActive = activeEditorRef.current === editorType;
    let baseStyle = {
      position: 'relative',
      border: isActive ? '1px solid #0D0D36' : '1px solid transparent',
      padding: '8px',
      borderRadius: '4px',
      transition: 'border-color 0.2s ease',
      minHeight: editorType.includes('Title') ? '45px' : '100px',
      ...additionalStyle,
    };

    // Add specific styles for body vs bullets content
    if (editorType === 'content') {
      baseStyle.className = 'body-content';
    } else if (editorType === 'bullets') {
      baseStyle.className = 'bullets-content';
    }

    return baseStyle;
  };

  // Handle image selection
  const handleImageSelect = () => {
    setShowImageSelector(true);
  };

  // Handle image change
  const handleImageChange = (url) => {
    updateSlideContent(index, 'imageUrl', url);
    setShowImageSelector(false);
  };

  // Handle undo/redo shortcuts
  const handleUndoRedo = (action) => {
    const editor = getCurrentEditor();
    if (!editor) return;
    
    if (action === 'undo') {
      editor.chain().undo().run();
    } else if (action === 'redo') {
      editor.chain().redo().run();
    }
  };

  // Handle layout changes
  const handleLayoutChange = (newTemplate) => {
    updateSlideContent(index, 'template', newTemplate);
  };

  // Handle click on slide container
  const handleSlideContainerClick = (e) => {
    // Don't hide toolbar if clicked within editor or toolbar
    if (!e.target.closest('[role="textbox"]') && 
        !e.target.classList.contains('tiptap-editor-content')) {
      setShowToolbar(false);
    }
  };

  // Helper function for editor click handling
  const handleEditorClick = (editor, editorType) => (e) => {
    e.stopPropagation(); // Stop propagation to prevent slide click handler
    if (editor) {
      editor.commands.focus();
      activeEditorRef.current = editorType;
      setShowToolbar(true);
      
      // Make sure the editor is enabled
      if (!editor.isEditable) {
        editor.setEditable(true);
      }
    }
  };

  // Render the slide based on the template using template components
  const renderSlide = () => {
    // Common props for all template components
    const commonProps = {
      titleEditor,
      handleEditorClick,
      getEditorContainerStyle,
      handleSlideContainerClick,
      SlideToolbar,
      FormattingToolbar: () => showToolbar && 
        <FormattingToolbar 
          editor={getCurrentEditor()} 
          handleToolbarAction={handleToolbarAction} 
        />,
      showToolbar,
      template,
      handleLayoutChange,
      handleUndoRedo,
      handleImageSelect,
      imageUrl: imageUrl || undefined
    };
    
    // Switch based on template type to render the appropriate component
    switch (template) {
      case 'titleBody':
        return (
          <TitleBodySlide 
            {...commonProps}
            contentEditor={contentEditor}
          />
        );
        
      case 'titleBullets':
        return (
          <TitleBulletsSlide 
            {...commonProps}
            bulletsEditor={bulletsEditor}
          />
        );
        
      case 'titleImage':
        return (
          <TitleImageSlide 
            {...commonProps}
          />
        );
        
      case 'titleBodyImage':
        return (
          <TitleBodyImageSlide 
            {...commonProps}
            contentEditor={contentEditor}
          />
        );
        
      case 'titleBulletsImage':
        return (
          <TitleBulletsImageSlide 
            {...commonProps}
            bulletsEditor={bulletsEditor}
          />
        );
        
      case 'twoColumnImage':
        return (
          <TwoColumnImageSlide 
            {...commonProps}
            leftColumnEditor={leftColumnEditor}
            leftBulletsEditor={leftBulletsEditor}
            rightColumnEditor={rightColumnEditor}
            rightBulletsEditor={rightBulletsEditor}
          />
        );

      case 'oneColumnImage':
        return (
          <OneColumnImageSlide
            {...commonProps}
            contentEditor={contentEditor}
          />
        );

      case 'stretchImage':
        return (
          <StretchImageSlide
            {...commonProps}
          />
        );
        
      default:
        return (
          <div style={styles.slide.container}>
            <h2>Unsupported template: {template}</h2>
            <p>Please select a different template</p>
          </div>
        );
    }
  };
  
  // If showImageSelector is true, render the ImageSelector as an overlay
  if (showImageSelector) {
    return (
      <div style={{ position: 'relative' }}>
        {renderSlide()}
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

  return renderSlide();
});

/**
 * Slides Component
 * 
 * Main component responsible for rendering and managing presentation slides.
 * Integrates with Reveal.js for presentation navigation and slide transitions.
 * 
 * Features:
 * - Loading and saving presentation data from sessionStorage
 * - Rendering slides with different templates
 * - Supporting vertical and horizontal slide navigation
 * - Managing slide groups for organized presentations
 * - Providing navigation controls
 */
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
