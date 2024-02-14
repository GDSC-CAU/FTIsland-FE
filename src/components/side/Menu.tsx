import React, { ReactElement, useState } from 'react'
import LanguageSetting from './LanguageSetting'
import { Box } from '@mui/material';
import List from './components/List';
import SideButton from './components/SideButton';
import Login from '../login/Login';

interface MenuProps {
    setContent: (setContent: ReactElement) => void;
    onClick?: (content: string) => void;
    handleSideMenu: (content: boolean) => void;
  }

const Menu: React.FC<MenuProps> =  ({setContent, onClick, handleSideMenu}) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const login = false; //임시 변수
  const handleLanguageSettingClick = () => {
    setContent(<LanguageSetting  setContent={setContent} onClick={onClick} handleSideMenu={handleSideMenu}/>)
  }
  return (
    <Box sx={{bgcolor: "#FFE5E5", height: "100vh"}}>
      <List content={"메뉴"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , paddingBottom: 10}}>
        <SideButton content={"메인 페이지"} onClick={()=>onClick &&onClick('메인 페이지')} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 동화 목록"} onClick={()=>onClick &&onClick('나의 동화 목록')} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 단어 목록"} onClick={()=>onClick &&onClick('나의 단어 목록')} handleSideMenu={handleSideMenu}/>
      </Box>
      <List content={"언어 설정"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column'}}>
          <SideButton content={"바로 가기"} onClick={handleLanguageSettingClick} handleSideMenu={handleSideMenu}/>
      </Box>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column',height: '33vh', justifyContent: 'flex-end'}}>
          <SideButton content={login?"로그아웃":"로그인"} backgroundColor={"white"} onClick={()=>{onClick && onClick('로그아웃');}} handleSideMenu={handleSideMenu} setOpen = {setOpenLoginModal}/>
          <Login open={openLoginModal} setOpen={setOpenLoginModal}></Login>
      </Box>
    </Box>
  )
}

export default Menu;
