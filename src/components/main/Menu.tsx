import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import Explore from './Explore'
import Recent from './Recent'
import MyWord from './MyWord'
interface MenuProps {
    handleClick: (newContent: ReactElement) => void;
    tabIndex: number;
  }

  const Menu: React.FC<MenuProps> = ({ handleClick, tabIndex }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleChange = (event:React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        if(newValue === 0)handleClick(<Explore/>);
        else if(newValue === 1)handleClick(<Recent/>);
        else if(newValue === 2)handleClick(<MyWord/>);
    }
    useEffect(()=>{
      setValue(tabIndex);
    }, [tabIndex])
  
    return (
      <Box sx={{ width: "100%", height: 100,  borderColor: 'divider' }}>
        
        <Tabs value={value} onChange={handleChange}variant="fullWidth">
            <Tab sx={tabStyle(value === 0)} label = {matches ? "동화의 섬 탐험하기" : "동화의 섬"}/>
            <Tab sx={tabStyle(value === 1)} label = {matches ? "최근 탐험한 이야기" : "최근 이야기"}/>
            <Tab sx={tabStyle(value === 2)} label = {matches ? "나의 단어" : "단어장"}/>
        </Tabs>

      </Box>
    );
  };
  
export default Menu;

const tabStyle = (selected: boolean) => ({
    flex: 1,
    height: 100,
    bgcolor: 'white',
    color: selected ? '#FF4A4A !important' : 'grey !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: { xs: '1.7rem', sm: '2rem' },
  });
  