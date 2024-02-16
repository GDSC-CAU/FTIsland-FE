import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Islands from '../explore/Islands';
import Island from '../map/Island';

const Explore = () => {
  const [selectedIsland, setSelectedIsland] = useState("희망의 섬");
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  // const handleClick = () => {

  // }
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: "100%", gap: 1 }}>

      <Islands setSelectedIsland = {setSelectedIsland} />
      <Island island={selectedIsland}></Island>
    </Box>
  );
}

export default Explore;