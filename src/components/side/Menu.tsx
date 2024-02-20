import React, { ReactElement, useState } from 'react'
import LanguageSetting from './LanguageSetting'
import { Box } from '@mui/material';
import List from './components/List';
import SideButton from './components/SideButton';
import Enter from '../login/Enter';
import { useUser } from 'src/hook/useUser';
import Join from '../login/Join';
import Login from '../login/Login';

interface MenuProps {
    setContent: (setContent: ReactElement) => void;
    handleSideMenu: (content: boolean) => void;
  }

const Menu: React.FC<MenuProps> =  ({setContent, handleSideMenu}) => {
  const {userRole, setUserRole} = useUser();
  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const handleLanguageSettingClick = () => {
    setContent(<LanguageSetting  setContent={setContent} handleSideMenu={handleSideMenu}/>)
  }
  return (
    <Box sx={{bgcolor: "#FFE5E5", height: "100vh"}}>
      <List content={"메뉴"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , paddingBottom: 10}}>
        <SideButton content={"메인 페이지"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 동화 목록"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 단어 목록"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu} />
      </Box>
      <List content={"언어 설정"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column'}}>
          <SideButton content={"바로 가기"} handleLanguage={handleLanguageSettingClick} handleSideMenu={handleSideMenu} setOpenEnter = {setOpenEnterModal}/>
      </Box>
      <Box sx={{width: '30px', height: '30px', bgcolor: 'red'}} onClick={()=>setUserRole('USER')}></Box>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column',height: '33vh', justifyContent: 'flex-end'}}>
          <SideButton content={userRole==="USER"?"로그아웃":"로그인/회원가입"} backgroundColor={"white"} handleSideMenu={handleSideMenu} setOpenEnter = {setOpenEnterModal}/>
          <Enter open={openEnterModal} setOpen={setOpenEnterModal} setOpenLogin = {setOpenLoginModal} setOpenJoin={setOpenJoinModal}/>
          <Login open={openLoginModal} setOpen={setOpenLoginModal}/>
          <Join open={openJoinModal} setOpen={setOpenJoinModal}/>
      </Box>
    </Box>
  )
}

export default Menu;
