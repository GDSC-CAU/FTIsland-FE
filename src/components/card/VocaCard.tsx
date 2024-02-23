import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import BookIcon from '@mui/icons-material/MenuBookRounded';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteVoca, getVocaDescription } from 'src/apis/voca';
import { useUser } from 'src/hook/useUser';
import convertedLanguageCode from 'src/utils/convertedLanguageCode';
import throttling from 'src/utils/throttling';

import SoundButton from '../button/SoundButton';
import SwitchButton from '../button/SwitchButton';

const FlippableCard = ({ isBackPage, children }: { isBackPage: boolean; children: ReactNode }) => (
  <Card
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',

      aspectRatio: '1/1',
      borderRadius: '20px',
      boxShadow: '2px 4px 6px gray',
      backfaceVisibility: 'hidden',
      transform: isBackPage ? 'rotateY(180deg)' : 'none',

      animation: isBackPage ? 'flipCard .4s forwards' : 'unFlipCard .4s forwards',
      '@keyframes flipCard': {
        '0%': { transform: 'rotateY(0deg)' },
        '100%': { transform: 'rotateY(180deg)' },
      },
      '@keyframes unFlipCard': {
        '0%': { transform: 'rotateY(180deg)' },
        '100%': { transform: 'rotateY(0deg)' },
      },
    }}
  >
    {children}
  </Card>
);

const VocaCard = ({ vocaId, image }: { vocaId: number; image: string }) => {
  const { user, userRole } = useUser();
  const { userId } = useUser();
  const queryClient = useQueryClient();

  const [isBackPage, setIsBackPage] = useState(false);
  const [voacInfo, setVocaInfo] = useState({ bookName: '', word: '', description: '' });
  const [isMainLanguage, setIsMainLanguage] = useState(true);

  const { data: vocaDetailData, isLoading } = useQuery({
    queryKey: ['vocaDetailData', vocaId, user.mainLanguage, user.subLanguage],
    queryFn: async () =>
      await getVocaDescription(
        vocaId,
        convertedLanguageCode(user.mainLanguage),
        convertedLanguageCode(user.subLanguage),
      ).then((res) => {
        setVocaInfo(res[1]);
        return res;
      }),
    enabled: userRole === 'USER' && typeof vocaId === 'number',
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
  });

  const mutation = useMutation({
    mutationFn: async () => await deleteVoca(userId, vocaId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['vocaList'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['vocaDetailData'],
      });
    },
  });

  useEffect(() => {
    if (vocaDetailData) {
      setVocaInfo(vocaDetailData[isMainLanguage ? 0 : 1]);
    }
  }, [isMainLanguage, vocaDetailData]);

  return isLoading ? (
    <Skeleton
      variant="rounded"
      sx={{
        aspectRatio: '1/1',
        minWidth: '240px',
        maxWidth: '360px',
        width: '100%',
        height: '100%',
      }}
    />
  ) : (
    <Box
      onClick={() => {
        throttling(() => setIsBackPage(!isBackPage), 400);
      }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        aspectRatio: '1/1',
        minWidth: '240px',
        maxWidth: '360px',
        width: '100%',
        mx: 'auto',
      }}
    >
      <FlippableCard isBackPage={isBackPage}>
        {/* 앞면 */}
        <CardMedia
          image={image}
          sx={{
            position: 'relative',
            aspectRatio: '4/3',
            width: '100%',
          }}
        />

        {mutation.isPending ? (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
              width: '24px !important',
              height: '24px !important',
            }}
          />
        ) : (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              mutation.mutate();
            }}
            sx={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
          >
            <CloseIcon sx={{ width: '28px', height: '28px' }} />
          </IconButton>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            bgcolor: 'white',
            px: 1,
            borderRadius: '20px',

            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'grey.800',
            whiteSpace: 'nowrap',
          }}
        >
          <BookIcon sx={{ width: '16px' }} />
          <Typography variant="h6" sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 900 }}>
            {voacInfo.bookName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {voacInfo.word}
          </Typography>
        </Box>
      </FlippableCard>

      <FlippableCard isBackPage={!isBackPage}>
        {/* 뒷면 */}
        <Box
          sx={{
            p: 2,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',

            'h3, h6': {
              fontWeight: 900,
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'anywhere',
              wordBreak: 'break-all',
            },
          }}
        >
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              position: 'absolute',
              top: '12px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,

              '> p': {
                fontWeight: 600,
              },
            }}
          >
            <Typography variant="body2">Main</Typography>
            <SwitchButton
              value={isMainLanguage}
              onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLInputElement;
                setIsMainLanguage(!target.checked);
              }}
            />
            <Typography variant="body2">Sub</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mx: 'auto' }}>
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '20px',
                  backgroundImage: `url(${image})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
              <Typography variant="h3">{voacInfo.word}</Typography>
            </Box>
            <Box>
              <Box sx={{ mt: '-28px' }}>
                <SoundButton
                  buttonText="단어 듣기"
                  soundText={voacInfo.word}
                  languageCode={
                    isMainLanguage
                      ? convertedLanguageCode(user.mainLanguage)
                      : convertedLanguageCode(user.subLanguage)
                  }
                />
                <SoundButton
                  buttonText="설명 듣기"
                  soundText={voacInfo.description}
                  languageCode={
                    isMainLanguage
                      ? convertedLanguageCode(user.mainLanguage)
                      : convertedLanguageCode(user.subLanguage)
                  }
                />
              </Box>
              <Typography variant="h6">{voacInfo.description}</Typography>
            </Box>
          </Box>
        </Box>
      </FlippableCard>
    </Box>
  );
};

export default VocaCard;
