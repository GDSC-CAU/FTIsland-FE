import React, { ReactElement, useState } from 'react'
import Menu from './Menu';
import { Box, SelectChangeEvent } from '@mui/material';
import List from './List';
import Back from './Back';
import LanguageButton from './LanguageButton';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  onClick?: (content: string) => void;
  handleSideMenu: (content: boolean) => void;
}

const LanguageSetting: React.FC<MenuProps> = ({setContent, onClick, handleSideMenu}) => {
  
  const [mainLanguage, setMainLanguage] = useState('한국어');
  const [subLanguage, setSubLanguage] = useState('English');
  
  const handleBack = () => {
    setContent(<Menu setContent={setContent} onClick={onClick} handleSideMenu={handleSideMenu} />);
  };

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
    console.log(event.target.value as string);
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);  // 클릭된 내용을 mainLanguage 상태에 저장
  };

  return (
    <Box sx={{bgcolor: "#FFE5E5", height: '100vh'}}>

      <Back handleBack={handleBack}/>
      
      <List content={"주언어"}/>
      <LanguageButton language={mainLanguage} handleLanguageChange={handleMainLanguageChange}/>

      <List content={"서브 언어"}/>
      <LanguageButton language={subLanguage} handleLanguageChange={handleSubLanguageChange} />
    </Box>
  )
}

export default LanguageSetting;