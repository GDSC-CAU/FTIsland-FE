import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, SelectChangeEvent } from '@mui/material';

import { useUser } from 'src/hook/useUser';
import convertLanguageCode from 'src/utils/convertedLanguageCode';

import Back from './components/Back';
import List from './components/List';
import LanguageButton from './components/LanguageButton';
import Menu from './Menu';
import { putLanguage } from './../../../src/apis/language';
import useTranslation from 'next-translate/useTranslation';

interface MenuProps {
  setContent: (setContent: ReactElement) => void;
  handleSideMenu: (content: boolean) => void;
}

const LanguageSetting: React.FC<MenuProps> = ({ setContent, handleSideMenu }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { user, userId, userRole, setMainLanguage, setSubLanguage, setIsLanguageSetting } =
    useUser();

  const handleBack = () => {
    setContent(<Menu setContent={setContent} handleSideMenu={handleSideMenu} />);
    setIsLanguageSetting(false);
  };

  useEffect(() => {}, [user]);

  const handleMainLanguageChange = async (event: SelectChangeEvent<string>) => {
    const lan = event.target.value as string;
    setMainLanguage(lan);
    localStorage.setItem('mainLanguage', lan);

    router.replace(router.asPath, router.asPath, {
      locale: convertLanguageCode(lan),
    });

    if (userRole === 'USER') {
      await putLanguage(
        userId,
        convertLanguageCode(user.mainLanguage),
        convertLanguageCode(user.subLanguage),
      );
    }
  };

  const handleSubLanguageChange = async (event: SelectChangeEvent<string>) => {
    const lan = event.target.value as string;
    setSubLanguage(lan);
    localStorage.setItem('subLanguage', lan);
    if (userRole === 'USER') {
      await putLanguage(
        userId,
        convertLanguageCode(user.mainLanguage),
        convertLanguageCode(user.subLanguage),
      );
    }
    event.stopPropagation();
  };

  return (
    <Box sx={{ bgcolor: '#FFE5E5', height: '100vh' }}>
      <Back handleBack={handleBack} />

      <List content={t('sideMenu.mainLanguage')} />
      <LanguageButton sort={'main'} handleLanguageChange={handleMainLanguageChange} />

      <List content={t('sideMenu.subLanguage')} />
      <LanguageButton sort={'sub'} handleLanguageChange={handleSubLanguageChange} />
    </Box>
  );
};

export default LanguageSetting;
