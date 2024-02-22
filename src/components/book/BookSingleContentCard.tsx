import { Box, Chip } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { BookContentDataType } from 'src/types/book';
import throttling from 'src/utils/throttling';
import { googleTTS } from 'src/utils/tts';
import HighlightedText from './HighlightedText';

const BookSingleContentCard = ({ 
  bookContent,
}: { 
  bookContent: BookContentDataType
}) => {
  const { image, subLan, mainLan, subContents, mainContents, vocaList } = bookContent;

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
              throttling(() => googleTTS(mainContents, mainLan), 1000);
            }}
          />
          <HighlightedText type="main" contents={mainContents} wordList={vocaList} />
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
          <HighlightedText type="sub" contents={subContents} wordList={vocaList} />
        </Box>
      </Box>
    </Box>
  );
};

export default BookSingleContentCard;
