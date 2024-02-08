import { Box, Button, ButtonGroup } from '@mui/material'
import React, { ReactElement, useState } from 'react'
interface MenuProps {
    handleClick: (newContent: ReactElement) => void;
  }

const Islands: React.FC<MenuProps> = ({handleClick}) => {
    const [value, setValue] = useState(0);
    const labels = ['희망의 섬', '행복의 섬', '기쁨의 섬', '용기의 섬']

    const handleChange = (newValue: number) => {
        setValue(newValue);

        if(newValue === 0)handleClick(<></>);
        else if(newValue === 1)handleClick(<></>);
        else if(newValue === 2)handleClick(<></>);
    }
    return (
    <Box sx={{ 
        width: "20%", height: 630, 
        display: 'flex', flexDirection: 'column',
        alignItems: 'center' }}>
            <ButtonGroup sx={{width: "85%"}}orientation="vertical">
            {labels.map((label, index) => (
                <Button 
                key={index}
                style={{ ...buttonStyle(value===index), marginTop: 15 }}
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
    fontSize: '1.8vw',
    borderRadius: '18px',
    boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.25)',
    margin: '5px',
    padding: '18px',
});