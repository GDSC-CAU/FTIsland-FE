import { AppBar, AppBarProps, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuRounded';

const Appbar = ({
  handleSideMenu,
  sx,
  ...rest
}: { handleSideMenu: (isOpen: boolean) => void } & AppBarProps) => {
  return (
    <AppBar
      sx={{
        color: 'inherit',
        boxShadow: 'none',
        position: 'sticky',
        height: '56px',
        zIndex: 1000,
        bgcolor: '#E0F4FF',

        ...sx,
      }}
      {...rest}
    >
      <Toolbar variant="dense" disableGutters>
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
