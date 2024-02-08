import { Box, Tab, Tabs } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import Explore from './Explore'
import Recent from './Recent'
import MyWord from './MyWord'
interface MenuProps {
    handleClick: (newContent: ReactElement) => void;
  }

  const Menu: React.FC<MenuProps> = ({ handleClick }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event:React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        if(newValue === 0)handleClick(<Explore/>);
        else if(newValue === 1)handleClick(<Recent/>);
        else if(newValue === 2)handleClick(<MyWord/>);
    }
  
    return (
      <Box sx={{ width: "100%", height: 100,  borderColor: 'divider' }}>
        
        <Tabs value={value} onChange={handleChange}variant="fullWidth">
            <Tab style={tabStyle(value === 0)} label = "동화의 섬 탐험하기"/>
            <Tab style={tabStyle(value === 1)} label = "최근 탐험한 이야기"/>
            <Tab style={tabStyle(value === 2)} label = "나의 단어"/>
        </Tabs>

      </Box>
    );
  };
  
export default Menu;

const tabStyle = (selected: boolean) => ({
    flex: 1,
    height: 100,
    bgcolor: 'white',
    color: selected ? '#FF4A4A' : 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '2vw',
  });
  