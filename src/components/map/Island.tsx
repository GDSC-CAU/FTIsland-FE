import { Box, CardMedia } from '@mui/material'
import React from 'react'

const Island = () => {
  return (
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
  )
}

export default Island