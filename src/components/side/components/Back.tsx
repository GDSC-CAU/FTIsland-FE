import { Avatar, Box } from '@mui/material'
import React from 'react'

const Back = ({handleBack} : {handleBack: ()=> void}) => {
  return (
    <Box sx={{bgcolor: "#FF8383", padding: 2.5, boxShadow: 2}}>
      <Avatar
        src="/arrow-back-white.png"
        alt="arrow right" 
        sx={{ width: '6%', height: 'auto' }}
        onClick={handleBack}/>
    </Box>
  )
}

export default Back