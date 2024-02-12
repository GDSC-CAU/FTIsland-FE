import { ReactElement, forwardRef, memo, useState } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { useRouter } from 'next/router';
import {
  Box,
  Dialog,
  IconButton,
  Slide,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';

export type StoryDataType = {
  bookId: number;
  title: string;
  description: string;
  images: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StoryCardPopup = ({
  focusStoryData,
  open,
  onClose,
}: {
  focusStoryData: StoryDataType;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onBackdropClick={() => {
      onClose();
    }}
    PaperProps={{
      sx: {
        position: 'relative',
        borderRadius: '20px',
        width: { xs: '360px', sm: '500px' },
      },
    }}
  >
    <IconButton
      onClick={() => onClose()}
      sx={{
        position: 'absolute',
        top: '8px',
        right: '8px',
      }}
    >
      <CloseIcon
        sx={{
          color: 'white',
          width: { xs: '24px', sm: '40px' },
          height: { xs: '24px', sm: '40px' },
        }}
      />
    </IconButton>
    <StoryCard isClickable={false} bookData={focusStoryData} />
  </Dialog>
);

const StoryCard = ({
  isClickable,
  bookData,
  sx,
}: {
  isClickable: boolean;
  bookData: StoryDataType;
  sx?: SxProps;
}) => {
  const { push } = useRouter();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const [isOpenFocusStory, setIsOpenFocusStory] = useState(false);

  const { bookId, title, description, images } = bookData;

  return (
    <>
      <Box
        onClick={() => {
          if (isClickable) setIsOpenFocusStory(true);
          else push(`/book/${bookId}`);
        }}
        sx={{
          cursor: 'pointer',
          aspectRatio: '3/4',
          borderRadius: '20px',
          backgroundImage: `url(${images})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          boxShadow: '2px 4px 6px gray',

          ...(isClickable && {
            maxWidth: '360px',
            minWidth: '240px',
            mx: 'auto',
          }),

          display: 'flex',
          alignItems: 'flex-end',
          transition: 'transform .3s, box-shadow .3s',
          ...sx,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            position: 'relative',
            width: '100%',
            // height: { xs: '50%', sm: '40%' },
            minHeight: '40%',
            borderRadius: '20px',
            m: { xs: 1, sm: 2 },
            p: { xs: 1, sm: 2 },
            bgcolor: 'rgba(107,107,107,0.8)',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h4'}
            sx={{
              fontWeight: 900,
              textAlign: 'center',
              color: 'white',
              textShadow: '1px 1px 2px black',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'anywhere',
              wordBreak: 'break-all',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: isMobile ? '14px' : '17.5px',
              fontWeight: 600,
              textAlign: 'center',
              color: 'white',
              textShadow: '1px',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      {isOpenFocusStory ? (
        <StoryCardPopup
          focusStoryData={bookData}
          open={isOpenFocusStory}
          onClose={() => setIsOpenFocusStory(false)}
        />
      ) : null}
    </>
  );
};

export default memo(StoryCard);