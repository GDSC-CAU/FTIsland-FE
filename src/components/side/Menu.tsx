import React, { ReactElement, useState } from 'react';
import LanguageSetting from './LanguageSetting';
import { Box } from '@mui/material';
import List from './components/List';
import SideButton from './components/SideButton';
import Enter from '../login/Enter';
import { useUser } from 'src/hook/useUser';
import Join from '../login/Join';
import Login from '../login/Login';
import ParentButton from './components/ParentButton';
import useTranslation from 'next-translate/useTranslation';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  handleSideMenu: (content: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ setContent, handleSideMenu }) => {
  const { t: sideMenu } = useTranslation('common');
  const t = (text: string) => sideMenu(`sideMenu.${text}`);
  const { userRole, setIsLanguageSetting } = useUser();

  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);

  const handleLanguageSettingClick = async () => {
    setIsLanguageSetting(true);
    await setContent(<LanguageSetting setContent={setContent} handleSideMenu={handleSideMenu} />);
  };

  return (
    <Box sx={{ bgcolor: '#FFE5E5', height: '100vh' }}>
      <ParentButton />

      <List content={t('menu')} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '40%',
        }}
      >
        <SideButton
          type="mainPage"
          content={t('mainPage')}
          setOpenEnter={setOpenEnterModal}
          handleSideMenu={handleSideMenu}
        />
        <SideButton
          type="myBookList"
          content={t('myBookList')}
          setOpenEnter={setOpenEnterModal}
          handleSideMenu={handleSideMenu}
        />
        <SideButton
          type="myWordList"
          content={t('myWordList')}
          setOpenEnter={setOpenEnterModal}
          handleSideMenu={handleSideMenu}
        />
      </Box>
      <List content={t('language')} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '25%',
        }}
      >
        <SideButton
          type="setting"
          content={t('setting')}
          handleLanguage={handleLanguageSettingClick}
          handleSideMenu={handleSideMenu}
          setOpenEnter={setOpenEnterModal}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '10%',
          paddingBottom: '20px',
        }}
      >
        <SideButton
          type="sign"
          content={userRole === 'USER' ? t('logOut') : t('loginSignUp')}
          backgroundColor={'white'}
          handleSideMenu={handleSideMenu}
          setOpenEnter={setOpenEnterModal}
        />
        <Enter
          open={openEnterModal}
          setOpen={setOpenEnterModal}
          setOpenLogin={setOpenLoginModal}
          setOpenJoin={setOpenJoinModal}
        />
        <Login open={openLoginModal} setOpen={setOpenLoginModal} />
        <Join open={openJoinModal} setOpen={setOpenJoinModal} />
      </Box>
    </Box>
  );
};

export default Menu;
