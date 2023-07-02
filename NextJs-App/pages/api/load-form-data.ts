import formData from '../../data.json';
import FormData, { FieldValue } from "../../models/FormData";
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let form: FormData = {
        dateSaved: formData.dateSaved,
        data: formData.data.map((fieldData: FieldValue) => {
            return fieldData
        })
    };

    res.status(200).json(form);
  }