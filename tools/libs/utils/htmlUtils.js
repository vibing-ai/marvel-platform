export const htmlUtils = {
  styles: {
    body: 'font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;',
    heading: 'font-weight: bold;',
    text: 'margin: 0;',
    listItem: 'margin: 0;',
    list: 'margin-top: 0.5em; margin-bottom: 0.5em;',
  },

  convertElement(element) {
    switch (element.type) {
      case 'heading':
        return `<h${element.level} style="${this.styles.heading}">${element.content}</h${element.level}>`;
      case 'listItem':
        // List items are now handled by the convert method
        return element.content;
      case 'blockquote':
        return `<blockquote style="border-left: 4px solid #ccc; padding-left: 1em; margin-left: 0">${element.content}</blockquote>`;
      default:
        // Add a special class to paragraphs to ensure space preservation
        return `<p style="${this.styles.text}" class="preserve-spaces">${element.content}</p>`;
    }
  },

  convert(elements) {
    // Process elements, wrapping consecutive list items in proper list tags
    const processedElements = [];
    let currentListType = null;
    let currentListItems = [];
    const currentListLevel = 0;

    // Process each element
    elements.forEach((element, index) => {
      if (element.type === 'listItem') {
        // If this is the first list item or different type from previous
        if (
          !currentListType ||
          element.isOrdered !== (currentListType === 'ordered')
        ) {
          // If we were building a list, finalize it
          if (currentListItems.length > 0) {
            const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
            processedElements.push(
              `<${listTag} style="${
                this.styles.list
              }">\n${currentListItems.join('\n')}\n</${listTag}>`
            );
            currentListItems = [];
          }

          // Start a new list
          currentListType = element.isOrdered ? 'ordered' : 'unordered';
        }

        // Add item to current list
        currentListItems.push(`  <li>${element.content}</li>`);
      } else {
        // Not a list item - finalize any current list
        if (currentListItems.length > 0) {
          const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
          processedElements.push(
            `<${listTag} style="${this.styles.list}">\n${currentListItems.join(
              '\n'
            )}\n</${listTag}>`
          );
          currentListItems = [];
          currentListType = null;
        }

        // Add the non-list element
        processedElements.push(this.convertElement(element));
      }
    });

    // Finalize any remaining list
    if (currentListItems.length > 0) {
      const listTag = currentListType === 'ordered' ? 'ol' : 'ul';
      processedElements.push(
        `<${listTag} style="${this.styles.list}">\n${currentListItems.join(
          '\n'
        )}\n</${listTag}>`
      );
    }

    const html = processedElements.join('\n');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { ${this.styles.body} }

            /* Ensure spaces between inline elements are preserved */
            .preserve-spaces em,
            .preserve-spaces strong {
              display: inline-block;
              margin: 0;
            }

            /* Add specific rules to force space between adjacent inline elements */
            em + strong:before,
            strong + em:before {
              content: " ";
              white-space: pre;
            }

            /* Force whitespace preservation in paragraphs */
            p {
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;
  },
};
