import { Box, CardMedia } from '@mui/material'
import React from 'react'

interface IslandProps {
  island: string | null;
}

const Island: React.FC<IslandProps> = ({island}) => {
  const handleIsland = () => {
    if(island === "희망의 섬"){
      return "/image/island1.png";
    }
    else if(island === "행복의 섬"){
      return "/image/island2.png";
    }
  }

  return (
    <Box sx={{ width: { xs: '100%', sm: '80%' }, height: '100%', bgcolor: '', borderRadius: 10, overflow: 'auto'}}>
    <CardMedia
  component="img"
  image={handleIsland()}
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