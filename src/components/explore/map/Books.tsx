import { CardMedia } from '@mui/material';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { getIslandInfo } from 'src/apis/island';
import { useUser } from 'src/hook/useUser';
interface BoxPosition {
  top: string;
  left: string;
}
interface Book{
  bookId: number,
  title: string,
  process: number,
  image: string,
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

  useEffect(()=>{
    const fetchBookInfo = async () => {
      try{
        const response = await getIslandInfo(realIslandName(), userId);
        console.log(response);
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
        <CardMedia
        component="img"
        image={books[index]?.image || "/image/coverImg2.jpg"}
        title="mark"
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
    </>
  );
};

export default Books;
