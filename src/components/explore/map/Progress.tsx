import { Box } from '@mui/material';
import React from 'react'

const Progress = ({value}:{value:number}) => {
  return (
    <Box sx={{width: `${value*100}%`, maxWidth: '92%', height: '5px', bgcolor: 'red', marginLeft: '4px', borderRadius:'20px'}}/>
  )
}
export default Progress;