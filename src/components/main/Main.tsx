import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Explore from './Explore';
import Menu from './Menu';
import Recent from './Recent';
import MyWord from './MyWord';

const Main = ({tabIndex} : {tabIndex : number}) => {
    const [content, setContent] = useState<ReactElement>(<Explore/>);

  const handleClick = (newContent: ReactElement) => {
    setContent(newContent);
  };

  useEffect(()=>{
    if(tabIndex === 0)handleClick(<Explore/>);
    else if(tabIndex === 1)handleClick(<Recent/>);
    else if(tabIndex === 2)handleClick(<MyWord/>);
  }, [tabIndex])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
      <Menu handleClick={handleClick} tabIndex={tabIndex}/>
      <Box sx={{ width: '100%', height: '100%', bgcolor: '#E0F4FF', borderRadius: '24px' }}>
        {content}
      </Box>
    </Box>
  );
};

export default Main;
