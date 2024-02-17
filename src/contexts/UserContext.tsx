import { ReactNode, createContext, useEffect, useState } from "react";

export interface UserContextValues{
    user:{
        name: string;
        mainLanguage: string;
        subLanguage: string;
    }
    setMainLanguage :(value: string) => void;
    setSubLanguage :(value: string) => void;
    code: string | null;
    setCode: (value: string | null) => void;
    userId: string | null;
    setUserId: (value: string | null) => void;
    userRole: string | null;
    setUserRole: (value: string | null) => void;
}

const contextDefaultValue: UserContextValues = {
    user: {
      name: '아이',
      mainLanguage: '한국어',
      subLanguage: 'English',
    },
    setMainLanguage: () => {},
    setSubLanguage: () => {},
    code: null,
    setCode: () => {},
    userId: null,
    setUserId: () => {},
    userRole: null,
    setUserRole: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);
  const [code, setCode] = useState(contextDefaultValue.code);
  const [userId, setUserId] = useState(contextDefaultValue.userId);
  const [userRole, setUserRole] = useState(contextDefaultValue.userRole);

  useEffect(()=>{
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [mainLanguage, subLanguage]);

  return (
    <UserContext.Provider value={{user: contextDefaultValue.user, setMainLanguage, setSubLanguage, code, setCode, userId, setUserId, userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  )
}