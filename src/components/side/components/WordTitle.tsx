import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addVoca, deleteVoca, isVocaStarred } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';

const WordTitle = ({ content }: { content: string }) => {
  const {userRole, setWordEnter, userId, vocaId} = useUser();
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = async () => {
    if(userRole === "GUEST"){
      setWordEnter(true);
    }else{
      if (bookmark) {
        setBookmark(false);
        await deleteVoca(userId, vocaId);
      } else {
        setBookmark(true);
        await addVoca(userId, vocaId);
      }
    }
  };

  useEffect(()=>{
    const fetchStar = async () => {
      const isStarred = await isVocaStarred(userId, vocaId);
      if(isStarred){
        setBookmark(true);
      }
    };
    fetchStar();
  })

  return (
    <Box
      sx={{ bgcolor: 'white', padding: 1.2, boxShadow: 2, display: 'flex', alignItems: 'center' }}
    >
      <Typography variant="h4" sx={listStyle()}>
        {content}
      </Typography>
      <Avatar
        src={bookmark ? '/image/star-fill.png' : '/image/star-empty.png'}
        alt="arrow right"
        sx={{ width: '10%', height: '', marginLeft: '10px' }}
        onClick={handleBookmark}
      />
    </Box>
  );
};

export default WordTitle;

const listStyle = () => ({
  fontWeight: 'bold',
  paddingLeft: 1,
});
