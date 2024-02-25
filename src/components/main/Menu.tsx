import React, { ReactNode, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Tab, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getRecentBookListInfo } from 'src/apis/book';
import { getVocaList } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';

import Explore from './Explore';
import Recent from './Recent';
import MyWord from './MyWord';

interface MenuProps {
  tabIndex: number;
  handleOpenEnterModal: () => void;
}

const TabPanel = ({
  value,
  index,
  children,
}: {
  children?: ReactNode;
  index: number;
  value: number;
}) => (
  <div role="tabpanel" hidden={value !== index} style={{ height: '100%' }}>
    {value === index && <Box>{children}</Box>}
  </div>
);

const Menu = ({ tabIndex, handleOpenEnterModal }: MenuProps) => {
  const { userRole, userId } = useUser();
  const [value, setValue] = useState(0);
  const { t } = useTranslation('common');

  const { data: recentBookListData } = useQuery({
    queryKey: ['recent-books', userId],
    queryFn: async () => await getRecentBookListInfo(userId),
    enabled: userRole === 'USER',
    initialData: [],
  });

  const { data: vocaListData, isLoading: isVocaListLoading } = useQuery({
    queryKey: ['vocaList', userId],
    queryFn: async () => await getVocaList(userId),
    enabled: userRole === 'USER',
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    setValue(tabIndex);
  }, [tabIndex]);

  const tabList = [
    {
      label: t('main.explore'),
      content: <Explore />,
    },
    {
      label: t('main.recent'),
      content: <Recent recentBookListData={recentBookListData} />,
    },
    {
      label: t('main.words'),
      content: <MyWord vocaListData={vocaListData} isLoading={isVocaListLoading} />,
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 100, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={(_, value) => {
          if (userRole === 'USER') setValue(value);
          else handleOpenEnterModal();
        }}
        variant="fullWidth"
      >
        {tabList.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              flex: 1,
              height: 100,
              bgcolor: 'white',
              color: value === index ? '#FF4A4A !important' : 'grey !important',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: { xs: '1.4rem', sm: '2rem' },
              textTransform: 'none',
              whiteSpace: 'nowrap',
            }}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 200px)',
          bgcolor: '#E0F4FF',
          borderRadius: '20px',
          mt: 2,
        }}
      >
        {tabList.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default Menu;
