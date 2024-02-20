import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getRecentBookListInfo } from 'src/apis/book';
import { getVocaList } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';

import Explore from './Explore';
import Recent from './Recent';
import MyWord from './MyWord';

interface MenuProps {
  handleClick: (newContent: ReactElement) => void;
  tabIndex: number;
  handleOpenEnterModal: () => void;
}

const Menu: React.FC<MenuProps> = ({ handleClick, tabIndex, handleOpenEnterModal }) => {
  const { userRole, userId } = useUser();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { data: recentBookListData } = useQuery({
    queryKey: ['recent-books', userId],
    queryFn: async () => await getRecentBookListInfo(userId),
    enabled: userRole === 'USER',
    initialData: [],
  });

  const { data: vocaListData } = useQuery({
    queryKey: ['vocaList', userId],
    queryFn: async () => await getVocaList(userId),
    enabled: userRole === 'USER',
    initialData: [],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (userRole === 'USER') {
      setValue(newValue);

      if (newValue === 0) handleClick(<Explore />);
      else if (newValue === 1) handleClick(<Recent recentBookListData={recentBookListData} />);
      else if (newValue === 2) handleClick(<MyWord vocaListData={vocaListData} />);
    } else {
      handleOpenEnterModal();
    }
  };

  useEffect(() => {
    setValue(tabIndex);
  }, [tabIndex]);

  return (
    <Box sx={{ width: '100%', height: 100, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab sx={tabStyle(value === 0)} label={matches ? '동화의 섬 탐험하기' : '동화의 섬'} />
        <Tab sx={tabStyle(value === 1)} label={matches ? '최근 탐험한 이야기' : '최근 이야기'} />
        <Tab sx={tabStyle(value === 2)} label={matches ? '나의 단어' : '단어장'} />
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
