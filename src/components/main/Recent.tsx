import React from 'react';
import { Box } from '@mui/material';

import { getBookData } from 'src/testData/bookListData';

import StoryCard from '../StoryCard';

const Recent = () => {
  const storyList = getBookData();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
        },
        columnGap: { xs: 1, sm: 2 },
        rowGap: { xs: 2, sm: 2 },
        p: 2,
      }}
    >
      {storyList.map(({ bookId, title, description, images }, idx) => (
        <Box
          key={idx}
          sx={{
            borderRadius: '20px',
            transition: '.5s',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0px 8px 16px rgba(120, 120, 120, 0.25)',
            },
          }}
        >
          <StoryCard
            isClickable={true}
            bookId={bookId}
            title={title}
            description={description}
            images={images}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Recent;
