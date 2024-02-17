import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { BookContentDataType } from 'src/pages/book/[bookId]';
import throttling from 'src/utils/throttling';
import { windowTTS } from 'src/utils/tts';

const BookSingleContentCard = ({ bookContent }: { bookContent: BookContentDataType }) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const { image, subLan, mainLan, subContents, mainContents } = bookContent;

  return (
    <Box
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
              throttling(() => windowTTS(mainContents, mainLan), 1000);
            }}
          />

          <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ wordBreak: 'break-all', ml: 0.5 }}>
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
              throttling(() => windowTTS(subContents, subLan), 1000);
            }}
          />
          <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ wordBreak: 'break-all', ml: 0.5 }}>
            {subContents}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookSingleContentCard;
