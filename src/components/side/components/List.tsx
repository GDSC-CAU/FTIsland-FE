import { Box, Typography } from '@mui/material';
import React from 'react';

const List = ({ content }: { content: string }) => {
  return (
    <Box sx={{ bgcolor: 'white', padding: 1.2, boxShadow: 2 }}>
      <Typography variant="h4" sx={listStyle()}>
        {content}
      </Typography>
    </Box>
  );
};

export default List;

const listStyle = () => ({
  fontWeight: 'bold',
  paddingLeft: 1,
});
