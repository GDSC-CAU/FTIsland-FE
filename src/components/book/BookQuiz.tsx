import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Chip, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import SoundIcon from '@mui/icons-material/VolumeUp';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { googleTTS } from 'src/utils/tts';
import throttling from 'src/utils/throttling';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

const BookQuiz = ({
  bookCoverImage,
  bookQuizData,
  handleChangeStep,
}: {
  bookCoverImage: string;
  bookQuizData: {
    mainQuestion: string;
    subQuestion: string;
  }[];
  handleChangeStep: (isNext: boolean) => void;
}) => {
  const { push } = useRouter();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { user } = useUser();

  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  const { mainQuestion, subQuestion } = bookQuizData[currentQuizNumber];

  const handleClickBack = () => {
    if (currentQuizNumber === 0) handleChangeStep(false);
    else setCurrentQuizNumber((prev) => prev - 1);
  };

  const handleClickNext = () => {
    if (currentQuizNumber < bookQuizData.length - 1) setCurrentQuizNumber((prev) => prev + 1);
    else push('/');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column' },
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          onClick={handleClickBack}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: '56px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            mx: 1.5,
            bgcolor: currentQuizNumber === 0 ? '#FFE5E5' : 'white',

            svg: {
              color: '#FF8D8D',
              stroke: '#FF8D8D',
              strokeWidth: 1.5,
            },

            ':hover': {
              cursor: 'pointer',
              backgroundColor: '#FFE5E5',
            },
          }}
        >
          {currentQuizNumber === 0 ? <ReplayIcon /> : <BackIcon />}
        </Box>

        <Box
          sx={{
            height: '100%',
            mx: { sm: 'auto' },
            flex: 1,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${bookCoverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                width: '100%',
                aspectRatio: '5/3',
                maxHeight: '50vh',
              }}
            />
            <Box>
              <Chip
                label="Main"
                size="small"
                sx={{
                  mb: { xs: 0.5, sm: 1 },
                  fontSize: { xs: '12px', sm: '16px' },
                  p: { sm: 1 },
                }}
                icon={<SoundIcon />}
                onClick={() => {
                  throttling(
                    () => googleTTS(mainQuestion, convertedLanguageCode(user.mainLanguage)),
                    1000,
                  );
                }}
              />
              <Typography variant={isMobile ? 'h6' : 'h5'}>{mainQuestion}</Typography>
            </Box>
            <Box>
              <Chip
                label="Sub"
                size="small"
                sx={{
                  mb: { xs: 0.5, sm: 1 },
                  fontSize: { xs: '12px', sm: '16px' },
                  p: { sm: 1 },
                }}
                icon={<SoundIcon />}
                onClick={() => {
                  throttling(
                    () => googleTTS(subQuestion, convertedLanguageCode(user.subLanguage)),
                    1000,
                  );
                }}
              />
              <Typography variant={isMobile ? 'h6' : 'h5'}>{subQuestion}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '200px',
              mx: 'auto',
              bgcolor: '#FF8D8D',
              borderRadius: '20px',
              py: 0.5,
              color: 'white',
              svg: {
                color: 'white',
              },
            }}
          >
            <IconButton onClick={handleClickBack} sx={{ width: '24px', height: '24px' }}>
              {currentQuizNumber === 0 ? <ReplayIcon /> : <BackIcon />}
            </IconButton>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', fontWeight: 600 }}
            >{`${currentQuizNumber + 1} / ${bookQuizData.length}`}</Typography>
            <IconButton onClick={handleClickNext} sx={{ width: '24px', height: '24px' }}>
              {currentQuizNumber < bookQuizData.length - 1 ? <NextIcon /> : <HomeIcon />}
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            sx={{
              display: { xs: 'none', sm: 'block' },
              textAlign: 'center',
            }}
          >{`- ${currentQuizNumber + 1} -`}</Typography>
        </Box>

        <Box
          onClick={handleClickNext}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: '56px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            mx: 1.5,
            bgcolor: currentQuizNumber < bookQuizData.length - 1 ? 'white' : '#FFE5E5',

            svg: {
              color: '#FF8D8D',
              stroke: '#FF8D8D',
              strokeWidth: 1.5,
            },
            ':hover': {
              cursor: 'pointer',
              backgroundColor: '#FFE5E5',
            },
          }}
        >
          {currentQuizNumber < bookQuizData.length - 1 ? <NextIcon /> : <HomeIcon />}
        </Box>
      </Box>
    </Box>
  );
};

export default BookQuiz;
