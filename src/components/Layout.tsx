import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Toolbar } from '@mui/material';

import Appbar from './Appbar';
import SideMenu from './SideMenu';

interface LayoutProps {
  children: ReactNode;
  onClick?: (content: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onClick }) => {
  const { route } = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenu = (isOpen: boolean) => {
    setSideMenuOpen(isOpen);
  };

  const isBookPage = route === `/book/[bookId]`;

  return (
    <Box sx={{ minWidth: '320px' }}>
      <Appbar handleSideMenu={handleSideMenu} />

      <SideMenu open={sideMenuOpen} handleSideMenu={handleSideMenu} onClick={onClick} />

      <Toolbar variant="dense" />

      <Box component="main" sx={{ mx: 'auto', p: isBookPage ? 0 : 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
