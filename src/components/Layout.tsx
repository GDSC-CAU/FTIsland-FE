import { ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import Appbar from './Appbar';
import SideMenu from './SideMenu';

const Layout = ({ children }: { children: ReactNode }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenu = (isOpen: boolean) => {
    setSideMenuOpen(isOpen);
  };

  return (
    <Box>
      <Appbar handleSideMenu={handleSideMenu} />

      <SideMenu open={sideMenuOpen} handleSideMenu={handleSideMenu} />

      <Box component="main" sx={{ mx: 'auto', p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
