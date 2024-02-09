import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

import Layout from 'src/components/Layout';
import { getBookData } from 'src/testData/bookListData';

const BookPage = () => {
  const router = useRouter();
  const storyList = getBookData();

  const bookId = router.query.bookId ? Number(router.query.bookId) : 0;

  return (
    <Box>
      <Box>{storyList[bookId - 1].title}</Box>
      <Box>{storyList[bookId - 1].description}</Box>
    </Box>
  );
};

BookPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default BookPage;
