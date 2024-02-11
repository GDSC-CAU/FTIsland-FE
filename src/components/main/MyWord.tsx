import React from 'react';
import { Box } from '@mui/material';

import { getVocaList } from 'src/testData/vocaListData';

import VocaCard from '../card/VocaCard';

const MyWord = () => {
  const vocaList = getVocaList();

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
        columnGap: 3,
        rowGap: 3,
        p: 2,
        mx: { xs: 6, sm: 0 },
        transformStyle: 'preserve-3d',
      }}
    >
      {vocaList.map(({ vocaId }) => (
        <VocaCard key={vocaId} vocaId={vocaId} />
      ))}
    </Box>
  );
};

export default MyWord;
