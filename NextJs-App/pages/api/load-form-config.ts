import { NextApiRequest, NextApiResponse } from 'next';
import formConfig from '../../config.json';
import FormConfig, { Field } from "../../models/FormConfig";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let form: FormConfig = {
        id: formConfig.id,
        formName: formConfig.formName,
        fields: formConfig.fields.map((fieldData: Field) => {
            let field: Field = {
                id: fieldData.id,
                name: fieldData.name,
                type: fieldData.type,
                options: fieldData.options
            };
            return field;
        })
    }

    res.status(200).json(form);
}

