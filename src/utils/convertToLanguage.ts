const convertLanguageCode = (languageName: string) => {
    switch (languageName) {
      case 'ko':
        return '한국어';
      case 'en':
        return 'English';
      case 'ja':
        return '日本語';
      case 'cmn':
        return '中文';
      default:
        return '한국어';
    }
  };
  
  export default convertLanguageCode;
  