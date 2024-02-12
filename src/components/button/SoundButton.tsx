import { Button, Typography } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { windowTTS } from 'src/utils/tts';
import throttling from 'src/utils/throttling';

const SoundButton = ({ buttonText, soundText }: { buttonText?: string; soundText: string }) => (
  <Button
    startIcon={<SoundIcon sx={{ width: '16px' }} />}
    onClick={(e) => {
      e.stopPropagation();
      throttling(() => windowTTS(soundText), 1000);
    }}
  >
    <Typography variant="body2">{buttonText}</Typography>
  </Button>
);

export default SoundButton;
