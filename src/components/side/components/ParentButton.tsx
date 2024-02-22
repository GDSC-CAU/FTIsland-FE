import { Avatar, Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const ParentButton = () => {
  const [isParent, setIsParent] = useState(false);

  const handleParent = () => {
    setIsParent(!isParent);
  }

  return (
    <Box sx={{bgcolor: "#39A7FF", padding: 1.2, boxShadow: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '7%'}}>
    {

    }
    <Typography variant="h4" sx={listStyle()} >부모로 전환</Typography>
    <Avatar
    src={
      isParent
        ? '/image/on.webp'
        : '/image/off.webp'
    }
    alt="arrow right"
    sx={{ width: '95px', height: '30px', borderRadius: '0px', bgColor: 'none' }}
    onClick={handleParent}
  />
  </Box>
  )
}

export default ParentButton;

const listStyle = ()=>({
    fontWeight: "bold",
    color: 'white',
    paddingLeft: 1,
  });