import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Drawer } from '@mui/material';
import Menu from './side/Menu'
//Typography

const SideMenu = ({
  open,
  handleSideMenu,
}: {
  open: boolean;
  handleSideMenu: (isOpen: boolean) => void;
}) => {
  const { asPath } = useRouter();
  const [content, setContent] = useState<React.ReactElement | null>(null);

  useEffect(()=>{
    setContent((<Menu setContent={setContent}/>));
  }, []);

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
        {/* <Typography variant="h4">여기가 사이드 메뉴입니다.</Typography> */}
        {content}
      </Box>
    </Drawer>
  );
};
export default SideMenu;
