import { Box, Button, IconButton, Modal, SelectChangeEvent, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import LanguageButton from '../side/components/LanguageButton';
import { useUser } from 'src/hook/useUser';
import { postJoin } from 'src/apis/login';
import JoinTextField from './JoinTextField';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

interface LoginProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Join: React.FC<LoginProps> = ({open, setOpen}) => {
  const {user, setUserRole} = useUser();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mainLanguage, setMainLanguage] = useState("한국어");
  const [subLanguage, setSubLanguage] = useState("English");

  const handleClose = () => {
    // setNickName('');
    setUserRole("GUEST");
    setOpen(false);
  };
  
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);
  };

  const handleJoin = async () => {
    if(name.length === 0 || name == null){
      alert('별명의 길이가 1자 이상이어야 합니다.');
    }
    else if(id.length === 0){
      alert('아이디의 길이가 1자 이상이어야 합니다.');
    }
    else if(password.length === 0){
      alert('비밀번호의 길이가 1자 이상이어야 합니다.');
    }
    else if(typeof id === 'string'){
      const data = await postJoin({id, password, name, mainLanguage:convertedLanguageCode(mainLanguage), subLanguage:convertedLanguageCode(subLanguage)});
      if(data){
        console.log(data);
        if(data.status === 404){
          if(data.data.valid_inputId){
            alert(data.data.valid_inputId);
          }
          if(data.data.valid_inputPassword){
            alert(data.data.valid_inputPassword);
          }
          if(data.data.valid_inputName){
            alert(data.data.valid_inputName);
          }
        }
        if(data.message === "ok"){
          setUserRole("USER");
          location.reload();
        }
        else if(data.message === "duplicate id"){
          alert("중복된 ID입니다");
        }
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
        <Typography variant="h4" sx={{ fontWeight: 900, marginTop:'2%',marginBottom: '5%', color:'#39A7FF'}}>
          FT 아일랜드에 오신 것을 환영합니다!
        </Typography>

        <JoinTextField title={"아이디"} handleChange={handleIdChange}/>
        <JoinTextField title={"비밀번호"} handleChange={handlePasswordChange}/>
        <JoinTextField title={"별명"} handleChange={handleNameChange}/>
        
        <Typography variant="h5" sx={{fontWeight: 900, marginTop:'10px'}}>
          언어 선택
        </Typography>

        <Box sx={{display:'flex', justifyContent:'center', alignContent: 'space-between', width:'100%', 
        height:'25%'}}>
          
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