import formConfig from '../../config.json';
import formData from '../../data.json';
import FormConfig, { Field } from "../../models/FormConfig";
import FormData, { FieldValue } from "../../models/FormData";
import path from 'path';
//import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { formData } = req.body;

    if (!formData) {
        return res.status(400).json({ error: 'Form data is required.' });
    }

    try {
        const fileName = 'data.json';
        const filePath = `./${fileName}`;
        const jsonData = JSON.stringify(formData, null, 2);

        console.log('FILE : ' + filePath);

        fs.writeFileSync(filePath, jsonData);

        res.status(200).json({ message: 'Form data saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the form data.' });
    }
};

