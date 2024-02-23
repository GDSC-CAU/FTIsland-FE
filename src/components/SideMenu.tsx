import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer } from '@mui/material';
import Menu from './side/Menu';
import { useUser } from 'src/hook/useUser';
import Word from './side/Word';
//Typography

const SideMenu = ({
  open,
  handleSideMenu,
  wordOpen,
}: {
  open: boolean;
  handleSideMenu: (isOpen: boolean) => void;
  wordOpen?: boolean;
}) => {
  const { asPath } = useRouter();
  const [content, setContent] = useState<React.ReactElement | null>(null);
  const { isLanguageSetting } = useUser();

  useEffect(() => {
    if (!isLanguageSetting) {
      setContent(<Menu setContent={setContent} handleSideMenu={handleSideMenu} />);
    }
    if (wordOpen) {
      setContent(<Word handleSideMenu={handleSideMenu} />);
    }
  }, [setContent, handleSideMenu, isLanguageSetting, wordOpen]);

  useEffect(() => {
    if (wordOpen) {
      handleSideMenu(true);
    } else {
      handleSideMenu(false);
    }
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
        },
      }}
    >
      <Box component="nav">{content}</Box>
    </Drawer>
  );
};
export default SideMenu;
