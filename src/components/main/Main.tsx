import React, { useState } from 'react';
import { Box } from '@mui/material';

import Menu from './Menu';
import Enter from '../login/Enter';
import Join from '../login/Join';
import Login from '../login/Login';
const Main = ({ tabIndex }: { tabIndex: number }) => {
  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);

  const handleOpenEnterModal = () => {
    setOpenEnterModal(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
      <Menu tabIndex={tabIndex} handleOpenEnterModal={handleOpenEnterModal} />
      <Enter
        open={openEnterModal}
        setOpen={setOpenEnterModal}
        setOpenLogin={setOpenLoginModal}
        setOpenJoin={setOpenJoinModal}
      />
      <Login open={openLoginModal} setOpen={setOpenLoginModal} />
      <Join open={openJoinModal} setOpen={setOpenJoinModal}/>
    </Box>
  );
};

export default Main;
