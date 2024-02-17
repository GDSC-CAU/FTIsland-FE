import { Box, IconButton, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { BookContentDataType } from 'src/pages/book/[bookId]';

import BookSingleContentCard from './BookSingleContentCard';
import BookMultiContentCard from './BookMultiContentCard';

const BookContentCard = ({
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
  const currentContentData = bookContentData.slice(
    currentOffset * bookLimit,
    currentOffset * bookLimit + bookLimit,
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        gap: 2,
      }}
    >
      {bookLimit === 1 ? (
        currentContentData.map((bookContent, index) => (
          <BookSingleContentCard key={index} bookContent={bookContent} />
        ))
      ) : (
        <BookMultiContentCard
          bookLimit={bookLimit}
          bookContentData={bookContentData}
          currentOffset={currentOffset}
        />
      )}

      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '200px',
          mx: 'auto',
          bgcolor: '#39A7FF',
          borderRadius: '20px',
          py: 0.5,
          color: 'white',
          svg: {
            color: 'white',
          },
        }}
      >
        <IconButton onClick={() => handleChangePage(false)} sx={{ width: '24px', height: '24px' }}>
          <BackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 600 }}
        >{`${currentOffset + 1} / ${bookContentData.length / bookLimit}`}</Typography>
        <IconButton onClick={() => handleChangePage(true)} sx={{ width: '24px', height: '24px' }}>
          <NextIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h5"
        sx={{
          display: { xs: 'none', sm: 'block' },
          textAlign: 'center',
        }}
      >{`- ${currentOffset + 1} -`}</Typography>
    </Box>
  );
};
export default BookContentCard;
