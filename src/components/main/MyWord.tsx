import { Box, Typography } from '@mui/material';

import VocaCard from '../card/VocaCard';
import Loading from '../Loading';
import useTranslation from 'next-translate/useTranslation';

type VocaType = { vocaId: number; word: string; image: string; subWord: string };

const MyWord = ({ isLoading, vocaListData }: { isLoading: boolean; vocaListData: VocaType[] }) => {
  const { t } = useTranslation('common');

  if (isLoading) return <Loading />;

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
      {vocaListData.map(({ vocaId, image }) => (
        <VocaCard key={vocaId} vocaId={vocaId} image={image} />
      ))}

      {vocaListData.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {t('noMyWords')}
        </Typography>
      ) : null}
    </Box>
  );
};

export default MyWord;
