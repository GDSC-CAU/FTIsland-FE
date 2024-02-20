import { Avatar, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUser } from 'src/hook/useUser';

interface SideButtonProps {
  content: string;
  backgroundColor?: string;  // backgroundColor prop 추가
  onClick: (content: string) => void;
  handleSideMenu: (isOpen: boolean) => void;
  word?: boolean;
  setOpenEnter?: (isOpen: boolean) => void;
  setOpenJoin?: (isOpen: boolean) => void;
}

const SideButton: React.FC<SideButtonProps> = ({content, backgroundColor, onClick, handleSideMenu, word, setOpenEnter}) => {
  const [isHovered, setIsHovered] = useState(false);
  const {setUserRole, userRole} = useUser();

  const handleClick = () => {
    if(onClick){
      if(userRole ==='USER' || content ==='바로 가기'){
        onClick(content);
      }
      if(content === '바로 가기' || userRole !=='USER' && content !=='메인 페이지')handleSideMenu(true);
      else if(content ==='로그인/회원가입')handleSideMenu(true);
      else handleSideMenu(false);

    }
    if(content !=='메인 페이지' && content !=='바로 가기' && (userRole !== 'USER' || (content === '로그인/회원가입' && setOpenEnter))){
      if(setOpenEnter !== undefined){
        setOpenEnter(true);
      }
    }
    if(content === '로그아웃')setUserRole(null);
  }

  return (
    <Box 
      sx={boxStyle(backgroundColor, word)}
      onMouseEnter = {()=> setIsHovered(true)}
      onMouseLeave = {()=> setIsHovered(false)}
      onClick={handleClick}
    >
      <Typography variant="h5" sx={listStyle()} >{content}</Typography>
      <Avatar 
        src={!isHovered && backgroundColor==undefined ? "/image/arrow-right-white.png":"/image/arrow-right-black.png" }
        alt="arrow right" 
        sx={{ width: '15%', height: 'auto' }}/>
    </Box>
  )
}

export default SideButton;

const boxStyle = (backgroundColor: string | undefined, word: boolean | undefined)=>{
  if(backgroundColor)
    return {
      padding: 1.2,
      width: '80%',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: backgroundColor,
      color: 'black',
      
      marginTop: word?1:3, 
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
  
    marginTop: word?1:3, 
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