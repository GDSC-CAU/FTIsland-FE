import { CardMedia } from '@mui/material'
import React from 'react'
interface BoxPosition {
    top: string;
    left: string;
  }

const islandBoxPositions: Record<string, BoxPosition[]> = {
    "희망의 섬": [
      { top: '50%', left: '30%'},
      { top: '70%', left: '37%'},
      { top: '55%', left: '55%'},
      { top: '30%', left: '65%'},
    ],
    "기쁨의 섬": [
      { top: '40%', left: '25%'},
      { top: '70%', left: '35%'},
      { top: '55%', left: '55%'},
      { top: '30%', left: '65%'},
    ],
    "행복의 섬": [
      { top: '50%', left: '25%'},
      { top: '70%', left: '35%'},
      { top: '55%', left: '55%'},
      { top: '60%', left: '75%'},
    ],
    "용기의 섬": [
      { top: '30%', left: '45%'},
      { top: '65%', left: '35%'},
      { top: '75%', left: '55%'},
      { top: '65%', left: '65%'},
    ],
    "절망의 섬": [
      { top: '50%', left: '30%'},
      { top: '30%', left: '40%'},
      { top: '55%', left: '55%'},
      { top: '30%', left: '65%'},
    ],
    "미지의 섬": [
      { top: '80%', left: '37%'},
      { top: '35%', left: '32%'},
      { top: '55%', left: '55%'},
      { top: '70%', left: '70%'},
    ],
  };

const Books = ({island} : {island: string}) => {
    const boxPositions = islandBoxPositions[island];
  return (
    <>
      {boxPositions?.map((boxPosition, index) => (
        <CardMedia
        key={index}
        component="img"
        image="/image/mark-location.png"
        title="mark"
        sx={{
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: boxPosition.top,
          left: boxPosition.left,
          transform: 'translate(-50%, -50%)',
        }}/> 
      ))}
    </>
  )
}

export default Books;