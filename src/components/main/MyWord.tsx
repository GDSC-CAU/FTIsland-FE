import { Box, Typography } from '@mui/material';

import { deleteVoca } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';

import VocaCard from '../card/VocaCard';

type VocaType = { vocaId: number; word: string };

const MyWord = ({ vocaListData }: { vocaListData: VocaType[] }) => {
  const { userId } = useUser();

  const handleDeleteVoca = async (targetIndex: number) => {
    await deleteVoca(userId, targetIndex);
  };

  return (
    <Box
      sx={{
        display: vocaListData.length === 0 ? 'block' : 'grid',
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
      {vocaListData.map(({ vocaId }, idx) => (
        <VocaCard key={vocaId} vocaId={vocaId} index={idx} handleDeleteVoca={handleDeleteVoca} />
      ))}

      {vocaListData.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          추가된 단어가 없습니다.
        </Typography>
      ) : null}
    </Box>
  );
};

export default MyWord;
