import { Box, Chip } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { BookContentDataType } from 'src/types/book';
import throttling from 'src/utils/throttling';
import { googleTTS } from 'src/utils/tts';

import HighlightedText from './HighlightedText';

const BookMultiContentCard = ({
  bookLimit,
  bookContentData,
  currentOffset,
}: {
  bookLimit: number;
  bookContentData: BookContentDataType[];
  currentOffset: number;
}) => {
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
      {currentContentData.map(
        ({ image, subLan, mainLan, subContents, mainContents, vocaList }, index) => (
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

                <HighlightedText
                  type="main"
                  contents={mainContents}
                  wordList={vocaList}
                  sx={{
                    span: {
                      fontSize: {
                        xs: '14px',
                        sm: bookLimit === 2 ? '21px' : bookLimit === 3 ? ' 17.5px' : '14px',
                      },
                    },
                  }}
                />
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
                <HighlightedText
                  type="sub"
                  contents={mainContents}
                  wordList={vocaList}
                  sx={{
                    span: {
                      fontSize: {
                        xs: '14px',
                        sm: bookLimit === 2 ? '21px' : bookLimit === 3 ? ' 17.5px' : '14px',
                      },
                    },
                  }}
                />
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
  );
};

export default BookMultiContentCard;
