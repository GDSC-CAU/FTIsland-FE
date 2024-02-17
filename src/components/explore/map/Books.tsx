import { CardMedia } from '@mui/material';
import React, { Fragment } from 'react';
interface BoxPosition {
  top: string;
  left: string;
}

const islandBoxPositions: Record<string, BoxPosition[]> = {
  '희망의 섬': [
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
  '절망의 섬': [
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

const Books = ({ island }: { island: string }) => {
  const boxPositions = islandBoxPositions[island];
  return (
    <>
      {boxPositions?.map((boxPosition, index) => (
        <Fragment key={index}>
        <CardMedia
        component="img"
        image="/image/coverImg2.jpg"
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
