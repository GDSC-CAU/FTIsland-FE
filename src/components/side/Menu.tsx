import React, { ReactElement } from 'react'
import LanguageSetting from './LanguageSetting'
import { Box } from '@mui/material';
import List from './List';
import SideButton from './SideButton';

interface MenuProps {
    setContent: (setContent: ReactElement) => void;
  }

const Menu: React.FC<MenuProps> =  ({setContent}) => {
    const handleClick = () => {
        setContent(<LanguageSetting setContent={setContent}/>)
    }
  return (
    <Box sx={{bgcolor: "#FFE5E5", height: "100%"}}>
      <List content={"메뉴"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , paddingBottom: 10}}>
        <SideButton content={"메인 페이지"}/>
        <SideButton content={"나의 동화 목록"}/>
        <SideButton content={"나의 단어 목록"}/>
      </Box>
      <List content={"언어 설정"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , paddingBottom: 22.5}}>
          <SideButton content={"바로 가기"}/>
      </Box>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , paddingBottom: 3.2,}}>
          <SideButton content={"로그아웃"} backgroundColor={"white"}/>
      </Box>
      {/* <button onClick={handleClick}></button> */}
    </Box>
  )
}

export default Menu;

