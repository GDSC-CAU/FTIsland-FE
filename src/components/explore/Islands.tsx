import { Box, Button, ButtonGroup, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
interface MenuProps {
    setSelectedIsland: (island: string) => void;
  }

const Islands: React.FC<MenuProps> = ({setSelectedIsland}) => {
    const [value, setValue] = useState(0);
    const labels = ['희망의 섬', '기쁨의 섬', '행복의 섬', '용기의 섬', '절망의 섬', '미지의 섬',]

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleChange = (newValue: number) => {
        setValue(newValue);
        setSelectedIsland(labels[newValue]);
        // if(newValue === 0)handleClick(<></>);
        // else if(newValue === 1)handleClick(<></>);
        // else if(newValue === 2)handleClick(<></>);
    }
    return (
        <Box sx={{ 
            width: { xs: '100%', sm: '20%' },
            height: { xs: 100, sm: 630 },
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignItems: 'center',
            overflowX: 'auto',
            overflowY: 'auto',
        }}>
            <ButtonGroup sx={{width: { xs: '100%', sm: '85%' }}}orientation={matches ? "vertical" : "horizontal"}>
            {labels.map((label, index) => (
                <Button 
                key={index}
                style={{ ...buttonStyle(value===index), 
                fontSize: matches ? '1.3rem' : '1.5rem',
                marginTop: 15 }}
                onClick={()=>handleChange(index)}
                >
                    {label}
                </Button>
            ))}
        </ButtonGroup>
    </Box>
  )
}

export default Islands

const buttonStyle = (selected: boolean) => ({
    flex: 1,
    minWidth: '100px',
    maxHeight: '80px',
    width: '100%',
    height: 100,
    
    backgroundColor: selected ? '#FF8D8D' : 'white',
    color: selected ? 'white' : '#FF8D8D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    borderRadius: '18px',
    boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.25)',
    margin: '5px',
    padding: '18px',
});
