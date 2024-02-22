import React, { useEffect, useState } from 'react';
import { Box, CardMedia } from '@mui/material';
import WordTitle from './components/WordTitle';
import Back from './components/Back';
import SideButton from './components/SideButton';
import { useUser } from 'src/hook/useUser';
import { getVocaDetail } from 'src/apis/voca';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

interface MenuProps {
  handleSideMenu: (content: boolean) => void;
}

const Word: React.FC<MenuProps> = ({ handleSideMenu }) => {
  const [word, setWord] = useState('');
  const [detail, setDetail] = useState('detail');
  const {vocaId, user } = useUser();

  const handleBack = () => {
    console.log(vocaId);
    handleSideMenu(false);
  };

  useEffect(() => {
    // setWord('토마토');
    // setDetail(
    //   '울퉁불퉁 멋진 몸매에 빨간 옷을 입고 새콤달콤 향내 풍기는 멋쟁이 토마토 토마토 나는야 주스 될거야 꿀꺽 나는야 케첩될거야 찍 나는야 춤을 출거야 헤이 뽐내는 토마토 토마토 울퉁불퉁 멋진 몸매에 빨간 옷을 입고 새콤달콤 향내 풍기는 멋쟁이 토마토 토마토 나는야 주스 될거야 꿀꺽 나는야 케첩될거야 찍 나는야 춤을 출거야 헤이 뽐내는 토마토 토마토',
    // );
    const fetchVocaDetails = async () => {
      const data = await getVocaDetail(vocaId, convertedLanguageCode(user.mainLanguage), convertedLanguageCode(user.subLanguage));
      if(data){
        setWord(data[0]?.word);
        setDetail(data[0]?.description);
      }
    }

    fetchVocaDetails();
  }, [user, vocaId]);

  return (
    <Box sx={{ bgcolor: '#FFE5E5', height: '100vh' }}>
      <Back handleBack={handleBack} />
      <WordTitle content={word} />

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <CardMedia
          image="/image/coverImg1.jpg"
          sx={{
            position: 'relative',
            aspectRatio: '4/3',
            width: '100%',
            borderRadius: '20px',
          }}
        />
      </Box>

      <Box
        sx={{
          bgcolor: 'white',
          height: '45%',
          margin: '10px',
          borderRadius: '20px',
          fontWeight: 'bold',
          padding: '5px',
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
