import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, useMediaQuery } from '@mui/material';

import Islands from '../explore/Islands';
import Island from '../explore/map/Island';

const Explore = () => {
  const { t } = useTranslation('common');
  const userIslandName = t('main.island0');
  const [selectedIsland, setSelectedIsland] = useState(userIslandName);
  const [islandNum, setIslandNum] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        width: '100%',
        gap: 1,
        height: '100%',
      }}
    >
      <Islands setSelectedIsland={setSelectedIsland} setIslandNum={setIslandNum} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Island island={selectedIsland} islandNum={islandNum} />
      </Box>
    </Box>
  );
};

export default Explore;
