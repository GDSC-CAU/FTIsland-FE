import React, { ReactElement, useState } from 'react'
import LanguageSetting from './LanguageSetting'
import { Avatar, Box, Typography } from '@mui/material';
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
  const {userRole, setIsLanguageSetting} = useUser();
  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const handleLanguageSettingClick = async () => {
    setIsLanguageSetting(true);
    await setContent(<LanguageSetting  setContent={setContent} handleSideMenu={handleSideMenu}/>);
  }
  const handleParent = () => {
    setIsParent(!isParent);
  }
  return (
    <Box sx={{bgcolor: "#FFE5E5", height: "100vh"}}>
      <Box sx={{bgcolor: "#39A7FF", padding: 1.2, boxShadow: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '7%'}}>
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

      <List content={"메뉴"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column' , height: '40%'}}>
        <SideButton content={"메인 페이지"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 동화 목록"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu}/>
        <SideButton content={"나의 단어 목록"} setOpenEnter={setOpenEnterModal} handleSideMenu={handleSideMenu} />
      </Box>
      <List content={"언어 설정"}/>
      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column', height: '25%'}}>
          <SideButton content={"바로 가기"} handleLanguage={handleLanguageSettingClick} handleSideMenu={handleSideMenu} setOpenEnter = {setOpenEnterModal}/>
      </Box>
      


      <Box sx={{
        display: 'flex', alignItems: 'center',flexDirection:'column',justifyContent: 'center', height: '10%', paddingBottom:'20px'}}>
          <SideButton content={userRole==="USER"?"로그아웃":"로그인/회원가입"} backgroundColor={"white"} handleSideMenu={handleSideMenu} setOpenEnter = {setOpenEnterModal}/>
          <Enter open={openEnterModal} setOpen={setOpenEnterModal} setOpenLogin = {setOpenLoginModal} setOpenJoin={setOpenJoinModal}/>
          <Login open={openLoginModal} setOpen={setOpenLoginModal}/>
          <Join open={openJoinModal} setOpen={setOpenJoinModal}/>
      </Box>
    </Box>
  )
}

export default Menu;

const listStyle = ()=>({
    fontWeight: "bold",
    color: 'white',
    paddingLeft: 1,
  });