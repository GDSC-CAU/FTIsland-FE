const convertLanguageCode = (languageName: string) => {
  switch (languageName) {
    case '한국어':
      return 'ko';
    case 'English':
      return 'en';
    case '日本語':
      return 'ja';
    case '中文':
      return 'cmn';
    default:
      return languageName;
  }
};

export default convertLanguageCode;
