import { Box, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Islands from '../explore/Islands';
import Island from '../explore/map/Island';

const Explore = () => {
  const userIslandName = '지혜의 섬';
  const [selectedIsland, setSelectedIsland] = useState(userIslandName);
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
      <Islands setSelectedIsland={setSelectedIsland} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Island island={selectedIsland}></Island>
      </Box>
    </Box>
  );
};

export default Explore;
