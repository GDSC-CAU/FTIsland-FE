import { Box, Button, IconButton, Modal, SelectChangeEvent, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import LanguageButton from '../side/components/LanguageButton';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Join: React.FC<LoginProps> = ({open, setOpen}) => {
  const handleClose = () => {
    setOpen(false);
  }
  const [mainLanguage, setMainLanguage] = useState('한국어');
  const [subLanguage, setSubLanguage] = useState('English');

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
    console.log(event.target.value as string);
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);  // 클릭된 내용을 mainLanguage 상태에 저장
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyle()}>
        <IconButton
          sx={{ position: 'absolute', top: 4, right: 4, zIndex: 3 }} onClick={handleClose}
        >
          <CloseIcon sx={{ width: '28px', height: '28px' }} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 900, marginBottom: '4%', color:'#39A7FF'}}>
          FT 아일랜드에 오신 것을 환영합니다!
        </Typography>

        <Typography variant="h5" sx={{fontWeight: 900, marginBottom: '15px'}}>
          아이의 별명을 지어주세요!
        </Typography>
        <TextField id="outlined-basic" label="별명" variant="outlined" sx={textFieldStyle()}>asdf</TextField>
        
        <Typography variant="h5" sx={{fontWeight: 900, marginTop:'40px'}}>
          언어 선택
        </Typography>

        <Box sx={{display:'flex', justifyContent:'center', alignContent: 'space-between', width:'100%', 
        height:'40%'}}>
          
          <Box sx={{width: '33%', marginRight: '5px'}}>
          <Typography variant="h6" sx={{fontWeight: 900, marginBottom: '15px', marginTop:'40px',}}>
          주언어
        </Typography>
        <LanguageButton language={mainLanguage} handleLanguageChange={handleMainLanguageChange}/>
          </Box>

          <Box sx={{width: '33%', marginLeft:'5px'}}>
          <Typography variant="h6" sx={{fontWeight: 900, marginBottom: '15px', marginTop:'40px'}}>
          보조언어
        </Typography>
        <LanguageButton language={subLanguage} handleLanguageChange={handleSubLanguageChange} />
          </Box>

        </Box>

        <Button variant='contained' sx={buttonStyle()}>회원가입</Button>
      </Box>
    </Modal>
  )
}

export default Join;

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

const textFieldStyle = () => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FF8383',
    },
    '&:hover fieldset': {
      borderColor: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF4A4A',
    },
  },
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
  

})