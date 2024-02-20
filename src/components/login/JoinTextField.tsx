import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

interface JoinProps {
  title: string,
  handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const JoinTextField: React.FC<JoinProps> = ({title, handleChange}) => {
  return (
    <Box sx={{display: 'flex', textAlign:'center', alignItems: 'center'}}>
      <Typography variant="h5" sx={{ width: '100px', fontWeight: 900, marginBottom: '5px'}}>
        {title}
      </Typography>
      <TextField id="outlined-basic" label="비밀번호" variant="outlined" onChange={handleChange} sx={textFieldStyle()}/>
    </Box>
  )
}

export default JoinTextField;

const textFieldStyle = () => ({
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