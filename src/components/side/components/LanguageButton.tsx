import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

interface LanguageButtonProps {
  language: string;
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ language, handleLanguageChange }) => {
  const handleClick = (event: SelectChangeEvent<string>) => {
    event.stopPropagation();
    handleLanguageChange(event);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3, paddingBottom: 20 }}>
      <Select
        defaultValue={language}
        sx={selectBoxStyle}
        onChange={handleClick}
        MenuProps={{
          PaperProps: {
            style: {
              borderRadius: 20,
              marginTop: 5,
            },
          },
        }}
        IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: '#FF8383' }} />}
      >
        <MenuItem value={'한국어'} sx={itemBoxStyle}>
          한국어
        </MenuItem>
        <MenuItem value={'English'} sx={itemBoxStyle}>
          English
        </MenuItem>
        <MenuItem value={'中文'} sx={itemBoxStyle}>
          中文
        </MenuItem>
        <MenuItem value={'日本語'} sx={itemBoxStyle}>
          日本語
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageButton;

const selectBoxStyle = () => ({
  width: 200,
  height: 50,

  paddingLeft: 0.5,
  fontSize: 16,
  fontWeight: 'bold',

  bgcolor: 'white',
  borderRadius: 5,
  border: 'none',

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF8383',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF8383',
  },
});

const itemBoxStyle = () => ({
  borderRadius: 2,
  padding: 1,
  paddingLeft: 2,
  fontSize: 16,
  fontWeight: 'bold',

  '&.Mui-selected': {
    backgroundColor: '#FF8383',
    color: 'white',
  },
  '&:hover': {
    backgroundColor: '#FFE5E5',
  },
});
