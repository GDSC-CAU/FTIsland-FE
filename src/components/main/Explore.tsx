import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Islands from '../explore/Islands';

const Explore = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleClick = () => {

  }
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: "100%", gap: 1 }}>

      <Islands handleClick={handleClick}/>
      <Box sx={{ width: { xs: '100%', sm: '80%' }, height: 630, bgcolor: '', borderRadius: 10 }}>

      </Box>
    </Box>
  );
}

export default Explore;