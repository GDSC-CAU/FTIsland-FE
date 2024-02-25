import { Box, Button, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { postLogin } from 'src/apis/login';
import { useUser } from 'src/hook/useUser';
import JoinTextField from './JoinTextField';
import useTranslation from 'next-translate/useTranslation';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ open, setOpen }) => {
  const { setUserId, setUserRole, setNickName, setMainLanguage, setSubLanguage } = useUser();
  const { t } = useTranslation('common');

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setUserRole('GUEST');
    setOpen(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (id.length === 0 || id == null) {
      alert(t('signUpPopup.idGuide'));
    } else if (password.length === 0 || password == null) {
      alert(t('signUpPopup.passwordGuide'));
    } else {
      const data = await postLogin({ id, password });
      if (data && data.status === 200) {
        setUserId(data.data.userId);
        setNickName(data.data.name);
        setMainLanguage(data.data.mainLanguage);
        setSubLanguage(data.data.subLanguage);
        setUserRole('USER');

        localStorage.setItem('userId', data.data.userId);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('mainLanguage', data.data.mainLanguage);
        localStorage.setItem('subLanguage', data.data.subLanguage);
        localStorage.setItem('userRole', 'USER');

        location.reload();
      } else if (data.status === 404) {
        alert(t('signUpPopup.tryAgain'));
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle()}>
        <IconButton
          sx={{ position: 'absolute', top: 4, right: 4, zIndex: 3 }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ width: '28px', height: '28px' }} />
        </IconButton>
        <CardMedia
          image="/favicon.ico"
          sx={{
            position: 'relative',
            aspectRatio: '1/1',
            width: '40%',
            borderRadius: '100px',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            marginTop: '2%',
            marginBottom: '5%',
            color: '#39A7FF',
            whiteSpace: 'nowrap',
            fontFamily: 'DM Serif Display',
          }}
        >
          Fairy Tale Island
        </Typography>

        <JoinTextField type="id" title={t('signUpPopup.id')} handleChange={handleIdChange} />
        <JoinTextField
          type="password"
          title={t('signUpPopup.password')}
          handleChange={handlePasswordChange}
        />

        <Button variant="contained" sx={buttonStyle()} onClick={handleLogin}>
          {t('login')}
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;

const boxStyle = () => ({
  width: { xs: '100%', sm: '500px' },
  height: { xs: '100%', sm: '80%' },
  bgcolor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: { xs: '0px', sm: '20px' },

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
