export const markdownUtils = {
  entities: {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': '"',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&ndash;': '–',
    '&mdash;': '—',
  },

  patterns: {
    heading: /^(#{1,6})\s+(.+)$/,
    listItem: /^(\s*(?:[-*+]|\d+\.)\s+)(.+)$/,
    codeBlock: /^```(\w*)\n([\s\S]*?)```$/,
    bold: /\*\*(.*?)\*\*/g,
    italic: /[_*](.*?)[_*]/g,
    boldItalic: /[_*]{3}(.*?)[_*]{3}/g,
    blockquote: /^>\s+(.+)$/,
    horizontalRule: /^[-*_]{3,}$/,
    lineBreak: /<br\s*\/?>/g,
  },

  decodeEntities(text) {
    return text.replace(
      /&[^;]+;/g,
      (entity) => this.entities[entity] || entity
    );
  },

  parseElement(line) {
    // Remove any <br> tags and process them as actual line breaks
    const processedLine = line.replace(this.patterns.lineBreak, '');

    if (processedLine.match(this.patterns.heading)) {
      const match = processedLine.match(this.patterns.heading);
      return {
        type: 'heading',
        level: match[1].length,
        content: this.parseInlineStyles(match[2]),
        raw: processedLine,
      };
    }

    if (processedLine.match(this.patterns.listItem)) {
      const match = processedLine.match(this.patterns.listItem);
      return {
        type: 'listItem',
        indent: match[1].length,
        content: this.parseInlineStyles(match[2]),
        raw: processedLine,
      };
    }

    if (processedLine.match(this.patterns.blockquote)) {
      const match = processedLine.match(this.patterns.blockquote);
      return {
        type: 'blockquote',
        content: this.parseInlineStyles(match[1]),
        raw: processedLine,
      };
    }
    return {
      type: 'text',
      content: this.parseInlineStyles(processedLine),
      raw: processedLine,
    };
  },

  parseInlineStyles(text) {
    // First, temporarily mark spaces around inline style markers to preserve them
    let processedText = text
      // Mark spaces before style markers
      .replace(/(\s+)(\*\*|\*|_)/g, '$1\uE000$2')
      // Mark spaces after style markers
      .replace(/(\*\*|\*|_)(\s+)/g, '$1\uE001$2')
      // Mark spaces between closing and opening markers
      .replace(/(\*\*|\*|_)(\s+)(\*\*|\*|_)/g, '$1\uE002$3');

    const patterns = [
      {
        pattern: this.patterns.boldItalic,
        replacement: '<em><strong>$1</strong></em>',
      },
      { pattern: this.patterns.bold, replacement: '<strong>$1</strong>' },
      { pattern: this.patterns.italic, replacement: '<em>$1</em>' },
    ];

    // Apply the patterns
    processedText = patterns.reduce(
      (currentText, { pattern, replacement }) =>
        currentText.replace(pattern, replacement),
      processedText
    );

    // Restore the marked spaces with explicit space entities to ensure they're preserved
    processedText = processedText
      .replace(/\uE000/g, ' ')
      .replace(/\uE001/g, ' ')
      .replace(/\uE002/g, '&nbsp;'); // Use non-breaking space between style markers

    return this.decodeEntities(processedText);
  },

  parse(markdown) {
    if (!markdown) return [];

    // debugger;
    const lines = markdown
      .split(/\n|<br\s*\/?>/g)
      // .map((line) => line.trim())
      .map((line) => this.parseElement(line));

    // Track the current list type
    let currentListType = null;
    let currentListIndex = 0;

    // Iterate through the parsed elements to set list types
    lines.forEach((element) => {
      if (element.type === 'listItem') {
        if (element.raw.startsWith('-')) {
          currentListType = 'unordered';
        } else if (element.raw.match(/^\d+\./)) {
          currentListType = 'ordered';
          currentListIndex += 1; // Increment index for ordered lists
          element.index = currentListIndex; // Assign index for ordered lists
        }
        element.isOrdered = currentListType === 'ordered'; // Set isOrdered property
      } else {
        currentListType = null; // Reset when not a list item
        currentListIndex = 0; // Reset index
      }
    });

    return lines;
  },
};
