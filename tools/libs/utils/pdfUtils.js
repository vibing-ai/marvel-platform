const PAGE_MARGIN_MM = 10;
const DEFAULT_PDF_FILENAME = 'document.pdf';
const IMAGE_TYPE = 'jpeg';
const IMAGE_QUALITY = 0.98;
const HTML2CANVAS_SCALE = 2;
const JSPDF_UNIT = 'mm';
const JSPDF_FORMAT = 'a4';
const JSPDF_ORIENTATION = 'portrait';

const pdfStyles = `
  <style>
    body { font-family: 'Helvetica', sans-serif; font-size: 12px; }
    ol { margin-bottom: 10px; list-style-type: decimal; padding-left: 20px; }
    ul { margin-bottom: 10px; list-style-type: disc; padding-left: 20px; }
    li { margin-bottom: 5px; display: list-item; }
    p { margin-bottom: 10px; }

    ol li ol {
      list-style-type: upper-alpha;
    }

    ol ol > li {
      display: list-item;
      margin-bottom: 2px;
    }

    pre {
      background-color: #f0f0f0; /* Light gray background */
      padding: 8px;
      border-radius: 5px;
      overflow-x: auto; /* Enable horizontal scrolling for long code lines */
      margin-bottom: 10px;
    }

    code {
      font-family: monospace, monospace; /* Monospace font for code */
      font-size: 11px;
      color: #333; /* Dark gray text color for code */
      display: block; /* Ensure code block behaves correctly */
      white-space: pre; /* Preserve whitespace and line breaks */
    }

    u {
      text-decoration: underline;
    }
  </style>
`;

/**
 * Generates a PDF Blob from HTML content, applying default styles.
 * @param {string} content - The HTML string to convert to PDF.
 * @param {string} [filename] - The filename for the generated PDF (optional). Defaults to 'document.pdf'.
 * @returns {Promise<Blob>} - A Promise that resolves with a PDF Blob.
 */
export function generatePDFfromHTML(content, filename) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      console.warn("PDF generation disabled on server-side.");
      resolve(new Blob(['PDF export not available on server'], { type: 'text/plain' }));
      return;
    }

    import('html2pdf.js').then(html2pdf => {
      const opt = {
        margin:       PAGE_MARGIN_MM,
        filename:     filename || DEFAULT_PDF_FILENAME,
        image:        { type: IMAGE_TYPE, quality: IMAGE_QUALITY },
        html2canvas:  { scale: HTML2CANVAS_SCALE },
        jsPDF:        { unit: JSPDF_UNIT, format: JSPDF_FORMAT, orientation: JSPDF_ORIENTATION }
      };

      html2pdf.default()
        .from(pdfStyles + `<div class="pdf-editor">${content}</div>`)
        .set(opt)
        .output('blob')
        .then(resolve)
        .catch(function(error) {
          console.error('Error generating PDF:', error);
          resolve(new Blob(['Error generating PDF'], { type: 'text/plain' }));
        });
    }).catch(importError => {
      console.error('Error importing html2pdf.js:', importError);
      resolve(new Blob(['Error loading PDF library'], { type: 'text/plain' }));
    });
  });
}