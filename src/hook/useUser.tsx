import { useContext } from "react";
import { UserContext, UserContextValues } from "src/contexts/UserContext";

export const useUser = () : UserContextValues => {
    return useContext(UserContext);
  }