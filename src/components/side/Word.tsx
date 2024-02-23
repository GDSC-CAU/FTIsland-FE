import React, { useMemo } from 'react';
import { Box, CardMedia, Skeleton } from '@mui/material';
import WordTitle from './components/WordTitle';
import Back from './components/Back';
import SideButton from './components/SideButton';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';
import { getBookVoca } from 'src/apis/voca';
import { useQuery } from '@tanstack/react-query';

interface MenuProps {
  handleSideMenu: (content: boolean) => void;
}

const Word: React.FC<MenuProps> = ({ handleSideMenu }) => {
  const { vocaId, user, vocaWord, wordType } = useUser();

  const language = useMemo(
    () => (wordType === 'main' ? user.mainLanguage : user.subLanguage),
    [user.mainLanguage, user.subLanguage, wordType],
  );

  const handleBack = () => {
    handleSideMenu(false);
  };

  const { data: bookVocaData, isLoading } = useQuery({
    queryKey: ['bookVocaData', vocaId, language],
    queryFn: async () => await getBookVoca(vocaId, convertedLanguageCode(language)),
  });

  return (
    <Box sx={{ bgcolor: '#FFE5E5', height: '100vh' }}>
      <Back handleBack={handleBack} />
      <WordTitle content={vocaWord} />

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        {isLoading ? (
          <Skeleton
            variant="rounded"
            sx={{
              position: 'relative',
              aspectRatio: '1/1',
              width: '100%',
              height: '100%',
              borderRadius: '20px',
            }}
          />
        ) : (
          <CardMedia
            image={bookVocaData.image}
            sx={{
              position: 'relative',
              aspectRatio: '1/1',
              width: '100%',
              borderRadius: '20px',
            }}
          />
        )}
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
        {isLoading ? 'Loading...' : bookVocaData.description}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SideButton content={'나의 단어 목록'} handleSideMenu={handleSideMenu} word={true} />
      </Box>
    </Box>
  );
};

export default Word;
