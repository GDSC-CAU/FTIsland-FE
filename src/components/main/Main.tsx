import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Explore from './Explore';
import Menu from './Menu';
import Recent from './Recent';
import MyWord from './MyWord';
import Login from '../login/Enter';
import Join from '../login/Join';
import { useUser } from 'src/hook/useUser';
import { getBookExample } from 'src/apis/language';

const Main = ({tabIndex} : {tabIndex : number}) => {
  const [content, setContent] = useState<ReactElement>(<Explore/>);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const {userRole} = useUser();

  const handleClick = (newContent: ReactElement) => {
    setContent(newContent);
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  }

  const handleOpenJoinModal = () => {
    setOpenJoinModal(true);
  }

  useEffect(()=>{
    if(tabIndex === 0)handleClick(<Explore/>);
    else if(tabIndex === 1)handleClick(<Recent/>);
    else if(tabIndex === 2)handleClick(<MyWord/>);
    getBookExample();
    if(userRole === 'GUEST')handleOpenJoinModal();
  }, [tabIndex, userRole]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
      <Menu handleClick={handleClick} tabIndex={tabIndex} handleOpenLoginModal={handleOpenLoginModal}/>
      <Box sx={{ width: '100%', height: '100%', bgcolor: '#E0F4FF', borderRadius: '24px' }}>
        {content}
      </Box>
      <Login open={openLoginModal} setOpen={setOpenLoginModal}></Login>
      <Join open={openJoinModal} setOpen={setOpenJoinModal}></Join>
    </Box>
  );
};

export default Main;
