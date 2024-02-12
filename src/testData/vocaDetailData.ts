export const getVocaDescription = (vocaId: number) => {
  const descriptionList = [
    {
      word: '사과',
      description: '사과는 빨간 과일인데 ~~',
      bookName: '아기 돼지 삼형제',
    },
    {
      word: '바나나',
      description: '바나나는 노란 과일인데 ~~',
      bookName: 'The Three Little Pigs',
    },
    {
      word: '딸기',
      description: '딸기는 붉은 과일인데 ~~',
      bookName: 'Strawberry Shortcake',
    },
    {
      word: '수박',
      description: '수박은 물이 많은 과일인데 ~~',
      bookName: '수박 먹방',
    },
    {
      word: '포도',
      description: '포도는 작고 달콤한 과일인데 ~~',
      bookName: '포도밭을 찾아서',
    },
    {
      word: '복숭아',
      description: '복숭아는 부드럽고 달콤한 과일인데 ~~',
      bookName: "Peach's Adventure",
    },
    {
      word: '자두',
      description: '자두는 검은색 과일인데 ~~',
      bookName: 'Plum Paradise',
    },
    {
      word: '체리',
      description: '체리는 작고 빨간 과일인데 ~~',
      bookName: '체리가 좋아요',
    },
    {
      word: '키위',
      description: '키위는 작고 산뜻한 과일인데 ~~',
      bookName: '키위 여행기',
    },
    {
      word: '레몬',
      description: '레몬은 시원한 과일인데 ~~',
      bookName: 'Sour Lemon Story',
    },
    {
      word: '라임',
      description: '라임은 상큼한 과일인데 ~~',
      bookName: '라임과 소금',
    },
    {
      word: '망고',
      description: '망고는 달콤한 과일인데 ~~',
      bookName: '망고 이야기',
    },
    {
      word: '파인애플',
      description: '파인애플은 노란 과일인데 ~~',
      bookName: '파인애플과 카멜레온',
    },
    {
      word: '오렌지',
      description: '오렌지는 주황색 과일인데 ~~',
      bookName: '오렌지와 태양',
    },
    {
      word: '자몽',
      description: '자몽은 새콤한 과일인데 ~~',
      bookName: '자몽의 비밀',
    },
    {
      word: '망고스틴',
      description: '망고스틴은 달콤한 과일인데 ~~',
      bookName: '망고스틴 놀이터',
    },
    {
      word: '레즌',
      description: '레즌은 건조한 과일인데 ~~',
      bookName: '레즌의 여행',
    },
    {
      word: '오디',
      description: '오디는 작은 과일인데 ~~',
      bookName: '오디가 맛있는 이유',
    },
    {
      word: '크랜베리',
      description: '크랜베리는 시원한 과일인데 ~~',
      bookName: '크랜베리 호수의 비밀',
    },
    {
      word: '블루베리',
      description: '블루베리는 푸른 과일인데 ~~',
      bookName: '블루베리 숲의 비밀',
    },
    {
      word: '피치',
      description: '피치는 달콤한 과일인데 ~~',
      bookName: '피치와 달콤한 꿈',
    },
    {
      word: '아보카도',
      description: '아보카도는 부드러운 과일인데 ~~',
      bookName: '아보카도 탐험대',
    },
    {
      word: '코코넛',
      description: '코코넛은 쫄깃한 과일인데 ~~',
      bookName: '코코넛 해적단',
    },
    {
      word: '파파야',
      description: '파파야는 노란 과일인데 ~~',
      bookName: '파파야의 비밀',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
    {
      word: '감',
      description: '감은 달콤한 과일인데 ~~',
      bookName: '감의 이야기',
    },
  ];

  return descriptionList[vocaId - 1];
};
