import React, { ReactElement } from 'react'
import Menu from './Menu';
import { Box, SelectChangeEvent } from '@mui/material';
import List from './components/List';
import Back from './components/Back';
import LanguageButton from './components/LanguageButton';
import { useUser } from 'src/hook/useUser';
import {postLanguages} from './../../../src/apis/language'

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  handleSideMenu: (content: boolean) => void;
}

const LanguageSetting: React.FC<MenuProps> = ({setContent, handleSideMenu}) => {
  const {user, userId, userRole, setMainLanguage, setSubLanguage} = useUser();
  
  const handleBack = () => {
    setContent(<Menu setContent={setContent} handleSideMenu={handleSideMenu} />);
  };

  const handleMainLanguageChange = async (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
    if(userId!==-1 && typeof userId === 'string' && userRole !== 'GUEST'){
      await postLanguages(userId, user.nickName, user.mainLanguage, user.subLanguage);
    }
  };
  const handleSubLanguageChange = async (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);  // 클릭된 내용을 mainLanguage 상태에 저장
    if(userId!==-1 && typeof userId === 'string' && userRole !== 'GUEST'){
      await postLanguages(userId, user.nickName, user.mainLanguage, user.subLanguage);
    }
  };

  return (
    <Box sx={{bgcolor: "#FFE5E5", height: '100vh'}}>

      <Back handleBack={handleBack}/>
      
      <List content={"주언어"}/>
      <LanguageButton language={user.mainLanguage} handleLanguageChange={handleMainLanguageChange}/>

      <List content={"서브 언어"}/>
      <LanguageButton language={user.subLanguage} handleLanguageChange={handleSubLanguageChange} />
    </Box>
  )
}

export default LanguageSetting;