import React, { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { addVoca, deleteVoca, isVocaStarred } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';

const WordTitle = ({ content }: { content: string }) => {
  const { userRole, setWordEnter, userId, vocaId } = useUser();
  const queryClient = useQueryClient();

  const [bookMarkLoading, setBookMarkLoading] = useState(false);

  const handleBookmark = async () => {
    if (userRole === 'GUEST') {
      setWordEnter(true);
    } else {
      setBookMarkLoading(true);
      if (bookMark) {
        await deleteVoca(userId, vocaId).then(async () => {
          await queryClient.invalidateQueries({
            queryKey: ['bookMark'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['vocaList'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['vocaDetailData'],
          });
        });
      } else {
        await addVoca(userId, vocaId).then(async () => {
          await queryClient.invalidateQueries({
            queryKey: ['bookMark'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['vocaList'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['vocaDetailData'],
          });
        });
      }
    }
  };

  const { data: bookMark } = useQuery({
    queryKey: ['bookMark', userId, vocaId],
    queryFn: async () =>
      await isVocaStarred(userId, vocaId).then((res) => {
        setBookMarkLoading(false);
        return res;
      }),
    enabled: userRole === 'USER',
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (bookMark === undefined) setBookMarkLoading(true);
    else setBookMarkLoading(false);
  }, [bookMark]);

  return (
    <Box
      sx={{ bgcolor: 'white', padding: 1.2, boxShadow: 2, display: 'flex', alignItems: 'center' }}
    >
      <Typography variant="h4" sx={listStyle()}>
        {content}
      </Typography>

      {bookMarkLoading ? (
        <CircularProgress sx={{ ml: 2, width: '24px !important', height: '24px !important' }} />
      ) : (
        <Avatar
          src={bookMark ? '/image/star-fill.png' : '/image/star-empty.png'}
          alt="arrow right"
          sx={{ width: '10%', height: '', marginLeft: '10px' }}
          onClick={handleBookmark}
        />
      )}
    </Box>
  );
};

export default WordTitle;

const listStyle = () => ({
  fontWeight: 'bold',
  paddingLeft: 1,
});
