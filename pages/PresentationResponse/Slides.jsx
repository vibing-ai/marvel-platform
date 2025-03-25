'use client';

import React, { useEffect, useRef, useState } from 'react';

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

const Slides = () => {
  const [presentationData, setPresentationData] = useState([]);
  const [revealLoaded, setRevealLoaded] = useState(false);
  const revealRef = useRef(null);

  useEffect(() => {
    // Get presentation data from sessionStorage
    const storedData = sessionStorage.getItem('presentationData');

    // Sample data for testing with images
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
    console.log('Using sample data for testing');
  }, []);

  useEffect(() => {
    // Only attempt to initialize Reveal.js on the client side
    if (
      typeof window !== 'undefined' &&
      presentationData.length > 0 &&
      !revealLoaded
    ) {
      const loadReveal = async () => {
        try {
          // Dynamic import of Reveal.js (client-side only)
          const Reveal = (await import('reveal.js')).default;

          // Initialize Reveal once it's loaded
          if (revealRef.current) {
            const deck = new Reveal(revealRef.current, {
              controls: true,
              progress: true,
              center: true,
              hash: true,
              width: '100%',
              height: '100%',
              transition: 'slide', // none/fade/slide/convex/concave/zoom
              // Enable navigation in all directions
              navigationMode: 'default',
              // Show arrows for vertical slides
              controlsLayout: 'bottom-right',
              controlsTutorial: true,
              // Make the slides properly fill the screen
              margin: 0.05,
              minScale: 0.2,
              maxScale: 2.0,
            });

            await deck.initialize();
            window.Reveal = deck;
            setRevealLoaded(true);
            console.log('Reveal.js initialized successfully!');

            // Log available routes to help with debugging
            console.log('Available routes:', deck.availableRoutes());
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

  const renderSlide = (slide, index) => {
    const {
      template,
      title,
      content,
      subtitle,
      imageUrl,
      caption,
      leftContent,
      rightContent,
    } = slide;

    switch (template) {
      // Original templates
      case 'titleBody':
        return <TitleBodySlide key={index} title={title} content={content} />;
      case 'titleBullets':
        return (
          <TitleBulletsSlide key={index} title={title} content={content} />
        );

      // Image-based templates
      case 'titleImage':
        return (
          <TitleImageSlide
            key={index}
            title={title}
            subtitle={subtitle}
            imageUrl={imageUrl}
          />
        );
      case 'titleBodyImage':
        return (
          <TitleBodyImageSlide
            key={index}
            title={title}
            content={content}
            imageUrl={imageUrl}
          />
        );
      case 'titleBulletsImage':
        return (
          <TitleBulletsImageSlide
            key={index}
            title={title}
            content={content}
            imageUrl={imageUrl}
          />
        );
      case 'twoColumnImage':
        return (
          <TwoColumnImageSlide
            key={index}
            title={title}
            leftContent={leftContent}
            rightContent={rightContent}
            imageUrl={imageUrl}
          />
        );
      case 'stretchImage':
        return (
          <StretchImageSlide
            key={index}
            title={title}
            caption={caption}
            imageUrl={imageUrl}
          />
        );

      default:
        return (
          <div>
            <h3>Unknown template: {template}</h3>
            <p>{JSON.stringify(slide)}</p>
          </div>
        );
    }
  };

  const renderSlides = () => {
    if (presentationData.length === 0) {
      return (
        <section>
          <h2>No presentation data found</h2>
          <p>
            Make sure you have stored your presentation data in sessionStorage.
          </p>
        </section>
      );
    }

    // Group slides by group property if it exists
    const groupedSlides = {};
    presentationData.forEach((slide) => {
      // If a slide has no group, it becomes its own standalone horizontal slide
      const group =
        slide.group ||
        `standalone_${Math.random().toString(36).substring(2, 11)}`;
      if (!groupedSlides[group]) {
        groupedSlides[group] = [];
      }
      groupedSlides[group].push(slide);
    });

    // Render slides according to groups
    return Object.keys(groupedSlides).map((group, groupIndex) => {
      const slides = groupedSlides[group];

      // If this is a standalone slide (no group property in the original slide)
      if (group.startsWith('standalone_') && slides.length === 1) {
        return (
          <section key={groupIndex} data-transition="slide">
            {renderSlide(slides[0], groupIndex)}
          </section>
        );
      }

      // If this is a group of vertical slides
      return (
        <section key={groupIndex} data-transition="slide">
          {slides.map((slide, slideIndex) => (
            <section
              key={`${groupIndex}-${slideIndex}`}
              data-transition="slide"
            >
              {renderSlide(slide, `${groupIndex}-${slideIndex}`)}
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
          type="button"
          onClick={goToPrev}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('left')}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={goToNext}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('right')}
        >
          Next
        </button>
        <button
          type="button"
          onClick={goToUp}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('up')}
        >
          Up
        </button>
        <button
          type="button"
          onClick={goToDown}
          style={{ margin: '0 5px', padding: '5px 15px' }}
          disabled={!canNavigate('down')}
        >
          Down
        </button>
        <button
          type="button"
          onClick={toggleOverview}
          style={{ margin: '0 5px', padding: '5px 15px' }}
        >
          Overview
        </button>
        <button
          type="button"
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
