import { Box, Button, ButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { useUser } from 'src/hook/useUser';
interface MenuProps {
  setSelectedIsland: (island: string) => void;
  setIslandNum: (islandNum: number) => void;
}

const Islands: React.FC<MenuProps> = ({ setSelectedIsland, setIslandNum }) => {
  const { t } = useTranslation('common');
  const [value, setValue] = useState(0);
  const { user } = useUser();
  const labels = Array(6)
    .fill(0)
    .map((_, index) => t(`main.island${index}`));

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const islandName = (newValue: number) => {
    if (user.nickName !== '' && newValue === 0) {
      return t('main.island0');
    } else {
      return labels[newValue];
    }
  };
  const convertIslandName = (label: string) => {
    if (label === t('main.island0') && user.nickName !== '') {
      return `${user.nickName}의 섬`;
    } else {
      return label;
    }
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setSelectedIsland(islandName(newValue));
    setIslandNum(newValue);
  };
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 'auto' },
        height: { xs: 'auto', sm: 630 },
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      <ButtonGroup
        sx={{ width: { xs: '100%', sm: '85%' }, px: 1 }}
        orientation={matches ? 'vertical' : 'horizontal'}
      >
        {labels.map((label, index) => (
          <Button
            key={index}
            style={{
              ...buttonStyle(value === index),
              fontSize: matches ? '1.3rem' : '1.5rem',
              marginTop: 15,
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleChange(index)}
          >
            {convertIslandName(label)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Islands;

const buttonStyle = (selected: boolean) => ({
  flex: 1,
  minWidth: '120px',
  maxHeight: '80px',
  width: '100%',
  height: 100,

  backgroundColor: selected ? '#FF8D8D' : 'white',
  color: selected ? 'white' : '#FF8D8D',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: 'bold',
  borderRadius: '18px',
  boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.25)',
  margin: '5px',
  padding: '18px',
});
