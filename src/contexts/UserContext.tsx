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
    menu: string | null;
    setMenu: (value: string | null) => void;
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
    menu: "메인 페이지",
    setMenu: () => {},
};

export const UserContext = createContext(contextDefaultValue);

export const UserProvider = ({children}:{children:ReactNode}) => {
  const [nickName, setNickName] = useState(contextDefaultValue.user.nickName);
  const [mainLanguage, setMainLanguage] = useState(contextDefaultValue.user.mainLanguage);
  const [subLanguage, setSubLanguage] = useState(contextDefaultValue.user.subLanguage);
  // const [token, setToken] = useState(contextDefaultValue.token);
  const [userId, setUserId] = useState(contextDefaultValue.userId);
  const [userRole, setUserRole] = useState(contextDefaultValue.userRole);
  const [menu, setMenu] = useState(contextDefaultValue.menu);

  useEffect(()=>{
    contextDefaultValue.user.nickName = nickName;
    contextDefaultValue.user.mainLanguage = mainLanguage;
    contextDefaultValue.user.subLanguage = subLanguage;
  }, [nickName, mainLanguage, subLanguage]);

  useEffect(()=>{
    if(localStorage.getItem('userRole') ==='USER'){
      const newUserId = localStorage.getItem('userId');
      const newName = localStorage.getItem('name');
      const newMainLanguage = localStorage.getItem('mainLanguage');
      const newSubLanguage = localStorage.getItem('subLanguage');
      console.log(newUserId, newName, newMainLanguage, newSubLanguage);
      if(newUserId && newName && newMainLanguage && newSubLanguage){
        setUserId(newUserId);
        setNickName(newName);
        setMainLanguage(newMainLanguage);
        setSubLanguage(newSubLanguage);
        setUserRole('USER');
      }
    }
  }, [userRole]);

  return (
    <UserContext.Provider value={{user: contextDefaultValue.user, setNickName, setMainLanguage, setSubLanguage, userId, setUserId, userRole, setUserRole, menu, setMenu}}>
      {children}
    </UserContext.Provider>
  )
}