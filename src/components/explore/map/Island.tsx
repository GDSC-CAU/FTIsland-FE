import React, { useEffect } from 'react';
import { Box, CardMedia } from '@mui/material';

import Books from './Books';

const ISLAND_IMAGE_COUNT = 7;

const Island = ({ island }: { island: string }) => {
  useEffect(() => {
    const preloadImage = () => {
      const preloadImageList: { src: string }[] = [];
      const islandImgLinkList = [
        '/image/island1.webp',
        '/image/island2.webp',
        '/image/island3.webp',
        '/image/island4.webp',
        '/image/island5.webp',
        '/image/island6.webp',
        '/image/island7.webp',
      ];
      for (let i = 0; i < ISLAND_IMAGE_COUNT; i++) {
        preloadImageList[i] = new Image();
        preloadImageList[i].src = islandImgLinkList[i];
      }
    };

    preloadImage();
  }, []);

  const handleIsland = () => {
    if (island === '희망의 섬') {
      return '/image/island2.webp';
    } else if (island === '기쁨의 섬') {
      return '/image/island1.webp';
    } else if (island === '행복의 섬') {
      return '/image/island3.webp';
    } else if (island === '용기의 섬') {
      return '/image/island4.webp';
    } else if (island === '절망의 섬') {
      return '/image/island5.webp';
    } else if (island === '미지의 섬') {
      return '/image/island7.webp';
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '80%' },
        height: '100%',
        bgcolor: '',
        borderRadius: 10,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        image={handleIsland()}
        title="Island"
        sx={{
          // width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxHeight: '600px',
        }}
      />
      <Books island={island} />
    </Box>
  );
};

export default Island;
