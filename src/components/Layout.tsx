import { ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import Appbar from './Appbar';
import SideMenu from './SideMenu';

interface LayoutProps {
  children: ReactNode;
  onClick: (content: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onClick }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenu = (isOpen: boolean) => {
    setSideMenuOpen(isOpen);
  };

  return (
    <Box>
      <Appbar handleSideMenu={handleSideMenu} />

      <SideMenu open={sideMenuOpen} handleSideMenu={handleSideMenu}
      onClick={onClick} />

      <Box component="main" sx={{ mx: 'auto', p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
