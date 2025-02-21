import { jsPDF as JsPDF } from 'jspdf';

// Markdown parsing
const markdownUtils = {
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
    const patterns = [
      {
        pattern: this.patterns.boldItalic,
        replacement: '<em><strong>$1</strong></em>',
      },
      { pattern: this.patterns.bold, replacement: '<strong>$1</strong>' },
      { pattern: this.patterns.italic, replacement: '<em>$1</em>' },
    ];

    const processedText = patterns.reduce(
      (currentText, { pattern, replacement }) =>
        currentText.replace(pattern, replacement),
      text
    );

    return this.decodeEntities(processedText);
  },

  parse(markdown) {
    if (!markdown) return [];

    // Split on actual newlines or <br> tags
    const lines = markdown
      .split(/\n|<br\s*\/?>/g)
      .map((line) => line.trim())
      .map((line) => this.parseElement(line));

    return lines;
  },
};

// HTML conversion
const htmlUtils = {
  styles: {
    body: 'font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;',
    heading: 'font-weight: bold;',
    text: 'margin: 0;',
    listItem: 'margin: 0;',
  },

  convertElement(element) {
    switch (element.type) {
      case 'heading':
        return `<h${element.level} style="${this.styles.heading}">${element.content}</h${element.level}>`;
      case 'listItem':
        return `<p style="${this.styles.text}${' '.repeat(element.indent)}">${
          element.content
        }</p>`;
      case 'blockquote':
        return `<blockquote style="border-left: 4px solid #ccc; padding-left: 1em; margin-left: 0">${element.content}</blockquote>`;
      default:
        return `<p style="${this.styles.text}">${element.content}</p>`;
    }
  },

  convert(elements) {
    const html = elements
      .map((element) => this.convertElement(element))
      .join('\n');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>body { ${this.styles.body} }</style>
        </head>
        <body>${html}</body>
      </html>
    `;
  },
};

// PDF conversion
const pdfUtils = {
  createPDFDocument() {
    const doc = new JsPDF();
    return {
      doc,
      y: 20,
      pageHeight: doc.internal.pageSize.height,
      pageWidth: doc.internal.pageSize.width,
      margin: 20,
      lineHeight: 3,
    };
  },

  styles: {
    heading: {
      fontSize: 12,
      fontStyle: 'bold',
      marginBottom: 3,
      indentation: 0,
    },
    listItem: {
      fontSize: 11,
      fontStyle: 'normal',
      marginBottom: 2,
      indentation: 10,
    },
    blockquote: {
      fontSize: 11,
      fontStyle: 'italic',
      marginBottom: 2,
      indentation: 20,
    },
    text: {
      fontSize: 11,
      fontStyle: 'normal',
      marginBottom: 2,
      indentation: 0,
    },
  },

  processInlineFormats(context, text, x, y, maxWidth) {
    const formats = [
      { pattern: /<strong>(.*?)<\/strong>/g, style: 'bold' },
      { pattern: /<em>(.*?)<\/em>/g, style: 'italic' },
      { pattern: /<code>(.*?)<\/code>/g, style: 'normal' },
    ];
  
    let segments = [{ text, style: 'normal' }];
  
    // Process each format
    formats.forEach((format) => {
      const newSegments = [];
      segments.forEach((segment) => {
        if (segment.style !== 'normal') {
          newSegments.push(segment);
          return;
        }
  
        let lastIndex = 0;
        const matches = [...segment.text.matchAll(format.pattern)];
  
        matches.forEach((match) => {
          if (match.index > lastIndex) {
            newSegments.push({
              text: segment.text.slice(lastIndex, match.index),
              style: 'normal',
            });
          }
          newSegments.push({
            text: match[1],
            style: format.style,
          });
          lastIndex = match.index + match[0].length;
        });
  
        if (lastIndex < segment.text.length) {
          newSegments.push({
            text: segment.text.slice(lastIndex),
            style: 'normal',
          });
        }
      });
      segments = newSegments;
    });
  
    let currentY = y;
    let currentLine = '';
    let currentSegments = [];
    let currentX = x;
  
    segments.forEach((segment) => {
      const words = segment.text.split(' ');
      
      words.forEach((word) => {
        context.doc.setFont('helvetica', segment.style);
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = context.doc.getTextWidth(testLine);
  
        if (testWidth > maxWidth) {
          // Render current line with proper styling
          if (currentLine) {
            let renderX = x;
            currentSegments.forEach((seg) => {
              context.doc.setFont('helvetica', seg.style);
              context.doc.text(seg.text, renderX, currentY);
              renderX += context.doc.getTextWidth(seg.text);
            });
          }
          // Start new line
          currentY += context.lineHeight;
          currentLine = word;
          currentSegments = [{ text: word, style: segment.style }];
          currentX = x + context.doc.getTextWidth(word);
        } else {
          currentLine = testLine;
          currentSegments.push({ 
            text: (currentLine === word ? word : ' ' + word), 
            style: segment.style 
          });
          currentX += context.doc.getTextWidth((currentLine === word ? word : ' ' + word));
        }
      });
    });
  
    // Render last line if exists
    if (currentLine) {
      let renderX = x;
      currentSegments.forEach((seg) => {
        context.doc.setFont('helvetica', seg.style);
        context.doc.text(seg.text, renderX, currentY);
        renderX += context.doc.getTextWidth(seg.text);
      });
    }
  
    return currentY;
  },

  addText(context, element) {
    const style = this.styles[element.type] || this.styles.text;
  
    // Handle empty lines
    if (!element.content.trim()) {
      context.y += context.lineHeight;
      return;
    }
  
    // Set basic styles
    context.doc.setFontSize(style.fontSize);
    context.doc.setFont('helvetica', element.type === 'heading' ? 'bold' : style.fontStyle);
  
    // Handle page breaks
    if (context.y + style.marginBottom > context.pageHeight - context.margin) {
      context.doc.addPage();
      context.y = context.margin;
    }
  
    const x = context.margin + style.indentation;
    const maxWidth = context.pageWidth - (2 * context.margin) - style.indentation;
  
    if (element.type === 'heading') {
      // For headings, just clean HTML and split into lines
      const cleanText = element.content.replace(/<[^>]*>/g, '');
      const lines = context.doc.splitTextToSize(cleanText, maxWidth);
      
      lines.forEach((line, index) => {
        const yPos = context.y + (index * context.lineHeight);
        context.doc.text(line, x, yPos);
      });
  
      context.y += (lines.length * context.lineHeight);
    } else {
      // For regular text, process formatting (bold, italic, etc.)
      const finalY = this.processInlineFormats(context, element.content, x, context.y, maxWidth);
      context.y = finalY;
    }
  
    // Add margin after the element
    context.y += style.marginBottom;
  
    // Special handling for lists
    if (element.type === 'listItem') {
      context.doc.text('•', x - 5, context.y - context.lineHeight - style.marginBottom);
    }
  },

  convert(elements) {
    const context = this.createPDFDocument();
    elements.forEach((element) => this.addText(context, element));
    return context.doc.output('blob');
  },
};

// Plain text conversion
const plainTextUtils = {
  convertElement(element) {
    const cleanContent = element.content.replace(/<[^>]*>/g, '');
    switch (element.type) {
      case 'heading':
        return cleanContent;
      case 'listItem':
        return `${' '.repeat(element.indent)}${cleanContent}`;
      default:
        return cleanContent;
    }
  },

  convert(elements) {
    return elements.map((element) => this.convertElement(element)).join('\n');
  },
};

const EXPORT_FORMATS = {
  pdf: {
    extension: 'pdf',
    convert: async (markdown) => {
      const elements = markdownUtils.parse(markdown);
      return pdfUtils.convert(elements);
    },
  },
  plaintext: {
    extension: 'txt',
    convert: (markdown) => {
      const elements = markdownUtils.parse(markdown);
      const text = plainTextUtils.convert(elements);
      return new Blob([text], { type: 'text/plain' });
    },
  },
  html: {
    extension: 'html',
    convert: (markdown) => {
      const elements = markdownUtils.parse(markdown);
      const html = htmlUtils.convert(elements);
      return new Blob([html], { type: 'text/html' });
    },
  },
};

const generateFileName = (extension) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `editor-export-${timestamp}.${extension}`;
};

const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Exports content in different formats
 * @param {string} content - The content to export
 * @param {string} format - The format to export to ('pdf', 'plaintext', 'html')
 * @returns {Promise<{ success: boolean, filename: string }>}
 * @throws {Error}
 */
export const exportContent = async (content, format) => {
  if (!format || !EXPORT_FORMATS[format]) {
    const supportedFormats = Object.keys(EXPORT_FORMATS).join(', ');
    throw new Error(
      `Unsupported export format: ${format}. Supported formats are: ${supportedFormats}`
    );
  }

  if (!content) {
    throw new Error('Content is required for export');
  }

  const formatConfig = EXPORT_FORMATS[format];
  const filename = generateFileName(formatConfig.extension);
  const blob = await formatConfig.convert(content);
  downloadFile(blob, filename);

  return { success: true, filename };
};
