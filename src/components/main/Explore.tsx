import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Islands from '../explore/Islands';
import Island from '../explore/map/Island';

const Explore = () => {
  const userIslandName = '지혜의 섬';
  const [selectedIsland, setSelectedIsland] = useState(userIslandName);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: "100%", gap: 1 }}>

      <Islands setSelectedIsland = {setSelectedIsland} />
      <Island island={selectedIsland}></Island>
    </Box>
  );
}

export default Explore;