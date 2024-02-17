import { Box, Chip, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';
import BackIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { BookContentDataType } from 'src/pages/book/[bookId]';
import throttling from 'src/utils/throttling';
import { googleTTS } from 'src/utils/tts';

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
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

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
        currentContentData.map(({ image, subLan, mainLan, subContents, mainContents }, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                aspectRatio: '4/3',
                maxHeight: '50vh',
                borderRadius: '20px',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 4 } }}>
              <Box>
                <Chip
                  label="Main"
                  size="small"
                  sx={{
                    mb: { xs: 0.5, sm: 1 },
                    fontSize: { xs: '12px', sm: '16px' },
                    p: { sm: 1 },
                  }}
                  icon={<SoundIcon />}
                  onClick={() => {
                    throttling(() => googleTTS(mainContents, mainLan), 1000);
                  }}
                />

                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{ wordBreak: 'break-all', ml: 0.5 }}
                >
                  {mainContents}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label="Sub"
                  size="small"
                  sx={{
                    mb: { xs: 0.5, sm: 1 },
                    fontSize: { xs: '12px', sm: '16px' },
                    p: { sm: 1 },
                  }}
                  icon={<SoundIcon />}
                  onClick={() => {
                    throttling(() => googleTTS(subContents, subLan), 1000);
                  }}
                />
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{ wordBreak: 'break-all', ml: 0.5 }}
                >
                  {subContents}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            height: '100%',
            display: 'grid',
            gridTemplateRows: `repeat(${bookLimit}, 1fr)`,
            gap: 2,
          }}
        >
          {currentContentData.map(
            ({ image, subLan, mainLan, subContents, mainContents }, index) => (
              <Box key={index} sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                <Box
                  sx={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: '20px',
                    height: '100%',
                    flex: 2,
                  }}
                />
                <Box
                  sx={{
                    flex: bookLimit,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0.5,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label="Main"
                      size="small"
                      sx={{
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '12px', sm: bookLimit === 4 ? '12px' : '16px' },
                        p: { sm: 1 },
                      }}
                      icon={<SoundIcon />}
                      onClick={() => {
                        throttling(() => googleTTS(mainContents, mainLan), 1000);
                      }}
                    />
                    <Typography
                      variant={
                        isMobile
                          ? 'body1'
                          : bookLimit === 2
                            ? 'h5'
                            : bookLimit === 3
                              ? 'h6'
                              : 'body1'
                      }
                      sx={{ wordBreak: 'break-all', ml: 0.5 }}
                    >
                      {mainContents}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label="Sub"
                      size="small"
                      sx={{
                        mb: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '12px', sm: bookLimit === 4 ? '12px' : '16px' },
                        p: { sm: 1 },
                      }}
                      icon={<SoundIcon />}
                      onClick={() => {
                        throttling(() => googleTTS(subContents, subLan), 1000);
                      }}
                    />
                    <Typography
                      variant={
                        isMobile
                          ? 'body1'
                          : bookLimit === 2
                            ? 'h5'
                            : bookLimit === 3
                              ? 'h6'
                              : 'body1'
                      }
                      sx={{ wordBreak: 'break-all', ml: 0.5 }}
                    >
                      {subContents}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ),
          )}

          {bookContentData.length % bookLimit !== 0 &&
          Number((bookContentData.length / bookLimit).toFixed(0)) === currentOffset
            ? Array(bookLimit - (bookContentData.length % bookLimit))
                .fill(0)
                .map((_, index) => <Box key={index} />)
            : null}
        </Box>
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
