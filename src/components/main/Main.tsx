import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Explore from './Explore';
import Menu from './Menu';
import Recent from './Recent';
import MyWord from './MyWord';
import Enter from '../login/Enter';
import Join from '../login/Join';
import { useUser } from 'src/hook/useUser';
import Login from '../login/Login';
import { getRecentBookListInfo } from 'src/apis/book';
import { useQuery } from '@tanstack/react-query';

const Main = ({ tabIndex }: { tabIndex: number }) => {
  const [content, setContent] = useState<ReactElement>(<Explore />);
  const [openEnterModal, setOpenEnterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const { userRole, userId } = useUser();

  const { data: recentBookListData } = useQuery({
    queryKey: ['recent-books', userId],
    queryFn: async () => await getRecentBookListInfo(userId),
    enabled: userRole === 'USER',
    initialData: [],
  });

  const handleClick = (newContent: ReactElement) => {
    setContent(newContent);
  };

  const handleOpenEnterModal = () => {
    setOpenEnterModal(true);
  };

  useEffect(() => {
    if (tabIndex === 0) handleClick(<Explore />);
    else if (tabIndex === 1) handleClick(<Recent recentBookListData={recentBookListData} />);
    else if (tabIndex === 2) handleClick(<MyWord />);
    getBookExample();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, userRole]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
      <Menu
        handleClick={handleClick}
        tabIndex={tabIndex}
        handleOpenEnterModal={handleOpenEnterModal}
      />
      <Box sx={{ width: '100%', height: '100%', bgcolor: '#E0F4FF', borderRadius: '24px' }}>
        {content}
      </Box>
      <Enter
        open={openEnterModal}
        setOpen={setOpenEnterModal}
        setOpenLogin={setOpenLoginModal}
        setOpenJoin={setOpenJoinModal}
      />
      <Login open={openLoginModal} setOpen={setOpenLoginModal} />
      <Join open={openJoinModal} setOpen={setOpenJoinModal}></Join>
    </Box>
  );
};

export default Main;
