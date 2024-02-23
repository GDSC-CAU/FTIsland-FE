import React, { useEffect, useState } from 'react';
import { Box, CardMedia } from '@mui/material';
import WordTitle from './components/WordTitle';
import Back from './components/Back';
import SideButton from './components/SideButton';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';
import { getBookVoca } from 'src/apis/voca';

interface MenuProps {
  handleSideMenu: (content: boolean) => void;
}

const Word: React.FC<MenuProps> = ({ handleSideMenu }) => {
  const [detail, setDetail] = useState('Word Description');
  const {vocaId, user, vocaWord, wordType } = useUser();
  const [wordImage, setWordImage] = useState("/image/coverImg1.jpg");

  const handleBack = () => {
    console.log(vocaId);
    handleSideMenu(false);
  };

  useEffect(() => {
    const fetchVocaDetails = async () => {
      const language = (wordType=== 'main') ? user.mainLanguage : user.subLanguage;
      const data = await getBookVoca(vocaId, convertedLanguageCode(language));
      if(data){
        setDetail(data.description);
        setWordImage(data.image);
      }
    }

    fetchVocaDetails();
  }, [user, vocaId, wordType]);

  return (
    <Box sx={{ bgcolor: '#FFE5E5', height: '100vh' }}>
      <Back handleBack={handleBack} />
      <WordTitle content={vocaWord} />

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <CardMedia
          image= {wordImage}
          sx={{
            position: 'relative',
            aspectRatio: '1/1',
            width: '100%',
            borderRadius: '20px',
          }}
        />
      </Box>

      <Box
        sx={{
          bgcolor: 'white',
          height: '35%',
          margin: '10px',
          borderRadius: '20px',
          fontWeight: 'bold',
          padding: '15px',
          fontSize: '20px',
          overflow: 'auto',
        }}
      >
        {detail}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SideButton content={'나의 단어 목록'} handleSideMenu={handleSideMenu} word={true} />
      </Box>
    </Box>
  );
};

export default Word;
