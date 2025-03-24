/**
 * Maps between text-only and image-supported slide templates
 */
export const getLayoutPairs = () => ({
  'titleBody': 'titleBodyImage',
  'titleBodyImage': 'titleBody',
  'titleBullets': 'titleBulletsImage',
  'titleBulletsImage': 'titleBullets',
  'title': 'titleImage',
  'titleImage': 'title',
  // Add other pairs as needed
});

/**
 * Checks if a template is an image-based template
 * @param {string} template - The template name
 * @returns {boolean} - Whether the template includes an image
 */
export const isImageTemplate = (template) => {
  return template.includes('Image');
};

/**
 * Gets the corresponding template when toggling between layouts
 * @param {string} template - The current template
 * @returns {string} - The corresponding template to toggle to
 */
export const getToggleTemplate = (template) => {
  const templatePairs = {
    'titleBody': 'titleBodyImage',
    'titleBodyImage': 'titleBody',
    'titleBullets': 'titleBulletsImage',
    'titleBulletsImage': 'titleBullets',
    'titleImage': 'titleBody',
    'twoColumnImage': 'titleBody'
  };
  
  return templatePairs[template] || template;
};

/**
 * Gets friendly name for a template
 * @param {string} template - The template name
 * @returns {string} - The friendly name for the template
 */
export const getTemplateName = (template) => {
  const templateNames = {
    'titleBody': 'Title & Body',
    'titleBullets': 'Title & Bullets',
    'titleImage': 'Title & Image',
    'titleBodyImage': 'Title, Body & Image',
    'titleBulletsImage': 'Title, Bullets & Image',
    'twoColumnImage': 'Two Columns & Image'
  };
  
  return templateNames[template] || 'Unknown Template';
};

/**
 * Gets all available templates grouped by type
 * @returns {object} - All available templates grouped by type
 */
export const getAllTemplates = () => {
  return {
    text: [
      { id: 'titleBody', name: 'Title & Body' },
      { id: 'titleBullets', name: 'Title & Bullets' },
    ],
    image: [
      { id: 'titleImage', name: 'Title & Image' },
      { id: 'titleBodyImage', name: 'Title, Body & Image' },
      { id: 'titleBulletsImage', name: 'Title, Bullets & Image' },
      { id: 'twoColumnImage', name: 'Two Columns & Image' }
    ]
  };
}; 