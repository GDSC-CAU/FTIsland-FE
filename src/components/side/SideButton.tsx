import { Avatar, Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const SideButton = ({content} : {content: string}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box 
      sx={boxStyle()}
      onMouseEnter = {()=> setIsHovered(true)}
      onMouseLeave = {()=> setIsHovered(false)}
    >
      <Typography variant="h5" sx={listStyle()} >{content}</Typography>
      <Avatar 
        src={isHovered ? "/arrow-right-black.png":"/arrow-right-white.png" }
        alt="arrow right" 
        sx={{ width: '15%', height: 'auto' }}/>
    </Box>
  )
}

export default SideButton;

const boxStyle = ()=>({
  padding: 1.2,
  width: '80%',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#FF8383',
  color: 'white',

  marginTop: 3, 
  borderRadius: 10, 
  boxShadow: 3,
  display: 'flex', 
  flexDirection: 'row',
  cursor: 'pointer',
  '&:hover':{
    bgcolor: 'white',
    color: 'black',
  }
})

const listStyle = ()=>({
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    width: '80%'
  });