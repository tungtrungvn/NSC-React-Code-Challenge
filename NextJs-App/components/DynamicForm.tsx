import FormConfig from '@/models/FormConfig';
import FormData from '@/models/FormData';
import { Box, Button, FormControl, Select, TextField, makeStyles } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { StoreFormDataCallback } from '@/models/StoreFormDataCallback';

interface DynamicFormProps {
  config: FormConfig,
  data: FormData,
  submitCallback: StoreFormDataCallback
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, data, submitCallback }) => {
  const [formConfig, setFormConfig] = useState(config);
  const [formData, setFormData] = useState(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitCallback(formData);
  };

  const handleChange = (e: any) => {
    var frmData = { ...formData };
    frmData.dateSaved = new Date().toLocaleDateString("us-EN");
    let id = parseInt(e.target.id);
    let dataField = frmData.data.find(x => x.fieldId === id);
    let value = e.target.value;
    if (e.target.type === 'date') {
      value = new Date(value).toLocaleDateString("us-EN");
    }
    dataField!.value = value;
    setFormData(frmData);
  };

  function getValue<T>(fieldId: number): T {
    let value = formData.data.find(x => x.fieldId === fieldId)?.value as T;
    return value;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formConfig.formName}</h2>
      <FormControl fullWidth>
        {formConfig.fields.map((field) => (
          <div key={field.id}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {field.type === 'text' && (
                <TextField type="text" label={field.name} sx={{mb: 2}} fullWidth id={field.id.toString()} name={field.name} variant="outlined"
                  value={getValue<string>(field.id)} onChange={handleChange} />
              )}
              {field.type === 'number' && (
                <TextField type="number" label={field.name} sx={{mb: 2}} fullWidth id={field.id.toString()} name={field.name} variant="outlined"
                  value={getValue<number>(field.id)} onChange={handleChange} />
              )}
              {field.type === 'date' && (
                <TextField type="date" label={field.name} sx={{mb: 2}} fullWidth id={field.id.toString()} name={field.name} variant="outlined"
                  value={moment(getValue<string>(field.id), "MM/DD/YYYY").format("YYYY-MM-DD")} onChange={handleChange} />
              )}
              {field.type === 'select' && (
                <Select native value={getValue<string>(field.id)} sx={{mb: 2}} fullWidth id={field.id.toString()} 
                    name={field.name} variant="outlined" onChange={handleChange}>
                  {field.options!.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              )}
            </Box>
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};

export default DynamicForm;
