import { ReactNode, useState } from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import BookIcon from '@mui/icons-material/MenuBookRounded';

import { getVocaDescription } from 'src/testData/vocaDetailData';
import throttling from 'src/utils/throttling';

import SoundButton from '../button/SoundButton';

const FlippableCard = ({ isBackPage, children }: { isBackPage: boolean; children: ReactNode }) => (
  <Card
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      aspectRatio: '1/1',
      borderRadius: '20px',
      boxShadow: '2px 4px 6px gray',
      backfaceVisibility: 'hidden',
      transform: isBackPage ? 'rotateY(180deg)' : 'none',

      animation: isBackPage ? 'flipCard .4s forwards' : 'unFlipCard .4s forwards',
      '@keyframes flipCard': {
        '0%': { transform: 'rotateY(0deg)' },
        '100%': { transform: 'rotateY(180deg)' },
      },
      '@keyframes unFlipCard': {
        '0%': { transform: 'rotateY(180deg)' },
        '100%': { transform: 'rotateY(0deg)' },
      },
    }}
  >
    {children}
  </Card>
);

const VocaCard = ({
  vocaId,
  index,
  handleDeleteVoca,
}: {
  vocaId: number;
  index: number;
  handleDeleteVoca: (targetIndex: number) => void;
}) => {
  const { word, description, bookName } = getVocaDescription(vocaId);

  const [isBackPage, setIsBackPage] = useState(false);

  return (
    <Box
      onClick={() => {
        throttling(() => setIsBackPage(!isBackPage), 400);
      }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        aspectRatio: '1/1',
        minWidth: '240px',
        maxWidth: '360px',
        width: '100%',
        mx: 'auto',
      }}
    >
      <FlippableCard isBackPage={isBackPage}>
        <CardMedia
          image="/image/coverImg1.jpg"
          sx={{
            position: 'relative',
            aspectRatio: '4/3',
            width: '100%',
          }}
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteVoca(index);
          }}
          sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
        >
          <CloseIcon sx={{ width: '28px', height: '28px' }} />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            bgcolor: 'white',
            px: 1,
            borderRadius: '20px',

            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'grey.800',
            whiteSpace: 'nowrap',
          }}
        >
          <BookIcon sx={{ width: '16px' }} />
          <Typography variant="h6" sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 900 }}>
            {bookName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {word}
          </Typography>
        </Box>
      </FlippableCard>

      <FlippableCard isBackPage={!isBackPage}>
        <Box
          sx={{
            p: 2,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',

            'h3, h6': {
              fontWeight: 900,
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'anywhere',
              wordBreak: 'break-all',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mx: 'auto' }}>
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '20px',
                  backgroundImage: `url(${'/image/coverImg1.jpg'})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
              <Typography variant="h3">{word}</Typography>
            </Box>
            <Box>
              <Box sx={{ mt: '-28px' }}>
                <SoundButton buttonText="단어 듣기" soundText={word} />
                <SoundButton buttonText="설명 듣기" soundText={description} />
              </Box>
              <Typography variant="h6">{description}</Typography>
            </Box>
          </Box>
        </Box>
      </FlippableCard>
    </Box>
  );
};

export default VocaCard;
