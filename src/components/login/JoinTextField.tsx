import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface JoinProps {
  title: string,
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinTextField: React.FC<JoinProps> = ({title, handleChange}) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const helperText = () => {
    if(title==="아이디"){
      return "영문 소문자/숫자로 이루어진 4~16자"
    }else if(title === "비밀번호"){
      return "영문 대/소문자, 숫자, 특수 문자로 이루어진 8~16자";
    }
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 900, marginBottom: '5px' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px', height: '100%' }}>
        <TextField
          id="outlined-basic"
          placeholder={title}
          variant="outlined"
          helperText={helperText()}
          type={(title !=='비밀번호' || showPassword) ? 'text' : 'password'}
          onChange={handleChange}
          sx={textFieldStyle()}
          InputProps={{
            endAdornment: (
              title === '비밀번호' &&
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          />
      </Box>
    </Box>
  )
}

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
})