import { ReactNode, createContext, useEffect, useState } from "react";

export interface UserContextValues{
    user:{
        nickName: string;
        mainLanguage: string;
        subLanguage: string;
    }
    setNickName :(value: string) => void;
    setMainLanguage :(value: string) => void;
    setSubLanguage :(value: string) => void;
    // token: string | null;
    // setToken: (value: string | null) => void;
    userId: string | number;
    setUserId: (value: string | number) => void;
    userRole: string | null;
    setUserRole: (value: string | null) => void;
}

const contextDefaultValue: UserContextValues = {
    user: {
      nickName: '',
      mainLanguage: '한국어',
      subLanguage: 'English',
    },
    setNickName: () => {},
    setMainLanguage: () => {},
    setSubLanguage: () => {},
    // token: null,
    // setToken: () => {},
    userId: -1,
    setUserId: () => {},
    userRole: "GUEST",
    setUserRole: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [nickName, setNickName] = useState(contextDefaultValue.user.nickName);
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);
  // const [token, setToken] = useState(contextDefaultValue.token);
  const [userId, setUserId] = useState(contextDefaultValue.userId);
  const [userRole, setUserRole] = useState(contextDefaultValue.userRole);

  useEffect(()=>{
    contextDefaultValue.user.nickName = nickName;
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [nickName, mainLanguage, subLanguage]);

  return (
    <UserContext.Provider value={{user: contextDefaultValue.user, setNickName, setMainLanguage, setSubLanguage, userId, setUserId, userRole, setUserRole}}>
      {children}
    </UserContext.Provider>
  )
}