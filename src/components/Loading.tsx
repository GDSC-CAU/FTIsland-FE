import Lottie from 'react-lottie';
import { Dialog } from '@mui/material';

import animationData from '../../public/loading.json';

const Loading = ({ isLoading = true }: { isLoading?: boolean }) => (
  <Dialog
    open={isLoading}
    PaperProps={{
      style: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    }}
  >
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
      }}
      width={200}
      height={200}
    />
  </Dialog>
);

export default Loading;
