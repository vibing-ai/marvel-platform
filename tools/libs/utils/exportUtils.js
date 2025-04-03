import { jsPDF as JsPDF } from 'jspdf';
import markdownit from 'markdown-it';
import { markdownUtils } from './markdownUtils';
import { htmlUtils } from './htmlUtils';
import { plainTextUtils } from './textUtils';
import { generatePDFfromHTML } from './pdfUtils'; // IMPORTANT: Reverted path back to original

function preserveInlineElementSpaces(html) {
  return html
    .replace(/(<\/em>)\s+(<strong>)/g, '$1 $2')
    .replace(/(<\/strong>)\s+(<em>)/g, '$1 $2')
    .replace(/(<\/[a-z]+>)\s+(<[a-z]+>)/g, '$1 $2');
}

const EXPORT_FORMATS = {
  pdf: {
    extension: 'pdf',
    convert: async (markdown) => {
      const md = markdownit();
      let htmlContent = md.render(
        markdown.replaceAll('<br />', '\n\n').replaceAll('***', '**')
      );

      htmlContent = preserveInlineElementSpaces(htmlContent);

      return generatePDFfromHTML(htmlContent);
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
      let html = htmlUtils.convert(elements);

      html = preserveInlineElementSpaces(html);

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
