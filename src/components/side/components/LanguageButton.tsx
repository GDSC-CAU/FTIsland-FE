import React from 'react';
import { useRouter } from 'next/router';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useQueryClient } from '@tanstack/react-query';

import { useUser } from 'src/hook/useUser';

interface LanguageButtonProps {
  sort: 'main' | 'sub';
  handleLanguageChange: (event: SelectChangeEvent<string>) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ sort, handleLanguageChange }) => {
  const { user } = useUser();
  const { route } = useRouter();
  const queryClient = useQueryClient();

  const handleClick = async (event: SelectChangeEvent<string>) => {
    event.stopPropagation();
    await handleLanguageChange(event);

    // 만약 동화페이지라면 동화 언어정보 다시 요청
    if (route === '/book/[bookId]') {
      await queryClient.invalidateQueries({
        queryKey: ['bookContentData'],
      });
    }
  };

  const getLanguage = () => {
    if (sort === 'main') return user.mainLanguage;
    else return user.subLanguage;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3, paddingBottom: 20 }}>
      <Select
        defaultValue={getLanguage()}
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
