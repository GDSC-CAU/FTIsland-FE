import { Avatar, Box, Button, CardMedia, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
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
      <Box sx={boxStyle()}>
      <IconButton
          sx={{ position: 'absolute', top: 4, right: 4, zIndex: 3 }} onClick={handleClose}
        >
          <CloseIcon sx={{ width: '28px', height: '28px' }} />
        </IconButton>
        <CardMedia
          image="/image/coverImg1.jpg"
          sx={{
            position: 'relative',
            aspectRatio: '1/1',
            width: '40%',
            borderRadius:'100px'
          }}/>
        <Typography variant="h4" sx={{ fontWeight: 900, marginTop:'2%',marginBottom: '10%', color:'#39A7FF'}}>
          FT 아일랜드
        </Typography>

        <Button variant='contained' sx={buttonStyle()}>
          <Avatar src="image/google.png" alt="google" sx={{width: '25px', height: '25px', marginRight: '15px'}}/>
          구글 로그인</Button>
      </Box>
    </Modal>
  )
}

export default Login;

const boxStyle = () => ({ 
  width: {xs: '100%', sm:'500px'}, 
  height: {xs: '100%', sm: '80%'}, 
  bgcolor: 'white', 
  position: 'absolute', 
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -50%)',
  borderRadius: '20px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
})

const buttonStyle = () => ({
  width: '300px',
  height: '50px',
  bgcolor: '#FFDDDD',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '20px',
  '&:hover': {
    backgroundColor: '#FF8383',
    color: 'white',
  },
  
  display: 'flex',
  justifyContent: 'flex-start',
})