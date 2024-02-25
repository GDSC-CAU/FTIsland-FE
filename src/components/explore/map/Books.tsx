import React, { Fragment, ReactElement, forwardRef, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, CardMedia, Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useQuery } from '@tanstack/react-query';

import { getBookProgress } from 'src/apis/book';
import { getBookDetail, getIslandInfo } from 'src/apis/island';
import Loading from 'src/components/Loading';
import StoryCard, { StoryDataType } from 'src/components/card/StoryCard';
import { useUser } from 'src/hook/useUser';

import Progress from './Progress';

interface BoxPosition {
  top: string;
  left: string;
}
interface Book {
  bookId: number;
  title: string;
  description: string;
  progress: number;
  image: string;
  totalPage: number;
}

type ProgressData = {
  userId: number;
  bookId: number;
  offset: number;
  limitNum: number;
  lastPage: number;
};

const Books = ({ islandNum, island }: { islandNum: number; island: string }) => {
  const { t } = useTranslation('common');
  const { user, userId, userRole } = useUser();
  const userIslandName = user.nickName
    ? t('main.userIsland', { name: user.nickName })
    : t('main.island0');
  const realIslandName = islandNum + 1;

  const islandBoxPositions = (islandName: string): BoxPosition[] => {
    switch (islandName) {
      case userIslandName:
        return [
          { top: '50%', left: '30%' },
          { top: '70%', left: '37%' },
          { top: '55%', left: '55%' },
          { top: '30%', left: '65%' },
        ];
      case t('main.island1'):
        return [
          { top: '40%', left: '25%' },
          { top: '70%', left: '35%' },
          { top: '55%', left: '55%' },
          { top: '30%', left: '65%' },
        ];
      case t('main.island2'):
        return [
          { top: '50%', left: '25%' },
          { top: '70%', left: '35%' },
          { top: '55%', left: '55%' },
          { top: '60%', left: '75%' },
        ];
      case t('main.island3'):
        return [
          { top: '30%', left: '45%' },
          { top: '65%', left: '35%' },
          { top: '75%', left: '55%' },
          { top: '65%', left: '65%' },
        ];
      case t('main.island4'):
        return [
          { top: '50%', left: '30%' },
          { top: '30%', left: '40%' },
          { top: '55%', left: '55%' },
          { top: '30%', left: '65%' },
        ];
      case t('main.island5'):
        return [
          { top: '80%', left: '37%' },
          { top: '35%', left: '33%' },
          { top: '55%', left: '55%' },
          { top: '70%', left: '67%' },
        ];
      default:
        return [
          { top: '50%', left: '30%' },
          { top: '70%', left: '37%' },
          { top: '55%', left: '55%' },
          { top: '30%', left: '65%' },
        ];
    }
  };
  const boxPositions = islandBoxPositions(island) || islandBoxPositions(userIslandName);

  const [progresses, setProgresses] = useState<{ bookId: number; progress: number }[]>([]);
  const [isOpenFocusStory, setIsOpenFocusStory] = useState(false);
  const [focusBook, setFocusBook] = useState<StoryDataType | null>(null);

  const handleBookDetail = async (id: number) => {
    try {
      const response = await getBookDetail(id);

      if (response) {
        setFocusBook({
          bookId: id,
          title: response.title,
          description: response.description,
          image: response.image,
        });
        setIsOpenFocusStory(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: books, isLoading } = useQuery({
    queryKey: ['books', realIslandName, userId],
    queryFn: async () => await getIslandInfo(realIslandName, userId),
    staleTime: 1000 * 60 * 60,
  });

  const { data: progressData } = useQuery({
    queryKey: ['progressData', realIslandName, userId],
    queryFn: async () => await getBookProgress(realIslandName, userId),
    enabled: userRole === 'USER',
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const fetchProgresses = async () => {
      try {
        const bookProgresses = progressData.map((progress: ProgressData) => {
          const book = books.find((book: Book) => book.bookId === progress.bookId);
          const totalPage = book ? book.totalPage : 1;
          const calculatedProgress = progress
            ? ((progress.offset + 1) * progress.limitNum * 100) / totalPage
            : 0;
          return { bookId: book.bookId, progress: calculatedProgress };
        });

        setProgresses(bookProgresses);
      } catch (error) {
        console.error(error);
      }
    };

    if (progressData) fetchProgresses();
  }, [userId, books, progressData]);

  if (books === undefined || isLoading) return <Loading />;

  return (
    <>
      {boxPositions?.map((boxPosition, index) => (
        <Fragment key={index}>
          {books[index]?.image && userRole === 'USER' && (
            <Box
              sx={{
                position: 'absolute',
                top: boxPosition.top,
                left: boxPosition.left,
                transform: 'translate(-50%, -1500%)',
                width: '100px',
                height: '10px',
                bgcolor: 'white',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Progress
                value={progresses.find((item) => item.bookId === index + 1)?.progress || 0}
              />
            </Box>
          )}

          <CardMedia
            component="img"
            image={books[index]?.image || '/image/bookLock.webp'}
            title="mark"
            onClick={() => handleBookDetail(books[index]?.bookId)}
            sx={{
              width: { xs: '70px', sm: '100px' },
              height: { xs: '70px', sm: '100px' },
              borderRadius: '10px',
              border: '4px solid white',
              boxShadow: '10px 10px 5px 2px rgba(0, 0, 0, 0.25)',
              position: 'absolute',
              top: boxPosition.top,
              left: boxPosition.left,
              transform: 'translate(-50%, -130%)',
              zIndex: 2,
            }}
          />
          <CardMedia
            component="img"
            image="/image/mark-location.png"
            title="mark"
            sx={{
              width: '30px',
              height: '30px',
              position: 'absolute',
              top: boxPosition.top,
              left: boxPosition.left,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Fragment>
      ))}
      {isOpenFocusStory && focusBook ? (
        <StoryCardPopup
          focusStoryData={focusBook}
          open={isOpenFocusStory}
          onClose={() => setIsOpenFocusStory(false)}
        />
      ) : null}
    </>
  );
};

export default Books;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StoryCardPopup = ({
  focusStoryData,
  open,
  onClose,
}: {
  focusStoryData: StoryDataType;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    PaperProps={{
      sx: {
        position: 'relative',
        borderRadius: '20px',
        width: { xs: '360px', sm: '500px' },
      },
    }}
  >
    <IconButton
      onClick={() => onClose()}
      sx={{
        position: 'absolute',
        top: '8px',
        right: '8px',
      }}
    >
      <CloseIcon
        sx={{
          backgroundColor: 'grey',
          borderRadius: '20px',
          color: 'white',
          width: { xs: '24px', sm: '40px' },
          height: { xs: '24px', sm: '40px' },
        }}
      />
    </IconButton>
    <StoryCard isClickable={false} bookData={focusStoryData} />
  </Dialog>
);
