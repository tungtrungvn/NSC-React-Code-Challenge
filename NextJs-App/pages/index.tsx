import { useEffect, useState } from 'react';
import FormConfig from '@/models/FormConfig';
import FormData from '@/models/FormData';
import axios from 'axios';
import DynamicForm from '@/components/DynamicForm';
import ModalMessage from '@/components/ModalMessage';

const centerDiv = {
  margin: 'auto',
  width: '30%',
  marginTop: '100px',
}

export default function Home() {
  const [formConfig, setFormConfig] = useState<FormConfig | undefined>();
  const [formData, setFormData] = useState<FormData | undefined>();
  const [openMessage, setOpenMessage] = useState(false);
  const [modalTitle, setModalTitle] = useState('Save data');
  const [modalMessage, setModalMessage] = useState('Save form data success.');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const configResponse = await axios.get<FormConfig>('/api/load-form-config');
        const config: FormConfig = configResponse.data;
        setFormConfig(config);
        const dataResponse = await axios.get<FormData>('/api/load-form-data');
        const data: FormData = dataResponse.data;
        setFormData(data);
      } catch (error) {
        console.error('An error occurred while fetching form config:', error);
      }
    };
    fetchData();
  }, []);

  async function storeFormDataCallback(data: FormData) {
    try {
      const response = await axios.post('/api/store-form-data', {
        formData: data,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setOpenMessage(true);
  }

  if (formConfig && formData) {
    return (
      <div style={centerDiv}>
        <DynamicForm config={formConfig} data={formData} submitCallback={storeFormDataCallback} />
        <ModalMessage open={openMessage} onClose={()=>{setOpenMessage(false);}} title={modalTitle} message={modalMessage}/>
      </div>
    )
  }
}
