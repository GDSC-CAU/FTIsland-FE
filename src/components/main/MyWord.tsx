import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getVocaList } from 'src/testData/vocaListData';

import VocaCard from '../card/VocaCard';

type VocaType = { vocaId: number; word: string };

const MyWord = () => {
  const [vocaList, setVocaList] = useState<VocaType[]>([]);

  useEffect(() => {
    setVocaList(getVocaList());
  }, []);

  // 일단 index로 삭제, 추후에 id로 삭제하는걸로 변경
  const handleDeleteVoca = (targetIndex: number) => {
    setVocaList((prev) => {
      return prev.filter((_, idx) => idx != targetIndex);
    });
  };

  return (
    <Box
      sx={{
        display: vocaList.length === 0 ? 'block' : 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr',
          lg: '1fr 1fr 1fr 1fr',
        },
        columnGap: 3,
        rowGap: 3,
        p: 2,
        transformStyle: 'preserve-3d',
      }}
    >
      {vocaList.map(({ vocaId }, idx) => (
        <VocaCard key={vocaId} vocaId={vocaId} index={idx} handleDeleteVoca={handleDeleteVoca} />
      ))}

      {vocaList.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          추가된 단어가 없습니다.
        </Typography>
      ) : null}
    </Box>
  );
};

export default MyWord;
