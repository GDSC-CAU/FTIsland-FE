import { Box, Button, Chip, Typography } from '@mui/material';

const BookCover = ({
  bookSummaryData,
  handleChangeStep,
}: {
  bookSummaryData: {
    bookId: number;
    title: string;
    description: string;
    category: string;
    country: string;
    totalPage: number;
    image: string;
  };
  handleChangeStep: (isNext: boolean) => void;
}) => {
  const { title, description, category, country, image } = bookSummaryData;

  return (
    <Box sx={{ width: '100%', height: '100%', flex: 1 }}>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${image})`,
          width: '100%',
          height: 'calc(100vh - 48px)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            width: '100%',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
            position: 'absolute',
            height: '50%',
            bottom: 0,
          }}
        />
        <Box sx={{ p: 3, zIndex: 50, height: '20%', minHeight: '150px' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,

              div: {
                height: 28,
              },
              span: {
                fontWeight: 600,
                fontSize: '16px',
                color: 'white',
              },
            }}
          >
            <Chip label={category} sx={{ bgcolor: '#39A7FF', my: 1 }} />
            <Chip label={country} sx={{ bgcolor: '#39A7FF', my: 1 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 600,
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'white',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'anywhere',
              wordBreak: 'break-all',
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              handleChangeStep(true);
            }}
          >
            <Typography variant="h6">처음부터 읽기</Typography>
          </Button>
          <Button
            onClick={() => {
              handleChangeStep(true);
            }}
          >
            <Typography variant="h6">이어서 읽기</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookCover;
