import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.resolve('./public/transcript.pdf');
  const dataBuffer = fs.readFileSync(filePath);
  const resPdf = await pdf(dataBuffer);

  const dataText = resPdf.text;
  const regex = /\b\d{8}/g;
  const data = dataText.match(regex);
  data.splice(0, 1);

  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
}
