import { Box, CardMedia, useMediaQuery } from '@mui/material'
import React from 'react'
import Islands from '../explore/Islands';

const Explore = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleClick = () => {

  }
  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: "100%", gap: 1 }}>

      <Islands handleClick={handleClick}/>
      <Box sx={{ width: { xs: '100%', sm: '80%' }, height: '100%', bgcolor: '', borderRadius: 10, overflow: 'auto'}}>
      <CardMedia
    component="img"
    image="/image/island1.png"
    title="Island"
    sx={{
      // width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
      </Box>
    </Box>
  );
}

export default Explore;