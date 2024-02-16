import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Islands from '../explore/Islands';
import Island from '../map/Island';

const Explore = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleClick = () => {

  }
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: "100%", gap: 1 }}>

      <Islands handleClick={handleClick}/>
      <Island></Island>
    </Box>
  );
}

export default Explore;