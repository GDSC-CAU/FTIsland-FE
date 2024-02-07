import { Box } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import Explore from './Explore'
import Recent from './Recent'
import MyWord from './MyWord'
interface MenuProps {
    handleClick: (newContent: ReactElement) => void;
  }

  const Menu: React.FC<MenuProps> = ({ handleClick }) => {
    const [selectedBox, setSelectedBox] = useState<string>('explore');
  
    const handleBoxClick = (newContent: ReactElement, boxName: string) => {
      handleClick(newContent);
      setSelectedBox(boxName);
    };
  
    return (
      <Box sx={{ display: 'flex', width: "100%", height: 100 }}>
        <MenuBox 
          selected={selectedBox === 'explore'}
          onClick={() => handleBoxClick(<Explore/>, 'explore')}
        >
          동화의 섬 탐험하기
        </MenuBox>
        <MenuBox 
          selected={selectedBox === 'recent'}
          onClick={() => handleBoxClick(<Recent/>, 'recent')}
        >
          최근 탐험한 이야기
        </MenuBox>
        <MenuBox 
          selected={selectedBox === 'myWord'}
          onClick={() => handleBoxClick(<MyWord/>, 'myWord')}
        >
          나의 단어
        </MenuBox>
      </Box>
    );
  };
  
export default Menu;


interface MenuBoxProps {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
}
  
const MenuBox: React.FC<MenuBoxProps> = ({ selected, onClick, children }) => {
    return (
      <Box 
        sx={{ 
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
          fontSize: '2vw'
        }} 
        onClick={onClick}
      >
        {children}
      </Box>
    );
};
  