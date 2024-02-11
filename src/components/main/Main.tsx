import React, { ReactElement, useState } from 'react';
import { Box } from '@mui/material';

import Explore from './Explore';
import Menu from './Menu';

const Main = () => {
  const [content, setContent] = useState<ReactElement>(<Explore />);

  const handleClick = (newContent: ReactElement) => {
    setContent(newContent);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
      <Menu handleClick={handleClick} />

      <Box sx={{ width: '100%', height: '100%', bgcolor: '#E0F4FF', borderRadius: '24px' }}>
        {content}
      </Box>
    </Box>
  );
};

export default Main;
