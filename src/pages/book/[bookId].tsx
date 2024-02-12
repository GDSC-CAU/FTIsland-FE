import { ReactElement } from 'react';
import { Box } from '@mui/material';

import Layout from 'src/components/Layout';

const BookPage = () => {
  return <Box>동화 페이지</Box>;
};

BookPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default BookPage;
