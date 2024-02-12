import { Avatar, Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const WordTitle = ({content} : {content: string}) => {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    if(bookmark){
      setBookmark(false);
    }
    else{
      setBookmark(true);
    }
  }

  return (
    <Box sx={{bgcolor: "white", padding: 1.2, boxShadow: 2, display: 'flex', alignItems: 'center'}}>
        <Typography variant="h4" sx={listStyle()} >{content}</Typography>
        <Avatar
        src= {bookmark ? "/image/star-fill.png" : "/image/star-empty.png"}
        alt="arrow right" 
        sx={{ width: '10%', height: '',marginLeft: '10px', }}
        onClick={handleBookmark}/>
    </Box>
  )
}

export default WordTitle;

const listStyle = ()=>({
    fontFamily: 'sans-serif',
    fontWeight: "bold",
    paddingLeft: 1,
  });