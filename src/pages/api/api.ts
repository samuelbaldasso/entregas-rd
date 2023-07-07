// import { promises as fs } from 'fs';
// import { NextApiRequest, NextApiResponse } from 'next';

// const path = require("path");

// const filePath = path.join(process.cwd(), "/src/json");

// const saveFormData = async (data: any) => {
//   const jsonData = JSON.stringify({ formData: [...await getFormData(), data] });
//   await fs.writeFile(filePath, jsonData);
// };

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), '/src/json');

const saveFormData = async (data: string) => {
  data = await getFormData();
  await fs.writeFile(filePath, data);
};

const getFormData = async () => {
  return await fs.readFile(filePath + '/data.json', 'utf8');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    await saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getFormData().then((e) => {
      return JSON.parse(e);
    });
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
