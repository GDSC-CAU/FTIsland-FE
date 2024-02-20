import { CircularProgress, Dialog } from '@mui/material';

const Loading = ({ isLoading = true }: { isLoading?: boolean }) => (
  <Dialog
    open={isLoading}
    sx={{ overflowY: 'hidden' }}
    PaperProps={{
      style: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        boxShadow: 'none',
      },
    }}
  >
    <CircularProgress
      variant="indeterminate"
      sx={{ animationDuration: '800ms' }}
      size={40}
      thickness={4}
    />
  </Dialog>
);

export default Loading;
