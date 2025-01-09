import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableCell as DocxTableCell,
  TableRow as DocxTableRow,
} from "docx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

export const useRubricDisplay = (rubric, setRubric) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleEditClick = () => {
    setRubric(null);
  };

  const exportAsPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;

    doc.setFontSize(18);
    doc.text(rubric.data.title, margin, 20, { maxWidth: contentWidth });

    let y = 30;

    rubric.data.criterias.forEach((criteria) => {
      if (y + 20 > doc.internal.pageSize.getHeight()) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.text(criteria.criteria, margin, y, { maxWidth: contentWidth });
      y += 10;

      criteria.criteria_description.forEach((desc, idx) => {
        if (y + 10 > doc.internal.pageSize.getHeight()) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(12);
        const text = `${idx + 1}. ${desc.description.join(", ")}`;
        doc.text(text, margin + 5, y, { maxWidth: contentWidth });
        y += 10;
      });
      y += 5;
    });

    if (y + 20 > doc.internal.pageSize.getHeight()) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.text(`Note to Teacher: ${rubric.data.feedback}`, margin, y, {
      maxWidth: contentWidth,
    });

    doc.save(`${rubric.data.title}.pdf`);
  };

  const exportAsDOCX = async () => {
    const rows = rubric.data.criterias.map((criteria) => {
      const cells = [
        new DocxTableCell({
          children: [new Paragraph({ text: criteria.criteria, bold: true })],
        }),
        ...criteria.criteria_description.map((desc) =>
          new DocxTableCell({
            children: desc.description.map(
              (text) => new Paragraph({ text: text })
            ),
          })
        ),
      ];
      return new DocxTableRow({ children: cells });
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: rubric.data.title,
              heading: "Heading1",
              spacing: { after: 200 },
            }),
            new DocxTable({
              rows: [
                new DocxTableRow({
                  children: [
                    new DocxTableCell({
                      children: [new Paragraph("Criteria")],
                    }),
                    new DocxTableCell({
                      children: [new Paragraph("4 Points")],
                    }),
                    new DocxTableCell({
                      children: [new Paragraph("3 Points")],
                    }),
                    new DocxTableCell({
                      children: [new Paragraph("2 Points")],
                    }),
                    new DocxTableCell({
                      children: [new Paragraph("1 Point")],
                    }),
                  ],
                }),
                ...rows,
              ],
            }),
            new Paragraph({
              text: `Note to Teacher: ${rubric.data.feedback}`,
              spacing: { before: 200 },
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${rubric.data.title}.docx`);
  };

  return {
    handleBackClick,
    handleEditClick,
    exportAsPDF,
    exportAsDOCX,
  };
};
