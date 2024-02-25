import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, CardMedia } from '@mui/material';

import Books from './Books';

const ISLAND_IMAGE_COUNT = 7;

const Island = ({ islandNum, island }: { islandNum: number; island: string }) => {
  const { t } = useTranslation('common');

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
    if (island === t('main.island0')) {
      return '/image/island2.webp';
    } else if (island === t('main.island1')) {
      return '/image/island1.webp';
    } else if (island === t('main.island2')) {
      return '/image/island3.webp';
    } else if (island === t('main.island3')) {
      return '/image/island4.webp';
    } else if (island === t('main.island4')) {
      return '/image/island5.webp';
    } else if (island === t('main.island5')) {
      return '/image/island7.webp';
    } else return '/image/island2.webp';
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
      <Books island={island} islandNum={islandNum} />
    </Box>
  );
};

export default Island;
