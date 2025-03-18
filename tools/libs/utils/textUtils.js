export const plainTextUtils = {
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
