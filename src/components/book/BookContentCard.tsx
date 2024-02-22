import { Box, IconButton, Typography } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
import QuizIcon from '@mui/icons-material/RecordVoiceOverRounded';

import { BookContentDataType } from 'src/types/book';

import BookSingleContentCard from './BookSingleContentCard';
import BookMultiContentCard from './BookMultiContentCard';

const BookContentCard = ({
  isLastPage,
  bookLimit,
  bookContentData,
  currentOffset,
  handleChangePage,
}: {
  isLastPage: boolean;
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
          <BookSingleContentCard key={index} bookContent={bookContent}/>
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
          {isLastPage ? <QuizIcon /> : <NextIcon />}
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
