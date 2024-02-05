import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer, Typography } from '@mui/material';

const SideMenu = ({
  open,
  handleSideMenu,
}: {
  open: boolean;
  handleSideMenu: (isOpen: boolean) => void;
}) => {
  const { asPath } = useRouter();

  useEffect(() => {
    handleSideMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => {
        handleSideMenu(false);
      }}
      PaperProps={{
        sx: {
          width: 300,
          padding: 2,
        },
      }}
    >
      <Box component="nav">
        <Typography variant="h4">여기가 사이드 메뉴입니다.</Typography>
      </Box>
    </Drawer>
  );
};
export default SideMenu;
