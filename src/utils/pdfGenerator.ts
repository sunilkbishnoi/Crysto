
import jsPDF from 'jspdf';

export const generateAnalysisPDF = (symbol: string, analysisResult: string) => {
  // Create new PDF
  const pdf = new jsPDF();
  
  // Add watermark function (to be used on each page)
  const addWatermark = () => {
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(40);
    pdf.setGState({ opacity: 0.1 });
    pdf.text("Crysto by Vendetta", pdf.internal.pageSize.width/2, pdf.internal.pageSize.height/2, {
      align: 'center',
      angle: 45
    });
    pdf.setGState({ opacity: 1.0 });
    pdf.setTextColor(0, 0, 0);
  };

  // Add header function (to be used on each page)
  const addHeader = (pageNumber: number) => {
    pdf.setFontSize(24);
    pdf.setFont("helvetica", 'bold');
    pdf.text("CRYSTO", 20, 20);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", 'normal');
    pdf.text("Financial Analysis Report", 20, 30);
    pdf.setLineWidth(0.5);
    pdf.line(20, 35, 190, 35);
    pdf.setFont("helvetica", 'normal');
    pdf.setFontSize(8);
    pdf.text(`Page ${pageNumber}`, pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10);
  };

  // Constants
  const margin = 20;
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const contentWidth = pageWidth - 2 * margin;
  const startY = 75; // Starting Y position for content
  const lineHeight = 7; // Approximate height per line

  // Clean up analysis result (remove asterisks)
  const formattedText = analysisResult.replace(/\*/g, '');
  
  // First page header and details
  addWatermark();
  addHeader(1);
  
  // Add report details
  pdf.setFontSize(16);
  pdf.setFont("helvetica", 'bold');
  pdf.text(`Analysis Report for ${symbol}`, 20, 50);
  
  pdf.setFontSize(10);
  pdf.setFont("helvetica", 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 60);

  // Split text into lines that fit the page width
  pdf.setFontSize(12);
  const splitText = pdf.splitTextToSize(formattedText, contentWidth);
  
  // Calculate how many lines can fit on one page
  const linesPerPage = Math.floor((pageHeight - startY - margin) / lineHeight);
  
  // Add content across multiple pages
  let currentLine = 0;
  let pageNumber = 1;

  while (currentLine < splitText.length) {
    if (currentLine > 0) {
      // Add new page
      pdf.addPage();
      pageNumber++;
      addWatermark();
      addHeader(pageNumber);
    }

    // Calculate remaining lines for this page
    const remainingLines = splitText.slice(
      currentLine,
      currentLine + linesPerPage
    );

    // Add content
    pdf.setFontSize(12);
    pdf.setFont("helvetica", 'normal');
    pdf.text(remainingLines, margin, startY);

    // Update current line
    currentLine += linesPerPage;
  }
  
  return pdf;
};
