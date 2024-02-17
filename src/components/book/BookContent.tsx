import { Box } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { BookContentDataType } from 'src/pages/book/[bookId]';

import BookContentCard from './BookContentCard';

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
  return (
    <Box sx={{ height: '100%', display: { sm: 'flex' } }}>
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
        <NextIcon />
      </Box>
    </Box>
  );
};

export default BookContent;
