import { Box } from '@mui/material'
import React from 'react'

const Main = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", gap: 2 }}>
          <Box sx={{ width: "100%", height: 100, bgcolor: 'yellow' }}>
            menu
          </Box>
          <Box sx={{ width: "100%", height: 630, bgcolor: '#E0F4FF', borderRadius: 10 }}>
            main page
          </Box>
        </Box>
    );
}

export default Main