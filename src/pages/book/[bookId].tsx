import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  InputBase,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Layout from 'src/components/Layout';
import BookCover from 'src/components/book/BookCover';
import BookContent from 'src/components/book/BookContent';
import BookQuiz from 'src/components/book/BookQuiz';

export type BookContentDataType = {
  bookId: number;
  page: number;
  mainLan: string;
  subLan: string;
  korContents: string;
  mainContents: string;
  subContents: string;
  image: string;
};

const BookPage = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { query, replace } = useRouter();

  const [bookContentStep, setBookContentStep] = useState(query.limit ? 1 : 0);
  const [bookLimit, setBookLimit] = useState(Number(query.limit) || 1);
  const [currentOffset, setCurrentOffset] = useState(Number(query.offset) || 0);

  // 쿼리파라미터에서 가져올때 유효성 검사 로직 필요!!
  // 전체 리밋을 넘는지, 그리고 모바일에서는 2까지만 가능하도록 해야함

  const testData1 = {
    bookId: 1,
    title: '아기 돼지 삼형제',
    description: '아기 돼지들이 ~~~',
    category: '모험',
    country: '영국',
    totalPage: 12,
    image: '/image/coverImg2.jpg',
  };

  const testData2 = [
    {
      bookId: 1,
      page: 1,
      mainLan: 'ko',
      subLan: 'en',
      korContents: '어느 숲 속 마을에 엄마돼지와 아기돼지 삼 형제가 살고 있었어요.',
      mainContents: '어느 숲 속 마을에 엄마돼지와 아기돼지 삼 형제가 살고 있었어요.',
      subContents: 'A mother pig and three little pigs lived in a forest village.',
      image: '/image/coverImg1.jpg',
    },
    {
      bookId: 1,
      page: 2,
      mainLan: 'ko',
      subLan: 'en',
      korContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.',
      mainContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.',
      subContents: 'One day, the mother pig called the three little pigs together.',
      image: '/image/coverImg3.jpg',
    },
    {
      bookId: 1,
      page: 3,
      mainLan: 'ko',
      subLan: 'en',
      korContents: '어느 숲 속 마을에 엄마돼지와 아기돼지 삼 형제가 살고 있었어요.',
      mainContents: '어느 숲어느 숲어느 숲어느 숲어느 숲어느 숲어느 숲어느 숲',
      subContents: 'A mother pig aA mother pig aA mother pig aA mother pig aA mother pig a',
      image: '/image/coverImg1.jpg',
    },
    {
      bookId: 1,
      page: 4,
      mainLan: 'ko',
      subLan: 'en',
      korContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.',
      mainContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.',
      subContents: 'One day, the mother pig called the three little pigs together.',
      image: '/image/coverImg3.jpg',
    },
  ];

  const bookContentData = testData2;
  const bookSummaryData = testData1;

  const handleChangeStep = (isNext: boolean) => {
    setBookContentStep((prev) => {
      if (isNext) {
        if (prev === 2) return prev;
        else return prev + 1;
      } else {
        if (prev === 0) return prev;
        else return prev - 1;
      }
    });
  };

  const handleChangePage = (isNext: boolean) => {
    setCurrentOffset((prev) => {
      if (isNext) {
        if (prev * bookLimit + bookLimit >= bookContentData.length) {
          handleChangeStep(isNext);
          return prev;
        } else return prev + 1;
      } else {
        if (prev === 0) {
          handleChangeStep(isNext);
          return prev;
        } else return prev - 1;
      }
    });
  };

  const limitList = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3 (desktop)' },
    { value: 4, label: '4 (desktop)' },
  ];

  useEffect(() => {
    if (isMobile && bookLimit > 2) {
      setBookLimit(1);
      setCurrentOffset(0);
    }
  }, [bookLimit, isMobile]);

  useEffect(() => {
    if (bookContentStep === 1)
      replace(`/book/${query.bookId}?limit=${bookLimit}&offset=${currentOffset}`);
    else replace(`/book/${query.bookId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookLimit, currentOffset, query.bookId, bookContentStep]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        width: '100%',
        height: 'calc(100vh - 64px)',

        ...(bookContentStep !== 0 && {
          py: 2,
          px: { xs: 2, sm: 0 },
          mt: 1,
        }),
      }}
    >
      {bookContentStep !== 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mx: { sm: '80px' },
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            {bookSummaryData.title}
          </Typography>
          <Tooltip title="첫 페이지에서만 설정이 가능합니다." placement="top" disableTouchListener>
            <Select
              disabled={currentOffset !== 0}
              value={bookLimit}
              onChange={(e) => {
                setBookLimit(e.target.value as number);
                replace(`/book/${query.bookId}?limit=${e.target.value}&offset=${currentOffset}`);
              }}
              input={<InputBase />}
              MenuProps={{
                PaperProps: { sx: { borderRadius: 1 } },
                MenuListProps: { sx: { padding: 0 } },
              }}
              sx={{
                '.MuiSelect-select': {
                  px: 1,
                  ':before': {
                    content: '"모아보기 : "',
                  },
                },
              }}
            >
              {limitList.map((item, idx) => (
                <MenuItem
                  disabled={isMobile ? item.value >= 3 : false}
                  key={item.value}
                  value={item.value}
                  divider={limitList.length - 1 !== idx}
                  sx={{ height: '40px', px: 2.5 }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </Box>
      ) : null}

      {bookContentStep === 0 ? (
        <BookCover bookSummaryData={bookSummaryData} handleChangeStep={handleChangeStep} />
      ) : null}

      {bookContentStep === 1 ? (
        <BookContent
          bookLimit={bookLimit}
          bookContentData={bookContentData}
          currentOffset={currentOffset}
          handleChangePage={handleChangePage}
        />
      ) : null}

      {bookContentStep === 2 ? <BookQuiz /> : null}
    </Box>
  );
};

BookPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default BookPage;
