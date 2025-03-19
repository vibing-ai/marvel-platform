import { jsPDF as JsPDF } from 'jspdf';

export function generatePDFfromHTML(content) {
  return new Promise((resolve) => {
    // Create and prepare a hidden iframe to render HTML
    const iframe = createHiddenIframe(content);

    // Wait for images and resources to load
    setTimeout(() => {
      try {
        // Initialize PDF document
        const doc = new JsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        // Get document dimensions
        const dimensions = {
          pageWidth: doc.internal.pageSize.getWidth(),
          margin: 20,
          get contentWidth() {
            return this.pageWidth - this.margin * 2;
          }
        };

        // Get all relevant elements from the iframe
        const elements = iframe.contentDocument.body.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, p, li, blockquote, pre, table, s'
        );

        // Process elements and add to PDF
        processElementsForPDF(doc, elements, dimensions);

        // Clean up and return the PDF
        document.body.removeChild(iframe);
        resolve(doc.output('blob'));
      } catch (error) {
        console.error('Error generating PDF:', error);
        document.body.removeChild(iframe);
        resolve(new Blob(['Error generating PDF'], { type: 'text/plain' }));
      }
    }, 500); // Give enough time for resources to load
  });
}

// Create a hidden iframe with the HTML content
function createHiddenIframe(content) {
  const iframe = document.createElement('iframe');
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.position = 'absolute';
  iframe.style.top = '-9999px';
  document.body.appendChild(iframe);

  // Write the HTML content to the iframe
  iframe.contentDocument.open();
  iframe.contentDocument.write(content);
  iframe.contentDocument.close();

  return iframe;
}

// Process elements and add to PDF
function processElementsForPDF(doc, elements, dimensions) {
  let yPos = 20; // Starting y position
  const listCounters = {}; // Track counters for each list level
  const processedElements = new Set(); // Track processed elements to avoid duplication
  const processedStrikethroughText = new Set(); // Track processed strikethrough text content

  // Set default font
  doc.setFont('helvetica');

  // Process each element
  elements.forEach((element) => {
    // Skip if this element has already been processed
    if (processedElements.has(element)) {
      return;
    }

    // Mark this element as processed
    processedElements.add(element);

    // Check if we need a new page
    if (yPos > 270) { // A4 height is ~297mm, leave some margin
      doc.addPage();
      yPos = 20;
    }

    // Determine element type and process accordingly
    const tagName = element.tagName;

    if (tagName === 'LI') {
      // Only process list items that aren't nested in another list item we've already processed
      const parentLi = findParentListItem(element);
      if (!parentLi || !processedElements.has(parentLi)) {
        yPos = processListItem(doc, element, yPos, dimensions, listCounters);
      }
    }
    else if (tagName.match(/^H[1-6]$/)) {
      // Process headings
      // Reset list counters when we encounter a heading
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      const level = parseInt(tagName.substring(1), 10);
      const text = element.textContent.trim();
      if (text) {
        yPos = processHeading(doc, level, text, yPos, dimensions);
      }
    }
    else if (tagName === 'P') {
      // Process paragraphs
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      // Check if this paragraph is inside a blockquote
      const parentBlockquote = findParentByTagName(element, 'BLOCKQUOTE');
      if (!parentBlockquote || processedElements.has(parentBlockquote)) {
        // Skip paragraphs that only contain a strikethrough element to avoid duplication
        const onlyContainsSTrikethrough = (
          (element.childNodes.length === 1 && element.firstChild.tagName === 'S') ||
          (element.childNodes.length === 1 &&
           element.firstChild.nodeType === 1 &&
           element.firstChild.classList.contains('slate-strikethrough'))
        );

        if (!onlyContainsSTrikethrough) {
          yPos = processParagraph(doc, element, yPos, dimensions);
        }
      }
    }
    else if (tagName === 'PRE') {
      // Process code blocks
      // Reset list counters when we encounter a code block
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      yPos = processCodeBlock(doc, element, yPos, dimensions);
    }
    else if (tagName === 'CODE') {
      // Process inline code (if not inside a paragraph)
      // Reset list counters when we encounter inline code
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      const text = element.textContent.trim();
      if (text) {
        yPos = processInlineCode(doc, text, yPos, dimensions);
      }
    }
    else if (tagName === 'A') {
      // Process links (if not inside a paragraph)
      // Reset list counters when we encounter a link
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      const text = element.textContent.trim();
      const href = element.getAttribute('href');
      if (text && href) {
        yPos = processLink(doc, text, href, yPos, dimensions);
      }
    }
    else if (tagName === 'BLOCKQUOTE') {
      // Process blockquotes
      // Reset list counters when we encounter a blockquote
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      // Process all content within the blockquote as a unit
      yPos = processBlockquote(doc, element, yPos, dimensions, processedElements);
    }
    else if (tagName === 'TABLE') {
      // Process tables
      // Reset list counters when we encounter a table
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      const text = element.textContent.trim();
      if (text) {
        yPos = processTable(doc, element, yPos, dimensions);
      }
    }
    else if (tagName === 'S') {
      // Process standalone strikethrough elements
      // Only process if not inside a paragraph (which would handle it)
      const parentP = findParentByTagName(element, 'P');
      if (!parentP || processedElements.has(parentP)) {
        Object.keys(listCounters).forEach((key) => delete listCounters[key]);

        const text = element.textContent.trim();
        // Track this text to avoid duplicate processing
        processedStrikethroughText.add(text);

        if (text) {
          // Set up normal font
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');

          // Split text into lines
          const textLines = doc.splitTextToSize(text, dimensions.contentWidth);
          doc.text(textLines, dimensions.margin, yPos);

          // Draw strikethrough line for each line
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);

          // Position line in the middle of the text
          // Font size * 0.35 gives the height of text from baseline, dividing by 2 puts us in the middle
          let lineY = yPos - ((doc.getFontSize() * 0.35) / 3);
          for (let i = 0; i < textLines.length; i++) {
            const lineWidth = doc.getTextWidth(textLines[i]);
            doc.line(
              dimensions.margin,
              lineY,
              dimensions.margin + lineWidth,
              lineY
            );

            // Move to next line
            lineY += doc.getFontSize() * 0.35 + 2;
          }

          // Calculate text height
          const textHeight = textLines.length * (doc.getFontSize() * 0.35);
          yPos += textHeight + 5;
        }
      }
    }
    else if (tagName === 'SPAN') {
      // Process span elements with specific classes
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      // Skip strikethrough spans since we're handling them with standalone <s> elements
      if (element.classList.contains('slate-strikethrough')) {
        // Skip processing - we'll use the standalone <s> elements instead
      }
      else {
        const text = element.textContent.trim();
        if (text) {
          yPos = processGenericElement(doc, text, yPos, dimensions);
        }
      }
    }
    else {
      // Process other elements
      // Reset list counters for other elements
      Object.keys(listCounters).forEach((key) => delete listCounters[key]);

      const text = element.textContent.trim();
      if (text) {
        yPos = processGenericElement(doc, text, yPos, dimensions);
      }
    }
  });
}

// Helper function to find a parent element with specific tag name
function findParentByTagName(element, tagName) {
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName === tagName) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

// Helper function to find parent list item
function findParentListItem(element) {
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName === 'LI') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

// Process a paragraph with proper formatting
function processParagraph(doc, element, yPos, dimensions) {
  doc.setFontSize(12);

  // Get the text content for basic paragraphs
  const text = element.textContent.trim();
  if (!text) return yPos;

  // For paragraphs with formatting, we need special handling
  if (element.querySelector(
    'em, i, strong, b, .slate-italic, .slate-bold, code, a, s'
  )) {
    return processFormattedParagraph(doc, element, yPos, dimensions);
  }

  // For simple paragraphs, just render the text
  doc.setFont('helvetica', 'normal');
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth);
  doc.text(textLines, dimensions.margin, yPos);

  // Calculate text height
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);
  return yPos + textHeight + 5;
}

// Process a paragraph with mixed formatting
function processFormattedParagraph(doc, element, yPos, dimensions) {
  // Start at the left margin
  const currentX = dimensions.margin;
  const startY = yPos;
  const lineHeight = 5; // Space between lines
  const maxWidth = dimensions.contentWidth;

  // Process each child node in sequence
  const result = processFormattedContent(
    element,
    doc,
    currentX,
    startY,
    maxWidth,
    dimensions.margin,
    lineHeight
  );

  // Return the final y position plus some spacing
  return result.y + doc.getFontSize() * 0.35 + 5;
}

// Process formatted content recursively
function processFormattedContent(element, doc, x, y, maxWidth, marginX, lineHeight) {
  let currentX = x;
  let currentY = y;
  let lastNodeType = null; // Track the type of the last node for proper spacing
  let lastWasInlineElement = false; // Track if the last node was an inline element
  let prevNodeName = null; // Track the name of the previous node

  // Track which types of elements were just processed to handle adjacency
  let lastProcessedElement = null;

  // Process each child node
  Array.from(element.childNodes).forEach((node, nodeIndex) => {
    // Handle special case for space-requiring transitions between elements
    if (lastProcessedElement && node.nodeType === 1 &&
        (lastProcessedElement === 'EM' && node.tagName === 'STRONG' ||
         lastProcessedElement === 'STRONG' && node.tagName === 'EM')) {
      // These specific element transitions need space
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      // Force a space between these elements
      doc.text(' ', currentX, currentY);
      currentX += doc.getTextWidth(' ');
    }

    // Check if we need to add a space between nodes
    if (nodeIndex > 0 &&
        (lastNodeType !== 'whitespace' && currentX > marginX && node.nodeType !== 3) ||
        (lastWasInlineElement && node.nodeType === 1)) { // Add space between inline elements
      // Only add space if we're not at the beginning of a line and previous node wasn't whitespace
      // Or if we're between two inline elements
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(' ', currentX, currentY);
      currentX += doc.getTextWidth(' ');
    }

    // Check for whitespace in the original HTML
    const prevSibling = node.previousSibling;
    if (prevSibling && prevSibling.nodeType === 3 && /\s+$/.test(prevSibling.textContent)) {
      // There's whitespace between nodes in the original HTML, ensure it's preserved
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(' ', currentX, currentY);
      currentX += doc.getTextWidth(' ');
    }

    // Process node based on its type
    if (node.nodeType === 3) { // Text node
      const text = node.textContent;
      if (!text) return;

      // Track if this text node is just whitespace
      const isWhitespace = /^\s+$/.test(text);
      if (isWhitespace) {
        lastNodeType = 'whitespace';
        lastWasInlineElement = false;
        return;
      }

      // Use normal font for regular text
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0); // Black

      // Process text character by character to ensure proper spacing
      const words = text.split(/(\s+)/); // Split keeping separators
      words.forEach((word) => {
        if (/^\s+$/.test(word)) {
          // This is a whitespace segment - only add space if not at line beginning
          if (currentX > marginX) {
            currentX += doc.getTextWidth(' ');
          }
          lastNodeType = 'whitespace';
        } else {
          // This is a word - add it
          const wordWidth = doc.getTextWidth(word);

          // Check if adding this word would exceed line width
          if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
            // Move to next line
            currentX = marginX;
            currentY += doc.getFontSize() * 0.35 + lineHeight;
          }

          // Add the word to the current position
          doc.text(word, currentX, currentY);
          currentX += wordWidth;
          lastNodeType = 'text';
        }
      });

      lastWasInlineElement = false;
      lastProcessedElement = null;
    }
    else if (node.nodeType === 1) { // Element node
      // Store this element type for the next element
      lastProcessedElement = node.tagName;

      // Check if this is a link or other formatted element
      const tagName = node.tagName;
      const isInlineElement =
        tagName === 'EM' ||
        tagName === 'I' ||
        tagName === 'STRONG' ||
        tagName === 'B' ||
        tagName === 'CODE' ||
        tagName === 'A' ||
        tagName === 'S' ||
        (tagName === 'SPAN' && (
          node.classList.contains('slate-italic') ||
          node.classList.contains('slate-bold') ||
          node.classList.contains('slate-code') ||
          node.classList.contains('slate-a') ||
          node.classList.contains('slate-strikethrough')
        ));

      // Handle different formatting elements
      if (
        tagName === 'EM' ||
        tagName === 'I' ||
        (tagName === 'SPAN' && node.classList.contains('slate-italic'))
      ) {
        // Italic text
        const text = node.textContent;
        if (!text) return;

        // Set italic font
        doc.setFont('helvetica', 'italic');

        // Process text with word wrapping
        const words = text.split(/(\s+)/); // Split keeping separators
        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            // This is a whitespace segment
            if (currentX > marginX) {
              currentX += doc.getTextWidth(' ');
            }
          } else {
            // This is a word
            const wordWidth = doc.getTextWidth(word);

            // Check if adding this word would exceed line width
            if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
              // Move to next line
              currentX = marginX;
              currentY += doc.getFontSize() * 0.35 + lineHeight;
            }

            // Add the word to the current position
            doc.text(word, currentX, currentY);
            currentX += wordWidth;
          }
        });

        lastNodeType = 'element';
      }
      else if (
        tagName === 'STRONG' ||
        tagName === 'B' ||
        (tagName === 'SPAN' && node.classList.contains('slate-bold'))
      ) {
        // Bold text
        const text = node.textContent;
        if (!text) return;

        // Set bold font
        doc.setFont('helvetica', 'bold');

        // Process text with word wrapping
        const words = text.split(/(\s+)/); // Split keeping separators
        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            // This is a whitespace segment
            if (currentX > marginX) {
              currentX += doc.getTextWidth(' ');
            }
          } else {
            // This is a word
            const wordWidth = doc.getTextWidth(word);

            // Check if adding this word would exceed line width
            if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
              // Move to next line
              currentX = marginX;
              currentY += doc.getFontSize() * 0.35 + lineHeight;
            }

            // Add the word to the current position
            doc.text(word, currentX, currentY);
            currentX += wordWidth;
          }
        });

        lastNodeType = 'element';
      }
      else if (
        tagName === 'CODE' ||
        (tagName === 'SPAN' && node.classList.contains('slate-code'))
      ) {
        // Inline code - needs special handling with background
        const text = node.textContent;
        if (!text) return;

        // Use monospace font for code
        doc.setFontSize(10);
        doc.setFont('courier', 'normal');

        // Process text with word wrapping
        const words = text.split(/(\s+)/); // Split keeping separators

        // Track segments for adding background
        const codeSegments = [];
        let segmentStart = currentX;
        let currentSegmentY = currentY;
        let currentSegmentText = '';

        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            // This is a whitespace segment
            if (currentX > marginX) {
              // If we have current segment text, record the segment
              if (currentSegmentText) {
                codeSegments.push({
                  x: segmentStart,
                  y: currentSegmentY,
                  width: currentX - segmentStart,
                  text: currentSegmentText,
                });

                // Start a new segment
                currentSegmentText = '';
                segmentStart = currentX + doc.getTextWidth(' ');
              } else {
                segmentStart = currentX + doc.getTextWidth(' ');
              }

              currentX += doc.getTextWidth(' ');
            }
          } else {
            // This is a word
            const wordWidth = doc.getTextWidth(word);

            // Check if adding this word would exceed line width
            if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
              // Record the current segment before moving to next line
              if (currentSegmentText) {
                codeSegments.push({
                  x: segmentStart,
                  y: currentSegmentY,
                  width: currentX - segmentStart,
                  text: currentSegmentText,
                });
              }

              // Move to next line
              currentX = marginX;
              currentY += doc.getFontSize() * 0.35 + lineHeight;
              segmentStart = currentX;
              currentSegmentY = currentY;
              currentSegmentText = word;
            } else {
              // Add to current segment
              currentSegmentText += word;
            }

            // Don't draw text here - we'll draw after background
            currentX += wordWidth;
          }
        });

        // Record final segment
        if (currentSegmentText) {
          codeSegments.push({
            x: segmentStart,
            y: currentSegmentY,
            width: currentX - segmentStart,
            text: currentSegmentText,
          });
        }

        // Draw background for each code segment
        doc.setFillColor(245, 245, 245); // Light gray background
        doc.setDrawColor(245, 245, 245); // Make sure draw color matches fill color

        codeSegments.forEach((segment) => {
          // Clear any previous fill color
          doc.setFillColor(245, 245, 245);

          // Draw background rectangle
          doc.rect(
            segment.x - 1,
            segment.y - doc.getFontSize() * 0.3 - 1,
            segment.width + 2,
            doc.getFontSize() * 0.35 + 2,
            'F'
          );

          // Draw text on top of background
          doc.setTextColor(0, 0, 0); // Ensure text is black
          doc.text(segment.text, segment.x, segment.y);
        });

        // Reset font and colors
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setFillColor(0, 0, 0); // Reset fill color to black
        doc.setDrawColor(0, 0, 0); // Reset draw color to black
        doc.setTextColor(0, 0, 0); // Reset text color to black

        lastNodeType = 'element';
      }
      else if (
        tagName === 'A' ||
        (tagName === 'SPAN' && node.classList.contains('slate-a'))
      ) {
        // Link text
        const text = node.textContent;
        const href = node.getAttribute('href') || '#';
        if (!text) return;

        // Set link style (blue text)
        doc.setTextColor(0, 102, 204);

        // Process link text with word wrapping
        const words = text.split(/(\s+)/); // Split keeping separators

        // Track link segments for adding annotations
        const linkSegments = [];
        let segmentStart = currentX;
        let currentSegmentY = currentY;
        let currentSegmentText = '';

        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            // This is a whitespace segment
            if (currentX > marginX) {
              // If we have current segment text, record the segment
              if (currentSegmentText) {
                linkSegments.push({
                  x: segmentStart,
                  y: currentSegmentY,
                  width: currentX - segmentStart,
                  height: doc.getFontSize() * 0.4,
                  text: currentSegmentText
                });

                // Start a new segment
                currentSegmentText = '';
                segmentStart = currentX + doc.getTextWidth(' ');
              } else {
                segmentStart = currentX + doc.getTextWidth(' ');
              }

              currentX += doc.getTextWidth(' ');
            }
          } else {
            // This is a word
            const wordWidth = doc.getTextWidth(word);

            // Check if adding this word would exceed line width
            if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
              // Record the current segment before moving to next line
              if (currentSegmentText) {
                linkSegments.push({
                  x: segmentStart,
                  y: currentSegmentY,
                  width: currentX - segmentStart,
                  height: doc.getFontSize() * 0.4,
                  text: currentSegmentText
                });
              }

              // Move to next line
              currentX = marginX;
              currentY += doc.getFontSize() * 0.35 + lineHeight;
              segmentStart = currentX;
              currentSegmentY = currentY;
              currentSegmentText = word;
            } else {
              // Add to current segment
              currentSegmentText += word;
            }

            // Add the word to the current position
            doc.text(word, currentX, currentY);
            currentX += wordWidth;
          }
        });

        // Record final segment
        if (currentSegmentText) {
          linkSegments.push({
            x: segmentStart,
            y: currentSegmentY,
            width: currentX - segmentStart,
            height: doc.getFontSize() * 0.4,
            text: currentSegmentText
          });
        }

        // Add link annotations for each segment
        linkSegments.forEach((segment) => {
          doc.link(
            segment.x,
            segment.y - doc.getFontSize() * 0.3,
            segment.width,
            segment.height,
            { url: href }
          );
        });

        // Reset color
        doc.setTextColor(0, 0, 0);
        lastNodeType = 'element';
      }
      else if (
        tagName === 'S' ||
        (tagName === 'SPAN' && node.classList.contains('slate-strikethrough'))
      ) {
        // For strikethrough text in paragraphs, just render the text without the line
        // The standalone <s> element will handle the strikethrough rendering
        const text = node.textContent;
        if (!text) return;

        // Use normal font for strikethrough text
        doc.setFont('helvetica', 'normal');

        // Process text with word wrapping
        const words = text.split(/(\s+)/); // Split keeping separators
        words.forEach((word) => {
          if (/^\s+$/.test(word)) {
            // This is a whitespace segment
            if (currentX > marginX) {
              currentX += doc.getTextWidth(' ');
            }
          } else {
            // This is a word
            const wordWidth = doc.getTextWidth(word);

            // Check if adding this word would exceed line width
            if (currentX + wordWidth > marginX + maxWidth && currentX > marginX) {
              // Move to next line
              currentX = marginX;
              currentY += doc.getFontSize() * 0.35 + lineHeight;
            }

            // Add the word to the current position
            doc.text(word, currentX, currentY);
            currentX += wordWidth;
          }
        });

        lastNodeType = 'element';
      }
      else {
        // For other elements, process their children recursively
        const childResult = processFormattedContent(
          node,
          doc,
          currentX,
          currentY,
          maxWidth,
          marginX,
          lineHeight
        );
        currentX = childResult.x;
        currentY = childResult.y;
        lastNodeType = childResult.lastNodeType;
      }

      // At the end of processing any inline element, mark that we just processed one
      if (isInlineElement) {
        lastWasInlineElement = true;
      } else {
        lastWasInlineElement = false;
      }

      lastNodeType = 'element';
    }
  });

  // Return the current position and state for recursive calls
  return { x: currentX, y: currentY, lastNodeType, lastWasInlineElement };
}

// Process a code block
function processCodeBlock(doc, element, yPos, dimensions) {
  const text = element.textContent.trim();
  if (!text) return yPos;

  // Add spacing before code block
  yPos += 9;

  // Set monospace font for code
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');

  // Split text into lines
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth - 10); // Slightly narrower for padding

  // Calculate total height
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);

  // Draw background
  doc.setFillColor(245, 245, 245); // Light gray background
  doc.rect(
    dimensions.margin - 2,
    yPos - doc.getFontSize() * 0.3 - 2,
    dimensions.contentWidth + 4,
    textHeight + doc.getFontSize() * 0.3 + 4,
    'F'
  );

  // Draw code text
  doc.text(textLines, dimensions.margin + 2, yPos);

  // Reset font
  doc.setFont('helvetica', 'normal');

  // Return updated y position
  return yPos + textHeight + doc.getFontSize() * 0.3 + 4; // More space after code blocks
}

// Process inline code
function processInlineCode(doc, text, yPos, dimensions) {
  // Set monospace font for code
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');

  // Split text into lines
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth);

  // Calculate text width and height
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);

  // Draw background
  doc.setFillColor(245, 245, 245); // Light gray background
  doc.rect(
    dimensions.margin - 1,
    yPos - doc.getFontSize() * 0.3 - 1,
    dimensions.contentWidth + 2,
    textHeight + doc.getFontSize() * 0.3 + 2,
    'F'
  );

  // Draw code text
  doc.text(textLines, dimensions.margin, yPos);

  // Reset font
  doc.setFont('helvetica', 'normal');

  // Return updated y position
  return yPos + textHeight + 5;
}

// Process a link
function processLink(doc, text, href, yPos, dimensions) {
  doc.setFontSize(12);

  // Ensure proper line wrapping for long URLs/emails
  const availableWidth = dimensions.contentWidth;

  // Split text into lines that fit within the page width
  const textLines = doc.splitTextToSize(text, availableWidth);

  // Calculate text height based on number of lines
  const lineHeight = doc.getFontSize() * 0.35;
  const textHeight = textLines.length * lineHeight;

  // Draw link text
  doc.setTextColor(0, 102, 204); // Blue color for links
  doc.text(textLines, dimensions.margin, yPos);

  // Add link annotation for each line if text was wrapped
  if (textLines.length === 1) {
    // Single line link - simple case
    doc.link(
      dimensions.margin,
      yPos - doc.getFontSize() * 0.3,
      doc.getTextWidth(text),
      doc.getFontSize() * 0.4,
      { url: href }
    );
  } else {
    // Multi-line link - add annotation for each line
    let currentY = yPos;
    textLines.forEach(line => {
      const lineWidth = doc.getTextWidth(line);
      doc.link(
        dimensions.margin,
        currentY - doc.getFontSize() * 0.3,
        lineWidth,
        doc.getFontSize() * 0.4,
        { url: href }
      );
      currentY += lineHeight;
    });
  }

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Return updated y position with proper spacing
  return yPos + textHeight + 5;
}

// Process a blockquote
function processBlockquote(doc, element, yPos, dimensions, processedElements) {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');

  // Add spacing before blockquote
  yPos += 3;

  // Mark all child elements as processed to avoid duplicates
  if (processedElements) {
    const children = element.querySelectorAll('*');
    children.forEach(child => {
      processedElements.add(child);
    });
  }

  // Process the blockquote content as a whole
  const text = element.textContent.trim();
  if (!text) return yPos;

  // Split text into lines
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth - 10);

  // Calculate text height
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);

  // Draw left border
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(
    dimensions.margin,
    yPos - 5,
    dimensions.margin,
    yPos + textHeight + 5
  );

  // Draw background
  doc.setFillColor(249, 249, 249);
  doc.rect(
    dimensions.margin + 1,
    yPos - 5,
    dimensions.contentWidth - 1,
    textHeight + 10,
    'F'
  );

  // Draw text
  doc.text(textLines, dimensions.margin + 5, yPos);

  // Reset font
  doc.setFont('helvetica', 'normal');

  // Return updated y position
  return yPos + textHeight + 8;
}

// Process a table element
function processTable(doc, element, yPos, dimensions) {
  // Add spacing before table
  yPos += 5;

  // Set font for table text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Get all rows from the table
  const rows = element.querySelectorAll('tr');
  if (!rows.length) return yPos;

  // Calculate column widths based on content
  const columnCount = getMaxColumnCount(rows);
  const columnWidths = calculateColumnWidths(
    rows,
    columnCount,
    dimensions.contentWidth
  );

  // Set border style
  doc.setDrawColor(0); // Black
  doc.setLineWidth(0.2); // Thin line

  // Track current position
  let currentY = yPos;

  // Process each row
  rows.forEach((row, rowIndex) => {
    // Get all cells in this row
    const cells = row.querySelectorAll('th, td');

    // Calculate row height based on content
    const rowHeight = calculateRowHeight(doc, cells, columnWidths);

    // Check if we need a new page
    if (currentY + rowHeight > 270) {
      doc.addPage();
      currentY = 20;
    }

    // Draw row background for header rows
    if (row.querySelector('th')) {
      doc.setFillColor(240, 240, 240); // Light gray for headers
      doc.rect(
        dimensions.margin,
        currentY - rowHeight + 2,
        dimensions.contentWidth,
        rowHeight,
        'F'
      );
    }

    // Process each cell
    let currentX = dimensions.margin;
    cells.forEach((cell, cellIndex) => {
      const isHeader = cell.tagName === 'TH';
      const cellWidth = columnWidths[cellIndex] || 30; // Default width if not calculated

      // Get cell text
      const text = cell.textContent.trim();

      // Set font style based on cell type
      if (isHeader) {
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setFont('helvetica', 'normal');
      }

      // Draw cell border
      doc.rect(
        currentX,
        currentY - rowHeight + 2,
        cellWidth,
        rowHeight,
        'S' // Stroke only
      );

      // Add cell text with padding
      if (text) {
        const cellPadding = 2;
        const availableWidth = cellWidth - cellPadding * 2;
        const textLines = doc.splitTextToSize(text, availableWidth);

        // Calculate vertical centering
        const textHeight = textLines.length * (doc.getFontSize() * 0.35);
        const verticalOffset = (rowHeight - textHeight) / 2;

        doc.text(
          textLines,
          currentX + cellPadding,
          currentY - rowHeight + verticalOffset + doc.getFontSize() * 0.35 + 2
        );
      }

      // Move to next cell position
      currentX += cellWidth;
    });

    // Move to next row position
    currentY += rowHeight;
  });

  // Reset font
  doc.setFont('helvetica', 'normal');

  // Return updated y position with some spacing after the table
  return currentY + 8;
}

// Helper function to get the maximum number of columns in a table
function getMaxColumnCount(rows) {
  let maxColumns = 0;
  rows.forEach((row) => {
    const cellCount = row.querySelectorAll('th, td').length;
    maxColumns = Math.max(maxColumns, cellCount);
  });
  return maxColumns;
}

// Helper function to calculate column widths based on content
function calculateColumnWidths(rows, columnCount, totalWidth) {
  // Default to equal widths
  const defaultWidth = totalWidth / columnCount;
  const columnWidths = Array(columnCount).fill(defaultWidth);

  // Try to adjust based on content (simple approach)
  // For a more sophisticated approach, we would measure actual text widths

  return columnWidths;
}

// Helper function to calculate row height based on content
function calculateRowHeight(doc, cells, columnWidths) {
  let maxHeight = 10; // Minimum row height

  cells.forEach((cell, index) => {
    const text = cell.textContent.trim();
    if (!text) return;

    const cellWidth = columnWidths[index] || 30;
    const availableWidth = cellWidth - 4; // Account for padding
    const textLines = doc.splitTextToSize(text, availableWidth);
    const textHeight = textLines.length * (doc.getFontSize() * 0.35) + 6; // Add padding

    maxHeight = Math.max(maxHeight, textHeight);
  });

  return maxHeight;
}

// Process a generic element
function processGenericElement(doc, text, yPos, dimensions) {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  // Add text to PDF
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth);
  doc.text(textLines, dimensions.margin, yPos);

  // Update y position
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);
  return yPos + textHeight + 5; // Default spacing
}

// Process a heading element
function processHeading(doc, level, text, yPos, dimensions) {
  // Add spacing before headers
  const headerSpacing = {
    1: 15,
    2: 12,
    3: 10,
    4: 8,
    5: 6,
    6: 4,
  };
  yPos += headerSpacing[level];

  // Set font size based on heading level
  const fontSizes = {
    1: 30,
    2: 24,
    3: 21,
    4: 18,
    5: 15,
    6: 12,
  };
  doc.setFontSize(fontSizes[level]);
  doc.setFont('helvetica', 'bold');

  // Add text to PDF
  const textLines = doc.splitTextToSize(text, dimensions.contentWidth);
  doc.text(textLines, dimensions.margin, yPos);

  // Update y position
  const textHeight = textLines.length * (doc.getFontSize() * 0.35);
  return yPos + textHeight + (8 - level); // More space after more important headers
}

// Process a list item element
function processListItem(doc, element, yPos, dimensions, listCounters) {
  // Extract text content, excluding nested lists
  const text = extractListItemText(element);

  // Determine list properties
  const listProps = determineListProperties(element, listCounters);

  // Set font for list items
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Calculate indentation
  const indentSize = 5 * listProps.level;
  const textIndent = dimensions.margin + indentSize + 5;

  // Prepare text lines
  const availableWidth = dimensions.contentWidth - indentSize - 5;
  const textLines = doc.splitTextToSize(text, availableWidth);

  // Add bullet point or number
  if (listProps.type === 'unordered') {
    doc.setFont('helvetica', 'bold');
    doc.text('•', dimensions.margin + indentSize, yPos);
    doc.setFont('helvetica', 'normal');
  } else {
    doc.setFont('helvetica', 'bold');
    doc.text(`${listProps.counter}.`, dimensions.margin + indentSize, yPos);
    doc.setFont('helvetica', 'normal');
  }

  // Add the list item text
  if (text) {
    doc.text(textLines, textIndent, yPos);
  }

  // Update y position
  const textHeight = text ? textLines.length * (doc.getFontSize() * 0.35) : doc.getFontSize() * 0.35;
  let newYPos = yPos + textHeight + 3;

  // Check if this element has already been processed as part of a parent list
  if (!element._processed) {
    // Mark this element as processed to avoid double rendering
    element._processed = true;

    // Process nested lists if present
    const nestedLists = element.querySelectorAll(':scope > ul, :scope > ol');
    if (nestedLists.length > 0) {
      // Add spacing before nested list
      newYPos += 2;

      // Process each nested list
      Array.from(nestedLists).forEach(nestedList => {
        const items = nestedList.querySelectorAll(':scope > li');
        Array.from(items).forEach(item => {
          // Check if the item has been processed before
          if (!item._processed) {
            newYPos = processListItem(doc, item, newYPos, dimensions, listCounters);
          }
        });
      });
    }
  }

  return newYPos;
}

// Extract text from a list item, excluding nested lists
function extractListItemText(element) {
  let text = '';
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    if (node.nodeType === 3) { // Text node
      text += node.textContent;
    } else if (node.nodeType === 1 && !['UL', 'OL'].includes(node.tagName)) {
      text += node.textContent;
    }
  }
  return text.trim();
}

// Determine list type, level, and counter
function determineListProperties(element, listCounters) {
  let type = 'unordered';
  let level = 0;
  let parent = element.parentElement;
  let listPath = [];
  let isNestedList = false;

  // Walk up the parent chain to determine list type and nesting level
  while (parent) {
    if (parent.tagName === 'UL') {
      level++;
      type = 'unordered';
      listPath.unshift('ul');

      // Check if this is a nested list
      if (parent.parentElement && parent.parentElement.tagName === 'LI') {
        isNestedList = true;
      }
    } else if (parent.tagName === 'OL') {
      level++;
      type = 'ordered';
      listPath.unshift('ol');

      // Check if this is a nested list
      if (parent.parentElement && parent.parentElement.tagName === 'LI') {
        isNestedList = true;
      }

      // Create a unique key for this list based on its path
      const listKey = listPath.join('-');

      // Initialize counter for this specific list path if needed
      if (!listCounters[listKey]) {
        listCounters[listKey] = 0;
      }

      // If this is the direct parent list, increment its counter
      if (parent === element.parentElement) {
        listCounters[listKey]++;

        // Store the counter value for this list item
        element._listCounter = listCounters[listKey];
      }
    }
    parent = parent.parentElement;
  }

  // Get the counter value for this specific list item
  const counter = element._listCounter || 0;

  // For nested lists in the PDF generation, ensure we start counting from 1
  // by returning the relative position of the item in its immediate list
  if (isNestedList && type === 'ordered') {
    // Find the position of this element among its siblings
    const parentList = element.parentElement;
    if (parentList) {
      const siblings = parentList.querySelectorAll(':scope > li');
      let position = 0;

      // Find the position of the current element among its siblings
      for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === element) {
          position = i + 1; // Convert to 1-based index
          break;
        }
      }

      // Return the position as the counter value
      return {
        type,
        level,
        counter: position,
      };
    }
  }

  return {
    type,
    level,
    counter: counter,
  };
}