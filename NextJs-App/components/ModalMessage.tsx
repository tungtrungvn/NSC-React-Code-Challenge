import React from 'react';
import { Button, Modal, Box } from '@mui/material';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string
};

const ModalMessage: React.FC<ModalProps> = ({ open, onClose, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 24, p: 4 }}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModalMessage;
