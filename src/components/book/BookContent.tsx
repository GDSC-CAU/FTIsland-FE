import { Box } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
import QuizIcon from '@mui/icons-material/RecordVoiceOverRounded';

import { BookContentDataType } from 'src/types/book';

import BookContentCard from './BookContentCard';
import SideMenu from '../SideMenu';
import { useState } from 'react';
import Enter from '../login/Enter';
import Join from '../login/Join';
import Login from '../login/Login';
import { useUser } from 'src/hook/useUser';

const BookContent = ({
  bookLimit,
  bookContentData,
  currentOffset,
  handleChangePage,
}: {
  bookLimit: number;
  bookContentData: BookContentDataType[];
  currentOffset: number;
  handleChangePage: (isNext: boolean) => void;
}) => {
  const isLastPage = Number(Math.ceil(bookContentData.length / bookLimit)) - 1 === currentOffset;
  // const [sideMenuOpen, setSideMenuOpen] = useState(false);
  // const [openEnterModal, setOpenEnterModal] = useState(false);
  const {wordModal, setWordModal, wordEnter, setWordEnter} = useUser();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);
  
  const handleSideMenu = (isOpen: boolean) => {
    setWordModal(isOpen);
  };

  return (
    <Box sx={{ height: '100%', display: { sm: 'flex' } }}>
      <SideMenu open={wordModal} handleSideMenu={handleSideMenu} wordOpen={wordModal}/>
      <Enter
        open={wordEnter}
        setOpen={setWordEnter}
        setOpenLogin={setOpenLoginModal}
        setOpenJoin={setOpenJoinModal}
      />
      <Login open={openLoginModal} setOpen={setOpenLoginModal} />
      <Join open={openJoinModal} setOpen={setOpenJoinModal}/>
      <Box
        onClick={() => handleChangePage(false)}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: '56px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          mx: 1.5,

          svg: {
            color: '#1976d2',
            stroke: '#1976d2',
            strokeWidth: 1.5,
          },

          ':hover': {
            cursor: 'pointer',
            backgroundColor: '#E0F4FF',
          },
        }}
      >
        <BackIcon />
      </Box>

      <Box sx={{ height: '100%', mx: { sm: 'auto' }, flex: 1 }}>
        <BookContentCard
          isLastPage={isLastPage}
          bookLimit={bookLimit}
          bookContentData={bookContentData}
          currentOffset={currentOffset}
          handleChangePage={handleChangePage}
        />
      </Box>

      <Box
        onClick={() => handleChangePage(true)}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: '56px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '20px',
          mx: 1.5,

          svg: {
            color: '#1976d2',
            stroke: '#1976d2',
            strokeWidth: 1.5,
          },
          ':hover': {
            cursor: 'pointer',
            backgroundColor: '#E0F4FF',
          },
        }}
      >
        {isLastPage ? <QuizIcon /> : <NextIcon />}
      </Box>
    </Box>
  );
};

export default BookContent;
