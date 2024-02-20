import { Button, Typography } from '@mui/material';
import SoundIcon from '@mui/icons-material/VolumeUp';

import { googleTTS } from 'src/utils/tts';
import throttling from 'src/utils/throttling';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';

const SoundButton = ({
  buttonText,
  soundText,
  languageCode,
}: {
  buttonText?: string;
  soundText: string;
  languageCode?: string;
}) => {
  return (
    <Button
      startIcon={<SoundIcon sx={{ width: '16px' }} />}
      onClick={(e) => {
        e.stopPropagation();
        throttling(
          () =>
            googleTTS(soundText, languageCode ? convertedLanguageCode(languageCode) : undefined),
          1000,
        );
      }}
    >
      <Typography variant="body2">{buttonText}</Typography>
    </Button>
  );
};

export default SoundButton;
