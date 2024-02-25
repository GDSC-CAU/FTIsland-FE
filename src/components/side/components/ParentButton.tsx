import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Avatar, Box, Typography } from '@mui/material';

import { useUser } from 'src/hook/useUser';

const ParentButton = () => {
  const { userId, setUserId } = useUser();
  const { t } = useTranslation('common');

  const [isParent, setIsParent] = useState(false);

  const handleParent = () => {
    const difference = isParent ? -1 : 1;
    localStorage.setItem('userId', String(Number(userId) + difference));
    setUserId(Number(userId) + difference);
    setIsParent(!isParent);
  };

  return (
    <Box
      sx={{
        bgcolor: '#39A7FF',
        padding: 1.2,
        boxShadow: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '7%',
      }}
    >
      {Number(userId) > 0 && (
        <>
          <Typography variant="h5" sx={listStyle()}>
            {t('sideMenu.parentMode')}
          </Typography>
          <Avatar
            src={isParent ? '/image/on.webp' : '/image/off.webp'}
            alt="arrow right"
            sx={{ width: '95px', height: '30px', borderRadius: '0px', bgColor: 'none' }}
            onClick={handleParent}
          />
        </>
      )}
    </Box>
  );
};

export default ParentButton;

const listStyle = () => ({
  fontWeight: 'bold',
  color: 'white',
  paddingLeft: 1,
});
