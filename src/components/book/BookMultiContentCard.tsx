import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { BookContentDataType } from 'src/types/book';
import throttling from 'src/utils/throttling';
import { windowTTS } from 'src/utils/tts';

const BookMultiContentCard = ({
  bookLimit,
  bookContentData,
  currentOffset,
}: {
  bookLimit: number;
  bookContentData: BookContentDataType[];
  currentOffset: number;
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
        height: '100%',
        display: 'grid',
        gridTemplateRows: `repeat(${bookLimit}, 1fr)`,
        gap: 2,
      }}
    >
      {currentContentData.map(({ image, subLan, mainLan, subContents, mainContents }, index) => (
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
                  throttling(() => windowTTS(mainContents, mainLan), 1000);
                }}
              />
              <Typography
                variant={
                  isMobile ? 'body1' : bookLimit === 2 ? 'h5' : bookLimit === 3 ? 'h6' : 'body1'
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
                  throttling(() => windowTTS(subContents, subLan), 1000);
                }}
              />
              <Typography
                variant={
                  isMobile ? 'body1' : bookLimit === 2 ? 'h5' : bookLimit === 3 ? 'h6' : 'body1'
                }
                sx={{ wordBreak: 'break-all', ml: 0.5 }}
              >
                {subContents}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      {bookContentData.length % bookLimit !== 0 &&
      Number((bookContentData.length / bookLimit).toFixed(0)) === currentOffset
        ? Array(bookLimit - (bookContentData.length % bookLimit))
            .fill(0)
            .map((_, index) => <Box key={index} />)
        : null}
    </Box>
  );
};

export default BookMultiContentCard;
