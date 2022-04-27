import jsPDF from 'jspdf';

const generatePDF = (id) => {
  const element = document.getElementById(id);
  const size = [element.offsetWidth, element.offsetHeight];

  const doc = new jsPDF({
    orientation: 'p',
    compress: false,
    format: size,
    unit: 'px',
  });

  doc.html(element, {
    callback: (pdf) => {
      pdf.save(`${id}.pdf`);
    },
  });
};

export default generatePDF;
