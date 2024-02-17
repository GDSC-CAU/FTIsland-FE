import { ReactNode, createContext, useEffect, useState } from "react";

export interface UserContextValues{
    user:{
        name: string;
        mainLanguage: string;
        subLanguage: string;
    }
    setMainLanguage :(value: string) => void;
    setSubLanguage :(value: string) => void;
}

const contextDefaultValue: UserContextValues = {
    user: {
      name: '아이',
      mainLanguage: '한국어',
      subLanguage: 'English',
    },
    setMainLanguage: () => {},
    setSubLanguage: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);

  useEffect(()=>{
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [mainLanguage, subLanguage]);

  return (
    <UserContext.Provider value={{user: contextDefaultValue.user, setMainLanguage, setSubLanguage}}>
      {children}
    </UserContext.Provider>
  )
}