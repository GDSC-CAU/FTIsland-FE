import { ReactNode, useState } from 'react';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import BookIcon from '@mui/icons-material/MenuBookRounded';

import throttling from 'src/utils/throttling';
import { getVocaDescription } from 'src/testData/vocaDetailData';

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
    <IconButton
      //   disableRipple
      onClick={(e) => {
        e.stopPropagation();
      }}
      sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
    >
      <CloseIcon
        sx={{
          width: '28px',
          height: '28px',
        }}
      />
    </IconButton>
    {children}
  </Card>
);

const VocaCard = ({ vocaId }: { vocaId: number }) => {
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
        minWidth: '180px',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookIcon />
            <Typography variant="h6">{bookName}</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: '100%',
            }}
          >
            <Typography variant="h3">{word}</Typography>
            <Typography variant="h6">{description}</Typography>
          </Box>
        </Box>
      </FlippableCard>
    </Box>
  );
};

export default VocaCard;
