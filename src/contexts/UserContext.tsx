import { ReactNode, createContext, useEffect, useState } from "react";

export interface UserContextValues{
    user:{
        name: string;
        mainLanguage: string;
        subLanguage: string;
    }
    setMainLanguage :(value: string) => void;
    setSubLanguage :(value: string) => void;
    token: string | null;
    setToken: (value: string | null) => void;
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
    token: null,
    setToken: () => {},
    userId: null,
    setUserId: () => {},
    userRole: null,
    setUserRole: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);
  const [token, setToken] = useState(contextDefaultValue.token);
  const [userId, setUserId] = useState(contextDefaultValue.userId);
  const [userRole, setUserRole] = useState(contextDefaultValue.userRole);

  useEffect(()=>{
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [mainLanguage, subLanguage]);

  return (
    <UserContext.Provider value={{user: contextDefaultValue.user, setMainLanguage, setSubLanguage, token, setToken, userId, setUserId, userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  )
}