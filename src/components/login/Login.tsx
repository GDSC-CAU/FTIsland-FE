import { Box, Button, CardMedia, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { postLogin } from 'src/apis/login';
import { useUser } from 'src/hook/useUser';
import JoinTextField from './JoinTextField';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({open, setOpen}) => {
  const {setUserId, setUserRole} = useUser();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    // setNickName('');
    // setUserRole(null);
    setUserRole("GUEST");
    setOpen(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    if(id.length === 0 || id == null){
      alert('아이디의 길이가 1자 이상이어야 합니다');
    }
    else if(password.length === 0 || password == null){
      alert('비밀번호의 길이가 1자 이상이어야 합니다');
    }
    else {
      const data = await postLogin({id, password});
      if(data){
        setUserId(data.userId);
      }
    }
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
        <Typography variant="h4" sx={{ fontWeight: 900, marginTop:'2%',marginBottom: '5%', color:'#39A7FF'}}>
          FT Island
        </Typography>

        <JoinTextField title={"아이디"} handleChange={handleIdChange}/>
        <JoinTextField title={"비밀번호"} handleChange={handlePasswordChange}/>

        <Button variant='contained' sx={buttonStyle()} onClick={handleLogin}>로그인</Button>
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
  borderRadius: {xs: '0px', sm: '20px'},

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

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
  marginTop: '10px',
});