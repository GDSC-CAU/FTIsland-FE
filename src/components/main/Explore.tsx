import { Box } from '@mui/material'
import React from 'react'
import Islands from '../explore/Islands';

const Explore = () => {
  const handleClick = () => {
    
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%", gap: 1 }}>
      <Islands handleClick={handleClick}/>
      <Box sx={{ width: "80%", height: 630, bgcolor: 'pink', borderRadius: 10 }}>

      </Box>
    </Box>
  );
}

export default Explore;