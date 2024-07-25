document.getElementById('delete-button').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input');
    const pageNumber = parseInt(document.getElementById('page-number').value);

    if (fileInput.files.length === 0) {
        alert('Please select a PDF file.');
        return;
    }

    if (isNaN(pageNumber) || pageNumber < 1) {
        alert('Please enter a valid page number.');
        return;
    }

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    if (pageNumber > pageCount) {
        alert(`PDF only has ${pageCount} pages.`);
        return;
    }

    pdfDoc.removePage(pageNumber - 1);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const output = document.getElementById('output');
    output.innerHTML = `<a href="${url}" download="modified.pdf">Download Modified PDF</a>`;
});
