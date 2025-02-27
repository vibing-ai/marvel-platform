/**
 * Slide templates configuration and mock data for the presentation generator
 */

export const SLIDE_TEMPLATE_TYPES = {
    TITLE: 'title',
    TITLE_AND_BODY: 'titleAndBody',
    TITLE_AND_BULLETS: 'titleAndBullets', 
    TWO_COLUMN: 'twoColumn',
    SECTION_HEADER: 'sectionHeader',
    TITLE_AND_IMAGE: 'titleAndImage'
  };
  
  export const SLIDE_TEMPLATE_DEFINITIONS = [
    {
      id: SLIDE_TEMPLATE_TYPES.TITLE,
      name: 'Title Slide',
      description: 'Large title and optional subtitle',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Subtitle', type: 'text', required: false }
      ]
    },
    {
      id: SLIDE_TEMPLATE_TYPES.TITLE_AND_BODY,
      name: 'Title and Body',
      description: 'Title with a paragraph of detailed text',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'body', label: 'Body Text', type: 'textarea', required: true }
      ]
    },
    {
      id: SLIDE_TEMPLATE_TYPES.TITLE_AND_BULLETS,
      name: 'Title and Bullets',
      description: 'Title with bullet points',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'bullets', label: 'Bullet Points', type: 'array', required: true }
      ]
    },
    {
      id: SLIDE_TEMPLATE_TYPES.TWO_COLUMN,
      name: 'Two Column',
      description: 'Title with two columns of content',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { 
          name: 'leftColumn', 
          label: 'Left Column', 
          type: 'object', 
          required: true,
          fields: [
            { name: 'title', label: 'Column Title', type: 'text', required: true },
            { name: 'content', label: 'Content', type: 'mixed', required: true }
          ]
        },
        { 
          name: 'rightColumn', 
          label: 'Right Column', 
          type: 'object', 
          required: true,
          fields: [
            { name: 'title', label: 'Column Title', type: 'text', required: true },
            { name: 'content', label: 'Content', type: 'mixed', required: true }
          ]
        }
      ]
    },
    {
      id: SLIDE_TEMPLATE_TYPES.SECTION_HEADER,
      name: 'Section Header',
      description: 'Large centered title for section dividers',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Subtitle', type: 'text', required: false }
      ]
    },
    {
      id: SLIDE_TEMPLATE_TYPES.TITLE_AND_IMAGE,
      name: 'Title and Image',
      description: 'Title with a centered image',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'imageUrl', label: 'Image URL', type: 'text', required: false },
        { name: 'imageAlt', label: 'Image Alt Text', type: 'text', required: false },
        { name: 'caption', label: 'Image Caption', type: 'text', required: false }
      ]
    }
  ];
  
  // Mock data for demonstration purposes
  export const MOCK_SLIDE_DATA = [
    {
      type: SLIDE_TEMPLATE_TYPES.TITLE,
      data: {
        title: 'The iPhone Evolution',
        subtitle: 'A History of Innovation'
      }
    },
    {
      type: SLIDE_TEMPLATE_TYPES.TITLE_AND_BODY,
      data: {
        title: 'Understanding the Science',
        body: 'The iPhone revolutionized mobile technology by combining telephony, internet, and computing in a single device with an intuitive touch interface. Its development represented a convergence of multiple technologies including capacitive touchscreens, mobile operating systems, and app ecosystems that changed how people interact with technology.'
      }
    },
    {
      type: SLIDE_TEMPLATE_TYPES.TITLE_AND_BULLETS,
      data: {
        title: 'Key Inventions: Engines of Change',
        bullets: [
          'Original iPhone (2007): Revolutionary multi-touch interface',
          'iPhone 3G (2008): App Store introduction',
          'iPhone 4 (2010): Retina Display technology',
          'iPhone 5S (2013): Touch ID fingerprint sensor',
          'iPhone X (2017): Face ID and edge-to-edge display'
        ]
      }
    },
    {
      type: SLIDE_TEMPLATE_TYPES.SECTION_HEADER,
      data: {
        title: 'The Biggest Culprits',
        subtitle: 'Factors that drove smartphone adoption'
      }
    },
    {
      type: SLIDE_TEMPLATE_TYPES.TWO_COLUMN,
      data: {
        title: 'Social Impact',
        leftColumn: {
          title: 'Rise of Cities',
          content: 'The iPhone helped transform urban spaces into connected hubs, creating new social dynamics and patterns of interaction.'
        },
        rightColumn: {
          title: 'New Classes',
          content: [
            'App Developers',
            'Social Media Influencers',
            'Mobile Content Creators',
            'Digital Nomads'
          ]
        }
      }
    },
    {
      type: SLIDE_TEMPLATE_TYPES.TITLE_AND_IMAGE,
      data: {
        title: 'The Evolution of Design',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/iphone-evolution.jpg?alt=media',
        imageAlt: 'iPhone evolution from original to modern models',
        caption: 'The transformation of iPhone design from 2007 to present'
      }
    }
  ];
  