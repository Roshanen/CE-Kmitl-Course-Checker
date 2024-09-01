import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.resolve('./public/data/subjects.json');
  
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read JSON file' });
  }
}