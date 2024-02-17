import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const SwitchButton = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(48px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#FF8383' : '#FF8383',
      },
    },
    ':after': {
      content: '"보조언어"',
      fontSize: '12px',
      marginLeft: '6px',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 20,
    height: 20,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#39A7FF' : '#39A7FF',
    boxSizing: 'border-box',
    ':before': {
      content: '"주언어"',
      fontSize: '12px',
      lineHeight: '24px',
      display: 'flex',
      // justifyContent: 'flex-end',
      // marginRight: '8px',
    },
  },
}));

export default SwitchButton;
