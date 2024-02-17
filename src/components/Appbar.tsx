import { useRouter } from 'next/router';
import { AppBar, AppBarProps, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuRounded';

const Appbar = ({
  handleSideMenu,
  sx,
  ...rest
}: { handleSideMenu: (isOpen: boolean) => void } & AppBarProps) => {
  const { push } = useRouter();

  return (
    <AppBar
      sx={{
        color: 'inherit',
        boxShadow: 'none',
        height: '56px',
        zIndex: 1000,
        bgcolor: '#E0F4FF',

        ...sx,
      }}
      {...rest}
    >
      <Toolbar variant="dense" disableGutters>
        <Box
          onClick={() => {
            push('/');
          }}
          sx={{ display: 'flex', alignItems: 'center', px: 2, gap: 2, cursor: 'pointer' }}
        >
          <Box
            sx={{
              width: '36px',
              height: '36px',
              backgroundImage: 'url(/favicon.ico)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            FT Island
          </Typography>
        </Box>
        <IconButton
          aria-label="open drawer"
          onClick={() => {
            handleSideMenu(true);
          }}
          sx={{ ml: 'auto' }}
        >
          <MenuIcon sx={{ width: 40, height: 40, color: '#39A7FF' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
