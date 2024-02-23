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
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { createQuiz, getBookContent, getBookInfo, updateLastPage } from 'src/apis/book';
import BookCover from 'src/components/book/BookCover';
import BookContent from 'src/components/book/BookContent';
import BookQuiz from 'src/components/book/BookQuiz';
import Layout from 'src/components/Layout';
import Loading from 'src/components/Loading';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

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
  const { userId, user } = useUser();
  const queryClient = useQueryClient();

  const [bookContentStep, setBookContentStep] = useState(limit ? 1 : 0);
  const [bookLimit, setBookLimit] = useState(Number(limit) || 1);
  const [currentOffset, setCurrentOffset] = useState(Number(offset) || 0);
  const [marginLeft, setMarginLeft] = useState('0');

  const { data: bookInfoData, isLoading: isBookCoverLoading } = useQuery({
    queryKey: ['bookInfoData', bookId],
    queryFn: async () => await getBookInfo(Number(bookId)),
  });

  const { data: bookContentData, isLoading: isBookContentLoading } = useQuery({
    queryKey: ['bookContentData', bookId, user.mainLanguage, user.subLanguage],
    queryFn: async () =>
      await getBookContent(
        Number(bookId),
        convertedLanguageCode(user.mainLanguage),
        convertedLanguageCode(user.subLanguage),
      ),
  });

  const { data: bookQuizData, isLoading: isBookQuizLoading } = useQuery({
    queryKey: ['bookQuizData', userId, bookId, user.mainLanguage, user.subLanguage],
    queryFn: async () =>
      await createQuiz(
        userId,
        Number(bookId),
        convertedLanguageCode(user.mainLanguage),
        convertedLanguageCode(user.subLanguage),
      ),
  });

  const handleChangeStep = (isNext: boolean) => {
    setBookContentStep((prev) => {
      if (isNext) {
        if (prev === 2) return prev;
        else {
          // 퀴즈로 넘어가는 순가 마지막으로 읽은 페이지 저장
          if (prev === 1) mutation.mutate();
          return prev + 1;
        }
      } else {
        if (prev === 0) return prev;
        else {
          // 읽다가 표지로 넘어가는 순간 읽은 페이지 저장
          if (prev === 1) mutation.mutate();
          return prev - 1;
        }
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

  const handleClickLastReadBook = (imputOffset: number, imputLimit: number) => {
    setCurrentOffset(imputOffset);
    setBookLimit(imputLimit);
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

  const mutation = useMutation({
    mutationFn: async () => await updateLastPage(userId, Number(bookId), currentOffset, bookLimit),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['progressData'],
      });
    },
  });

  useEffect(() => {
    return () => {
      if (bookContentStep === 1) mutation.mutate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleInnerSize = () => {
      if (window.innerWidth > 1000) {
        setMarginLeft('calc((100vw - 1000px)/-2)');
      }
    };
    handleInnerSize();
    window.addEventListener('resize', handleInnerSize);

    return () => {
      window.removeEventListener('resize', handleInnerSize);
    };
  }, []);

  useEffect(() => {
    if (bookContentStep !== 0)
      replace(`/book/${Number(bookId)}?limit=${bookLimit}&offset=${currentOffset}`);
    else replace(`/book/${Number(bookId)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookLimit, currentOffset, bookId, bookContentStep]);

  if (bookContentStep === 0 && isBookCoverLoading) return <Loading />;
  if (bookContentStep === 1 && isBookContentLoading) return <Loading />;
  if (bookContentStep === 2 && isBookQuizLoading) return <Loading />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        width: bookContentStep === 0 ? '100vw' : '100%',
        ml: bookContentStep === 0 ? marginLeft : 0,
        height: 'calc(100vh - 56px)',
        bgcolor: bookContentStep === 0 ? 'black' : 'inherit',

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
            {bookInfoData.title}
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
        <BookCover
          bookSummaryData={bookInfoData}
          handleChangeStep={handleChangeStep}
          handleClickLastReadBook={handleClickLastReadBook}
        />
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
          bookCoverImage={bookInfoData.image}
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

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['bookInfo', bookId],
    queryFn: () => getBookInfo(Number(bookId)),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      bookId: bookId,
      limit: limit ?? null,
      offset: offset ?? null,
    },
  };
};

export default BookPage;
