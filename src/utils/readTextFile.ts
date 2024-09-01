import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist//build/pdf.worker.min.mjs';

export default async function readFile(file: File): Promise<string> {
  if (file.type === 'application/pdf') {
    return readPdfFile(file);
  } else {
    return readTextFile(file);
  }
}

async function readPdfFile(file: File): Promise<string> {
  const pdf = await getDocument(URL.createObjectURL(file)).promise;
  let textContent = '';

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const text = await page.getTextContent();
    textContent += text.items.map(item => (item as any).str).join(' ') + '\n';
  }

  return textContent;
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file, 'utf-8');
  });
}
