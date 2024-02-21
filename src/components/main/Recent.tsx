import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import StoryCard, { StoryDataType } from '../card/StoryCard';

const Recent = ({ recentBookListData }: { recentBookListData: StoryDataType[] }) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: recentBookListData.length === 0 ? 'block' : 'grid',
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
      {recentBookListData.map((bookData, idx) => (
        <Box
          key={idx}
          sx={{
            borderRadius: '20px',
            transition: '.5s',
            maxWidth: '360px',
            mx: 'auto',

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

      {recentBookListData.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          최근 탐험한 이야기가 없습니다.
        </Typography>
      ) : null}
    </Box>
  );
};

export default Recent;
