import { Avatar, Box, Typography } from '@mui/material'
import React, { useState } from 'react'

interface SideButtonProps {
  content: string;
  backgroundColor?: string;  // backgroundColor prop 추가
  onClick: (content: string) => void;
  handleSideMenu: (isOpen: boolean) => void;
}

const SideButton: React.FC<SideButtonProps> = ({content, backgroundColor, onClick, handleSideMenu}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if(onClick){
      onClick(content);
      if(content === '바로 가기')handleSideMenu(true);
      else if(content === '로그아웃')handleSideMenu(false);
      else handleSideMenu(false);
    }
  }

  return (
    <Box 
      sx={boxStyle(backgroundColor)}
      onMouseEnter = {()=> setIsHovered(true)}
      onMouseLeave = {()=> setIsHovered(false)}
      onClick={handleClick}
    >
      <Typography variant="h5" sx={listStyle()} >{content}</Typography>
      <Avatar 
        src={!isHovered && backgroundColor==undefined ? "/arrow-right-white.png":"/arrow-right-black.png" }
        alt="arrow right" 
        sx={{ width: '15%', height: 'auto' }}/>
    </Box>
  )
}

export default SideButton;

const boxStyle = (backgroundColor: string | undefined)=>{
  if(backgroundColor)
    return {
      padding: 1.2,
      width: '80%',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: backgroundColor,
      color: 'black',
    
      marginTop: 3, 
      borderRadius: 10, 
      boxShadow: 3,
      display: 'flex', 
      flexDirection: 'row',
      cursor: 'pointer',
      '&:hover':{
        color: 'white',
        bgcolor: '#FF8383',
      }
    }
  return {
    padding: 1.2,
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: backgroundColor || '#FF8383',
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
  } 
  
};

const listStyle = ()=>({
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    width: '80%'
  });