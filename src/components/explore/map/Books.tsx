import { Box, CardMedia, Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/CloseRounded';
import React, { Fragment, ReactElement, forwardRef, useCallback, useEffect, useState } from 'react';
import { getBookDetail, getIslandInfo } from 'src/apis/island';
import StoryCard, { StoryDataType } from 'src/components/card/StoryCard';
import { useUser } from 'src/hook/useUser';
import Progress from './Progress';
interface BoxPosition {
  top: string;
  left: string;
}
interface Book{
  bookId: number;
  title: string;
  description: string;
  progress: number;
  image: string;
}

const Books = ({ island }: { island: string }) => {
  const { user, userId } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const userIslandName = user.nickName ? `${user.nickName}의 섬` : '지혜의 섬';
  const realIslandName = useCallback(() => {
    if(user.nickName) return "지혜";
    else return island.replace('의 섬', '');
  }, [user.nickName, island]);

  const islandBoxPositions: Record<string, BoxPosition[]> = {
    [userIslandName]: [
      { top: '50%', left: '30%' },
      { top: '70%', left: '37%' },
      { top: '55%', left: '55%' },
      { top: '30%', left: '65%' },
    ],
    '기쁨의 섬': [
      { top: '40%', left: '25%' },
      { top: '70%', left: '35%' },
      { top: '55%', left: '55%' },
      { top: '30%', left: '65%' },
    ],
    '행복의 섬': [
      { top: '50%', left: '25%' },
      { top: '70%', left: '35%' },
      { top: '55%', left: '55%' },
      { top: '60%', left: '75%' },
    ],
    '용기의 섬': [
      { top: '30%', left: '45%' },
      { top: '65%', left: '35%' },
      { top: '75%', left: '55%' },
      { top: '65%', left: '65%' },
    ],
    '희망의 섬': [
      { top: '50%', left: '30%' },
      { top: '30%', left: '40%' },
      { top: '55%', left: '55%' },
      { top: '30%', left: '65%' },
    ],
    '미지의 섬': [
      { top: '80%', left: '37%' },
      { top: '35%', left: '33%' },
      { top: '55%', left: '55%' },
      { top: '70%', left: '67%' },
    ],
  };
  const boxPositions = islandBoxPositions[island];
  const [isOpenFocusStory, setIsOpenFocusStory] = useState(false);
  const [focusBook, setFocusBook] = useState<StoryDataType | null>(null);
  const handleBookDetail = async (id:number) => {
    try{
      const response = await getBookDetail(id);
      if (response){
        setFocusBook({
          bookId: id,
          title: response.title,
          description: response.description,
          images: response.image,
        });
        setIsOpenFocusStory(true);
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    const fetchBookInfo = async () => {
      try{
        const response = await getIslandInfo(realIslandName(), userId);
        if(response){
          setBooks(response.data);
        }        
      }catch(error){
        console.error(error);
      }
    };

    fetchBookInfo();
  }, [realIslandName, userId, user.nickName]);

  return (
    <>
      {boxPositions?.map((boxPosition, index) => (
        <Fragment key={index}>

        {books[index]?.image &&
        <Box sx={{ position: 'absolute', top: boxPosition.top, left: boxPosition.left, transform: 'translate(-50%, -1500%)', width: '100px', height: '10px', bgcolor:'white', borderRadius:'20px', display: 'flex', alignItems:'center'}}>
          <Progress value={books[index].progress}/>
        </Box>
        }

        <CardMedia
        component="img"
        image={books[index]?.image || "/image/bookLock.webp"}
        title="mark"
        onClick={()=>handleBookDetail(books[index]?.bookId)}
        sx={{
          width: {xs:'70px', sm:'100px'},
          height: {xs:'70px', sm:'100px'},
          borderRadius: '10px',
          border: '4px solid white',
          boxShadow: '10px 10px 5px 2px rgba(0, 0, 0, 0.25)',
          position: 'absolute',
          top: boxPosition.top,
          left: boxPosition.left,
          transform: 'translate(-50%, -130%)',
        }}/>
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
        }}/>
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
  >  <IconButton
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
</Dialog>);