const supportedLanguageList = ['ko', 'en', 'ja', 'cmn'];

const languageToCountry = (language: string) => {
  switch (language) {
    case 'ko':
      return 'KR';
    case 'en':
      return 'US';
    case 'ja':
      return 'JP';
    case 'cmn':
      return 'CN';
    default:
      return 'KR';
  }
};

/**
 * Web speech api를 이용해서 text를 음성으로 변환하여 재생하는 함수
 * @param text 음성으로 들을 텍스트
 * @param languageCode 언어코드
 */
export const windowTTS = (text: string, languageCode?: string) => {
  const language =
    languageCode && supportedLanguageList.includes(languageCode) ? languageCode : 'ko';

  window.speechSynthesis.cancel();

  const speechMsg = new SpeechSynthesisUtterance(text);
  speechMsg.rate = 1; // 속도: 0.1 ~ 10
  speechMsg.pitch = 1; // 음높이: 0 ~ 2
  speechMsg.lang = `${language}-${languageToCountry(language)}`;

  // window 지원하는 목소리 리스트. 목소리 변경기능은 추후에 탑재
  //   const availableVoices = window.speechSynthesis.getVoices();
  //   console.log(availableVoices);

  window.speechSynthesis.speak(speechMsg);
};

/**
 * Google tts api를 이용해서 text를 음성으로 변환하여 재생하는 함수
 * @param text 음성으로 들을 텍스트
 * @param languageCode 언어코드
 * @param name 목소리 코드 | 형태 -> 언어코드-나라코드-[Standard/Wavenet/Neural2]-A/B/C/D
 */
export const googleTTS = async (text: string, languageCode?: string, voiceCode = 'Wavenet-B') => {
  const language =
    languageCode && supportedLanguageList.includes(languageCode) ? languageCode : 'ko';

  const ttsOption = {
    input: {
      text,
    },
    voice: {
      languageCode: language,
      name: `${language}-${languageToCountry(language)}-${voiceCode}`,
    },
    // 언어코드와 목소리 코드의 앞부분은 일치해야 에러가 발생하지 않음.
    // 언어코드-나라코드-[Standard/Wavenet/Neural2]-A/B/C/D
    audioConfig: {
      audioEncoding: 'mp3',
      speakingRate: 1, // 재생속도
      //   pitch: 2,
    },
  };

  const base64ToBlob = (base64: string) => {
    const bytes = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(bytes.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    uint8Array.forEach((_, i) => {
      uint8Array[i] = bytes.charCodeAt(i);
    });

    return new Blob([arrayBuffer], { type: 'application/mp3' });
  };

  const playAudio = (audioContent: string) => {
    const audioFile = new Audio();
    const audioBlob = base64ToBlob(audioContent);
    audioFile.src = window.URL.createObjectURL(audioBlob);
    audioFile.play();
  };

  const fetchGoogleTTS = async (body?: object) => {
    try {
      const audioContent = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: body ? JSON.stringify(body) : null,
        },
      ).then(async (res) => {
        let response = null;
        if (res.headers.get('content-length')) {
          response = await res.json();
        }
        if (!res.ok) return Promise.reject(new Error(response.message ?? response.error));
        return response.audioContent;
      });

      return audioContent;
    } catch (e) {
      console.error(e);
    }
  };

  const audioContent = await fetchGoogleTTS(ttsOption);

  playAudio(audioContent);
};
