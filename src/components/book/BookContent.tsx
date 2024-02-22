import { Box } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
import QuizIcon from '@mui/icons-material/RecordVoiceOverRounded';

import { BookContentDataType } from 'src/types/book';

import BookContentCard from './BookContentCard';
import SideMenu from '../SideMenu';
import { useState } from 'react';

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
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const handleSideMenu = (isOpen: boolean) => {
    setSideMenuOpen(isOpen);
  };

  return (
    <Box sx={{ height: '100%', display: { sm: 'flex' } }}>
      <SideMenu open={sideMenuOpen} handleSideMenu={handleSideMenu} wordOpen={true}/>
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
          handleSideMenu={handleSideMenu}
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
