'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import StretchImageSlide from './SlideTemplates/StretchImageSlide';
import TitleBodyImageSlide from './SlideTemplates/TitleBodyImageSlide';
import TitleBodySlide from './SlideTemplates/TitleBodySlide';

// Import slide templates
import TitleBulletsImageSlide from './SlideTemplates/TitleBulletsImageSlide';
import TitleBulletsSlide from './SlideTemplates/TitleBulletsSlide';
// Import image slide templates
import TitleImageSlide from './SlideTemplates/TitleImageSlide';
import TwoColumnImageSlide from './SlideTemplates/TwoColumnImageSlide';
import { styles } from './styles';

// Create a separate component for editable slides
const EditableSlide = React.memo(({ slide, index, updateSlideContent }) => {
  const { template, title, content, subtitle, imageUrl, leftContent, rightContent, caption } = slide;
  
  // Track active editor with a ref to prevent state updates from causing re-renders
  const [showToolbar, setShowToolbar] = useState(false);
  const activeEditorRef = useRef(null);
  
  // Auto-save timeout ref to prevent too many saves
  const saveTimeoutRef = useRef(null);
  
  // Create editor for title
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: title,
    onFocus: () => {
      activeEditorRef.current = 'title';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Don't set activeEditor to null here to allow toolbar interactions
      // We'll hide the toolbar after a short delay
      setTimeout(() => {
        if (activeEditorRef.current === 'title') {
          setShowToolbar(false);
        }
      }, 250);
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
    }
  });

  // Create editor for content
  const contentEditor = useEditor({
    extensions: [StarterKit],
    content: Array.isArray(content) ? 
      `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>` : 
      content,
    onFocus: () => {
      activeEditorRef.current = 'content';
      setShowToolbar(true);
    },
    onBlur: () => {
      // Don't set activeEditor to null here to allow toolbar interactions
      // We'll hide the toolbar after a short delay
      setTimeout(() => {
        if (activeEditorRef.current === 'content') {
          setShowToolbar(false);
        }
      }, 250);
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
    return null;
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

  // Toolbar component that works with the active editor
  const FormattingToolbar = () => {
    const editor = getCurrentEditor();
    
    if (!editor) {
      return null;
    }

    return (
      <div style={styles.editor.toolbarContainer}>
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

  // Only make titleBody and titleBullets editable for now
  switch (template) {
    case 'titleBody':
      return (
        <article style={styles.slide.container}>
          {showToolbar && <FormattingToolbar />}
          <div style={styles.slide.content}>
            <div style={{
              ...styles.slide.title,
              border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : 'none',
              padding: '5px',
              borderRadius: '4px',
            }}>
              <EditorContent editor={titleEditor} />
            </div>
            <div style={{
              ...styles.slide.body,
              border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : 'none',
              padding: '5px',
              borderRadius: '4px',
            }}>
              <EditorContent editor={contentEditor} />
            </div>
          </div>
        </article>
      );
    case 'titleBullets':
      return (
        <article style={styles.slide.container}>
          {showToolbar && <FormattingToolbar />}
          <div style={styles.slide.content}>
            <div style={{
              ...styles.slide.title,
              border: activeEditorRef.current === 'title' ? '1px dashed #9D74FF' : 'none',
              padding: '5px',
              borderRadius: '4px',
            }}>
              <EditorContent editor={titleEditor} />
            </div>
            <div style={{
              ...styles.slide.bulletList,
              border: activeEditorRef.current === 'content' ? '1px dashed #9D74FF' : 'none',
              padding: '5px 20px',
              borderRadius: '4px',
            }}>
              <EditorContent editor={contentEditor} />
            </div>
          </div>
        </article>
      );
    // For all other templates, use the original components
    case 'titleImage':
      return <TitleImageSlide title={title} subtitle={subtitle} imageUrl={imageUrl} />;
    case 'titleBodyImage':
      return <TitleBodyImageSlide title={title} content={content} imageUrl={imageUrl} />;
    case 'titleBulletsImage':
      return <TitleBulletsImageSlide title={title} content={content} imageUrl={imageUrl} />;
    case 'twoColumnImage':
      return (
        <TwoColumnImageSlide
          title={title}
          leftContent={leftContent}
          rightContent={rightContent}
          imageUrl={imageUrl}
        />
      );
    case 'stretchImage':
      return <StretchImageSlide title={title} caption={caption} imageUrl={imageUrl} />;
    default:
      return null;
  }
});

const Slides = () => {
  const [presentationData, setPresentationData] = useState([]);
  const [revealLoaded, setRevealLoaded] = useState(false);
  const revealRef = useRef(null);

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
        // Standalone horizontal slide - Title slide
        {
          template: 'titleImage',
          title: 'Presentation with Images',
          subtitle: 'Using Reveal.js image capabilities',
          imageUrl: 'https://picsum.photos/id/1015/800/600',
        },

        // First vertical group - Image examples
        {
          template: 'titleBodyImage',
          title: 'Working with Images',
          content: [
            'This section demonstrates different ways to incorporate images into your presentation slides.',
          ],
          imageUrl: 'https://picsum.photos/id/1019/800/600',
          group: 'imageExamples',
        },
        {
          template: 'titleBodyImage',
          title: 'Title with Body and Image',
          content: [
            'This slide demonstrates how to combine text content with an image. Images can help illustrate concepts and make your presentations more engaging.',
          ],
          imageUrl: 'https://picsum.photos/id/1019/800/600',
          group: 'imageExamples',
        },
        {
          template: 'titleBulletsImage',
          title: 'Bullet Points with Image',
          content: [
            'First important point',
            'Second important point',
            'Third important point with more detail',
          ],
          imageUrl: 'https://picsum.photos/id/1016/800/600',
          group: 'imageExamples',
        },

        // Standalone horizontal slide - Special image layout
        {
          template: 'stretchImage',
          title: 'Full-Size Image Example',
          caption: 'Using r-stretch to fill available space',
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
      return (
        <section>
          <h2>No presentation data found</h2>
          <p>Make sure you have stored your presentation data in sessionStorage.</p>
        </section>
      );
    }

    // Group slides by group property if it exists
    const groupedSlides = {};
    presentationData.forEach((slide, idx) => {
      const group = slide.group || `standalone_${Math.random().toString(36).substring(2, 11)}`;
      if (!groupedSlides[group]) {
        groupedSlides[group] = [];
      }
      groupedSlides[group].push({ ...slide, originalIndex: idx });
    });

    // Render slides according to groups
    return Object.keys(groupedSlides).map((group, groupIndex) => {
      const slides = groupedSlides[group];

      // If this is a standalone slide (no group property in the original slide)
      if (group.startsWith('standalone_') && slides.length === 1) {
        const slide = slides[0];
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
