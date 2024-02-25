import { ReactNode, createContext, useEffect, useState } from 'react';

export interface UserContextValues {
  user: {
    nickName: string;
    mainLanguage: string;
    subLanguage: string;
  };
  setNickName: (value: string) => void;
  setMainLanguage: (value: string) => void;
  setSubLanguage: (value: string) => void;
  userId: number;
  setUserId: (value: number) => void;
  userRole: 'GUEST' | 'USER';
  setUserRole: (value: 'GUEST' | 'USER') => void;
  menu: string | null;
  setMenu: (value: string | null) => void;
  isLanguageSetting: boolean;
  setIsLanguageSetting: (value: boolean) => void;
  wordModal: boolean;
  setWordModal: (value: boolean) => void;
  wordEnter: boolean;
  setWordEnter: (value: boolean) => void;
  vocaId: number;
  setVocaId: (value: number) => void;
  vocaWord: string;
  setVocaWord: (value: string) => void;
  wordType: string;
  setWordType: (value: string) => void;
}

const contextDefaultValue: UserContextValues = {
  user: {
    nickName: '',
    mainLanguage: 'English',
    subLanguage: '한국어',
  },
  setNickName: () => {},
  setMainLanguage: () => {},
  setSubLanguage: () => {},
  userId: -1,
  setUserId: () => {},
  userRole: 'GUEST',
  setUserRole: () => {},
  menu: '메인 페이지',
  setMenu: () => {},
  isLanguageSetting: false,
  setIsLanguageSetting: () => {},
  wordModal: false,
  setWordModal: () => {},
  wordEnter: false,
  setWordEnter: () => {},
  vocaId: 0,
  setVocaId: () => {},
  vocaWord: '',
  setVocaWord: () => {},
  wordType: '',
  setWordType: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [nickName, setNickName] = useState(contextDefaultValue.user.nickName);
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);
  const [userId, setUserId] = useState(contextDefaultValue.userId);
  const [userRole, setUserRole] = useState(contextDefaultValue.userRole);
  const [menu, setMenu] = useState(contextDefaultValue.menu);
  const [isLanguageSetting, setIsLanguageSetting] = useState(contextDefaultValue.isLanguageSetting);
  const [wordModal, setWordModal] = useState(contextDefaultValue.wordModal);
  const [wordEnter, setWordEnter] = useState(contextDefaultValue.wordEnter);
  const [vocaId, setVocaId] = useState(contextDefaultValue.vocaId);
  const [vocaWord, setVocaWord] = useState(contextDefaultValue.vocaWord);
  const [wordType, setWordType] = useState(contextDefaultValue.wordType);

  useEffect(() => {
    contextDefaultValue.user.nickName = nickName;
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [nickName, mainLanguage, subLanguage]);

  useEffect(() => {
    const newUserId = Number(localStorage.getItem('userId'));
    const newName = localStorage.getItem('name');
    const newMainLanguage = localStorage.getItem('mainLanguage');
    const newSubLanguage = localStorage.getItem('subLanguage');

    setMainLanguage(newMainLanguage || contextDefaultValue.user.mainLanguage);
    setSubLanguage(newSubLanguage || contextDefaultValue.user.subLanguage);
    localStorage.setItem('mainLanguage', newMainLanguage || contextDefaultValue.user.mainLanguage);
    localStorage.setItem('subLanguage', newSubLanguage || contextDefaultValue.user.subLanguage);

    if (newUserId) {
      setUserId(newUserId || -1);
      setNickName(newName || '');
      setUserRole('USER');
    }
  }, [userRole]);

  return (
    <UserContext.Provider
      value={{
        user: contextDefaultValue.user,
        setNickName,
        setMainLanguage,
        setSubLanguage,
        userId,
        setUserId,
        userRole,
        setUserRole,
        menu,
        setMenu,
        isLanguageSetting,
        setIsLanguageSetting,
        wordModal,
        setWordModal,
        wordEnter,
        setWordEnter,
        vocaId,
        setVocaId,
        vocaWord,
        setVocaWord,
        wordType,
        setWordType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
