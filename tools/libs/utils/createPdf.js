import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const createPdf = (sections) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Define Margins and Page Constraints
  const marginLeft = 20;
  const marginTop = 20;
  const marginRight = 190;
  const pageHeight = 297; // A4 height in mm
  const lineHeight = 7; // Space between lines

  // Global Styles
  const titleFontSize = 18;
  const headerFontSize = 14;
  const bodyFontSize = 12;

  // Document Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(titleFontSize);
  doc.text("Course Syllabus", marginLeft, marginTop);

  // Cursor Position
  let cursorY = marginTop + 10;

  // Function to Add Text with Word Wrapping
  const addText = (text, fontSize) => {
    const lines = doc.splitTextToSize(text, marginRight - marginLeft);
    doc.setFontSize(fontSize);
    lines.forEach((line) => {
      if (cursorY + lineHeight > pageHeight - 10) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });
  };

  // Iterate Through Sections
  sections.forEach((section) => {
    // Section Header
    if (section.header) {
      if (cursorY + lineHeight > pageHeight - 10) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.setFont("helvetica", "bold");
      addText(section.header, headerFontSize);
    }

    // Section Content
    if (section.content) {
      doc.setFont("helvetica", "normal");
      section.content.forEach((line) => {
        addText(line, bodyFontSize);
      });
    }

    // Section Table
    if (section.table) {
      if (cursorY + 30 > pageHeight - 10) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.autoTable({
        startY: cursorY,
        head: section.table.head,
        body: section.table.body,
        margin: { left: marginLeft },
        styles: { fontSize: 10 },
        headStyles: { fillColor: [200, 0, 0], textColor: 255 },
      });
      cursorY = doc.lastAutoTable.finalY + 10;
    }
  });

  // Save the PDF
  doc.save("syllabus.pdf");
};
