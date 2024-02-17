import React, { ReactElement } from 'react'
import Menu from './Menu';
import { Box, SelectChangeEvent } from '@mui/material';
import List from './components/List';
import Back from './components/Back';
import LanguageButton from './components/LanguageButton';
import { useUser } from 'src/hook/useUser';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  onClick?: (content: string) => void;
  handleSideMenu: (content: boolean) => void;
}

const LanguageSetting: React.FC<MenuProps> = ({setContent, onClick, handleSideMenu}) => {
  const {user, setMainLanguage, setSubLanguage} = useUser();
  
  const handleBack = () => {
    setContent(<Menu setContent={setContent} onClick={onClick} handleSideMenu={handleSideMenu} />);
  };

  const handleMainLanguageChange = (event: SelectChangeEvent<string>) => {
    setMainLanguage(event.target.value as string);
  };
  const handleSubLanguageChange = (event: SelectChangeEvent<string>) => {
    setSubLanguage(event.target.value as string);  // 클릭된 내용을 mainLanguage 상태에 저장
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