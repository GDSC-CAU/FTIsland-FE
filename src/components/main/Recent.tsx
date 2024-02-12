import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { getBookData } from 'src/testData/bookListData';

import StoryCard, { StoryDataType } from '../card/StoryCard';

const Recent = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const storyList: StoryDataType[] = getBookData();

  return (
    <Box
      sx={{
        display: storyList.length === 0 ? 'block' : 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
        },
        columnGap: 2,
        rowGap: 3,
        p: 2,
      }}
    >
      {storyList.map((bookData, idx) => (
        <Box
          key={idx}
          sx={{
            borderRadius: '20px',
            transition: '.5s',

            ...(!isMobile && {
              ':hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0px 8px 16px rgba(120, 120, 120, 0.25)',
              },
            }),
          }}
        >
          <StoryCard isClickable={true} bookData={bookData} />
        </Box>
      ))}

      {storyList.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          최근 탐험한 이야기가 없습니다.
        </Typography>
      ) : null}
    </Box>
  );
};

export default Recent;
