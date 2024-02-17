import { ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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

import BookCover from 'src/components/book/BookCover';
import BookContent from 'src/components/book/BookContent';
import BookQuiz from 'src/components/book/BookQuiz';
import Layout from 'src/components/Layout';

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

const BookPage = ({
  bookId,
  limit,
  offset,
}: {
  bookId: string;
  limit: string | null;
  offset: string | null;
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { replace } = useRouter();

  const [bookContentStep, setBookContentStep] = useState(limit ? 1 : 0);
  const [bookLimit, setBookLimit] = useState(Number(limit) || 1);
  const [currentOffset, setCurrentOffset] = useState(Number(offset) || 0);

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
      korContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.@@@@@',
      mainContents: '어느 날 엄마돼지는 아기돼지 삼 형제를 불러 모았어요.@@@@',
      subContents: 'One day, the mother pig called the three little pigs together.',
      image: '/image/coverImg3.jpg',
    },
  ];

  const testData3 = [
    {
      mainQuestion:
        '1. 만약에 콩쥐와 팥쥐가 서로 다른 음식을 좋아하는데, 어떤 음식을 좋아할 것 같아? 그 이유는 무엇일까?',
      subQuestion:
        '1. If Kongjwi and Patjwi like different foods, what food do you think they like? What is the reason?',
    },
    {
      mainQuestion:
        '2. 콩쥐와 팥쥐가 함께 모험을 떠난다면, 어떤 도전에 직면하게 될 것 같아? 그 상황에서 둘은 어떻게 협력할 수 있을까?',
      subQuestion:
        '2. If Kongjwi and Patjwi go on an adventure together, what challenges do you think they will face? How can the two cooperate in that situation?',
    },
    {
      mainQuestion:
        '3. 이야기의 결말을 바꿔서, 콩쥐와 팥쥐가 무엇인가를 함께 찾는 여정을 떠나게 된다면, 그것이 무엇일지 상상해봐.',
      subQuestion:
        '3. If you change the ending of the story and Kongjwi and Patjwi go on a journey to find something together, imagine what that would be.',
    },
  ];

  const bookSummaryData = testData1;
  const bookContentData = testData2;
  const bookQuizData = testData3;

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
    if (bookContentStep !== 0)
      replace(`/book/${Number(bookId)}?limit=${bookLimit}&offset=${currentOffset}`);
    else replace(`/book/${Number(bookId)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookLimit, currentOffset, bookId, bookContentStep]);

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
                replace(`/book/${bookId}?limit=${e.target.value}&offset=${currentOffset}`);
              }}
              input={<InputBase />}
              MenuProps={{
                PaperProps: { sx: { borderRadius: 1 } },
                MenuListProps: { sx: { padding: 0 } },
              }}
              sx={{
                display: bookContentStep === 1 ? 'block' : 'none',
                overflow: 'hidden',
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

      {bookContentStep === 2 ? (
        <BookQuiz
          bookCoverImage={bookSummaryData.image}
          bookQuizData={bookQuizData}
          handleChangeStep={handleChangeStep}
        />
      ) : null}
    </Box>
  );
};

BookPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { bookId, limit, offset } = context.query;

  const isBookIdValid = isNaN(Number(bookId)) || Number(bookId) < 1;
  // const isLimitValid =
  //   limit === undefined || isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 5;
  // const isOffsetValid = offset === undefined || isNaN(Number(offset)) || Number(offset) < 0;
  if (isBookIdValid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      bookId: bookId,
      limit: limit ?? null,
      offset: offset ?? null,
    },
  };
};

export default BookPage;
