import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

interface JoinProps {
  type: 'id' | 'password' | 'nickname';
  title: string;
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinTextField: React.FC<JoinProps> = ({ type, title, handleChange }) => {
  const { t } = useTranslation('common');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const helperText = () => {
    if (type === 'id') {
      return t('signUpPopup.idHelperText');
    } else if (type === 'password') {
      return t('signUpPopup.passwordHelperText');
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'flex-start' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100px',
          height: '100%',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900, marginBottom: '5px' }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '300px',
          height: '100%',
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder={title}
          variant="outlined"
          helperText={helperText()}
          type={type !== 'password' || showPassword ? 'text' : 'password'}
          onChange={handleChange}
          sx={textFieldStyle()}
          InputProps={{
            endAdornment: type === 'password' && (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default JoinTextField;

const textFieldStyle = () => ({
  width: '300px',
  marginBottom: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FF8383',
    },
    '&:hover fieldset': {
      borderColor: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF4A4A',
    },
  },
});
