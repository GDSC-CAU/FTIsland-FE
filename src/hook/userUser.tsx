import { useContext } from "react";
import { UserContext, UserContextValues } from "src/contexts/UserContext";

export const useUser = () : UserContextValues => {
    console.log(UserContext);
    return useContext(UserContext);
  }