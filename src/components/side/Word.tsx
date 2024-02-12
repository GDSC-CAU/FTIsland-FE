import React, { ReactElement, useEffect, useState } from 'react'
import { Box } from '@mui/material';
import WordTitle from './components/WordTitle';
import Back from './components/Back';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  onClick?: (content: string) => void;
  handleSideMenu: (content: boolean) => void;
}

const Word: React.FC<MenuProps> = () => {
  const [word, setWord] = useState("");

  const handleBack = () => {
    
  };

  useEffect(()=>{
    setWord("토마토");
  }, []);

  return (
    <Box sx={{bgcolor: "#FFE5E5", height: '100vh'}}>

      <Back handleBack={handleBack}/>
      
      <WordTitle content={word}/>
      
    </Box>
  )
}

export default Word;