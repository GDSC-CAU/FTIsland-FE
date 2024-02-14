import { Box, Modal } from '@mui/material'
import React from 'react'

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({open, setOpen}) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: '40%', height: '80%', bgcolor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        하이
      </Box>
    </Modal>
  )
}

export default Login