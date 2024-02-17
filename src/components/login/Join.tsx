import { Box, Button, IconButton, Modal, SelectChangeEvent, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import LanguageButton from '../side/components/LanguageButton';
import { useUser } from 'src/hook/useUser';
import { postLanguages } from 'src/apis/language';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Join: React.FC<LoginProps> = ({open, setOpen}) => {
  const {user, userId, setNickName, setMainLanguage, setSubLanguage, setUserRole} = useUser();
  const handleClose = () => {
    setNickName('');
    setUserRole(null);
    setOpen(false);
  };

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  }

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
    console.log(event.target.value as string);
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);  // 클릭된 내용을 mainLanguage 상태에 저장
  };

  const handleJoin = async () => {
    if(user.nickName.length === 0 || user.nickName == null){
      alert('별명의 길이가 1자 이상이어야 합니다');
    }
    else if(typeof userId === 'string'){
      await postLanguages(userId, user.nickName, user.mainLanguage, user.subLanguage);
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
        <Typography variant="h4" sx={{ fontWeight: 900, marginTop:'2%',marginBottom: '5%', color:'#39A7FF'}}>
          FT 아일랜드에 오신 것을 환영합니다!
        </Typography>

        <Typography variant="h5" sx={{fontWeight: 900, marginBottom: '15px'}}>
          아이의 별명을 지어주세요!
        </Typography>
        <TextField id="outlined-basic" label="별명" variant="outlined" onChange={handleNickNameChange} sx={textFieldStyle()}/>
        
        <Typography variant="h5" sx={{fontWeight: 900, marginTop:'50px'}}>
          언어 선택
        </Typography>

        <Box sx={{display:'flex', justifyContent:'center', alignContent: 'space-between', width:'100%', 
        height:'35%'}}>
          
          <Box sx={{width: '33%', marginRight: '5px'}}>
          <Typography variant="h6" sx={{fontWeight: 900, marginTop:'20px',}}>
          주언어
        </Typography>
        <LanguageButton language={user.mainLanguage} handleLanguageChange={handleMainLanguageChange}/>
          </Box>

          <Box sx={{width: '33%', marginLeft:'5px',}}>
          <Typography variant="h6" sx={{fontWeight: 900, marginTop:'20px'}}>
          보조언어
        </Typography>
        <LanguageButton language={user.subLanguage} handleLanguageChange={handleSubLanguageChange} />
          </Box>

        </Box>

        <Button variant='contained' sx={buttonStyle()} onClick={handleJoin}>회원가입</Button>
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
  borderRadius: {xs: '0px', sm: '20px'},

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