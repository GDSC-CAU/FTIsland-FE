import { Avatar, Box, Button, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
// import { useUser } from 'src/hook/useUser';
import useTranslation from 'next-translate/useTranslation';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenLogin: (value: boolean) => void;
  setOpenJoin: (value: boolean) => void;
}

const Enter: React.FC<LoginProps> = ({ open, setOpen, setOpenLogin, setOpenJoin }) => {
  // const { setUserRole } = useUser();
  const { t } = useTranslation('common');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    setOpenLogin(true);
  };
  const handleClickJoin = () => {
    setOpenJoin(true);
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
            marginBottom: '10%',
            color: '#39A7FF',
            whiteSpace: 'nowrap',
            fontFamily: 'DM Serif Display',
          }}
        >
          Fairy Tale Island
        </Typography>
        {/* <Box
          sx={{ width: '30px', height: '30px', bgcolor: 'red' }}
          onClick={() => setUserRole('USER')}
        ></Box> */}
        <Button variant="contained" sx={buttonStyle()} onClick={handleClick}>
          <Avatar
            src="image/lock.png"
            alt="google"
            sx={{ width: '20px', height: '20px', marginRight: '15px' }}
          />
          {t('login')}
        </Button>
        <Button variant="contained" sx={buttonStyle()} onClick={handleClickJoin}>
          <Avatar
            src="image/join.png"
            alt="google"
            sx={{ width: '20px', height: '20px', marginRight: '15px' }}
          />
          {t('signUp')}
        </Button>
      </Box>
    </Modal>
  );
};

export default Enter;

const boxStyle = () => ({
  width: { xs: '100%', sm: '500px' },
  height: { xs: '100%', sm: '80%' },
  bgcolor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: { xs: 0, sm: '20px' },

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
  marginBottom: '20px',
  '&:hover': {
    backgroundColor: '#FF8383',
    color: 'white',
  },

  display: 'flex',
  justifyContent: 'flex-start',
});
