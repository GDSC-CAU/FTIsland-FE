import React, { ReactElement } from 'react'
import Menu from './Menu';
import { Box, SelectChangeEvent } from '@mui/material';
import List from './components/List';
import Back from './components/Back';
import LanguageButton from './components/LanguageButton';
import { useUser } from 'src/hook/useUser';
import {putLanguage} from './../../../src/apis/language'
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

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
    if(userRole === 'USER'){
      await putLanguage(userId, convertedLanguageCode(user.mainLanguage), convertedLanguageCode(user.subLanguage));
    }
    event.stopPropagation();
  };
  const handleSubLanguageChange = async (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);
    if(userRole === 'USER'){
      await putLanguage(userId, convertedLanguageCode(user.mainLanguage), convertedLanguageCode(user.subLanguage));
    }
    event.stopPropagation();
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