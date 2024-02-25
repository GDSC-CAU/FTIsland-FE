import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, IconButton, Modal, SelectChangeEvent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { postJoin } from 'src/apis/login';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';
import convertLanguageCode from 'src/utils/convertedLanguageCode';

import JoinTextField from './JoinTextField';
import LanguageButton from '../side/components/LanguageButton';
import useTranslation from 'next-translate/useTranslation';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Join: React.FC<LoginProps> = ({ open, setOpen }) => {
  const router = useRouter();
  const { t: signUpPopup } = useTranslation('common');
  const t = (text: string) => signUpPopup(`signUpPopup.${text}`);

  const { setUserRole } = useUser();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mainLanguage, setMainLanguage] = useState('한국어');
  const [subLanguage, setSubLanguage] = useState('English');

  useEffect(() => {
    setMainLanguage(localStorage.getItem('mainLanguage') || '한국어');
    setSubLanguage(localStorage.getItem('subLanguage') || 'English');
  }, []);

  const handleClose = () => {
    // setNickName('');
    setUserRole('GUEST');
    setOpen(false);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);

    router.replace(router.asPath, router.asPath, {
      locale: convertLanguageCode(event.target.value),
    });
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);
  };

  const handleJoin = async () => {
    if (name.length === 0 || name == null) {
      alert(t('nicknameGuide'));
    } else if (id.length === 0) {
      alert(t('idGuide'));
    } else if (password.length === 0) {
      alert(t('passwordGuide'));
    } else if (typeof id === 'string') {
      const data = await postJoin({
        id,
        password,
        name,
        mainLanguage: convertedLanguageCode(mainLanguage),
        subLanguage: convertedLanguageCode(subLanguage),
      });
      if (data) {
        if (data.status === 404) {
          if (data.data.valid_inputId) {
            alert(data.data.valid_inputId);
          }
          if (data.data.valid_inputPassword) {
            alert(data.data.valid_inputPassword);
          }
          if (data.data.valid_inputName) {
            alert(data.data.valid_inputName);
          }
        }
        if (data.message === 'ok') {
          setUserRole('USER');
          location.reload();
        } else if (data.message === 'duplicate id') {
          alert(t('duplicateId'));
        }
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
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, marginTop: '2%', marginBottom: '5%', color: '#39A7FF' }}
        >
          {t('title')}
        </Typography>

        <JoinTextField type="id" title={t('id')} handleChange={handleIdChange} />
        <JoinTextField type="password" title={t('password')} handleChange={handlePasswordChange} />
        <JoinTextField type="nickname" title={t('nickname')} handleChange={handleNameChange} />

        <Typography variant="h5" sx={{ fontWeight: 900, marginTop: '10px' }}>
          {t('language')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'space-between',
            width: '100%',
            height: '25%',
          }}
        >
          <Box sx={{ width: '33%', marginRight: '5px' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, marginTop: '20px' }}>
              {t('main')}
            </Typography>
            <LanguageButton sort={'main'} handleLanguageChange={handleMainLanguageChange} />
          </Box>

          <Box sx={{ width: '33%', marginLeft: '5px' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, marginTop: '20px' }}>
              {t('sub')}
            </Typography>
            <LanguageButton sort={'sub'} handleLanguageChange={handleSubLanguageChange} />
          </Box>
        </Box>

        <Button variant="contained" sx={buttonStyle()} onClick={handleJoin}>
          {t('signUp')}
        </Button>
      </Box>
    </Modal>
  );
};

export default Join;

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
});
