import React, { ReactElement, useEffect} from 'react'
import Menu from './Menu';
import { Box, SelectChangeEvent } from '@mui/material';
import List from './components/List';
import Back from './components/Back';
import LanguageButton from './components/LanguageButton';
import { useUser } from 'src/hook/useUser';
import {putLanguage} from './../../../src/apis/language'
import convertLanguageCode from 'src/utils/convertedLanguageCode';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  handleSideMenu: (content: boolean) => void;
}

const LanguageSetting: React.FC<MenuProps> = ({setContent, handleSideMenu}) => {
  const {user, userId, userRole, setMainLanguage, setSubLanguage, setIsLanguageSetting} = useUser();
  
  const handleBack = () => {
    setContent(<Menu setContent={setContent} handleSideMenu={handleSideMenu} />);
    setIsLanguageSetting(false);
  };

  useEffect(()=>{
  }, [user]);

  const handleMainLanguageChange = async (event: SelectChangeEvent<string>) => {
    const lan = convertLanguageCode(event.target.value as string);
    setMainLanguage(lan);
    console.log(lan);
    localStorage.setItem('mainLanguage', lan);
    if(userRole === 'USER'){
      await putLanguage(userId, user.mainLanguage, user.subLanguage);
    }
  };
  const handleSubLanguageChange = async (event: SelectChangeEvent<string>) => {
    const lan = convertLanguageCode(event.target.value as string)
    setSubLanguage(lan);
    console.log(lan);
    localStorage.setItem('subLanguage', lan);
    if(userRole === 'USER'){
      await putLanguage(userId, user.mainLanguage, user.subLanguage);
    }
    event.stopPropagation();
  };

  return (
    <Box sx={{bgcolor: "#FFE5E5", height: '100vh'}}>

      <Back handleBack={handleBack}/>
      
      <List content={"주언어"}/>
      <LanguageButton sort={"main"} handleLanguageChange={handleMainLanguageChange}/>

      <List content={"서브 언어"}/>
      <LanguageButton sort={"sub"} handleLanguageChange={handleSubLanguageChange} />
    </Box>
  )
}

export default LanguageSetting;