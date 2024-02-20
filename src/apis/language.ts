import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const putLanguage = async (userId:number, mainLanguage:string, subLanguage:string) => {
    try{
      const data = {
        userId: userId,
        mainLanguage: mainLanguage,
        subLanguage: subLanguage,
      }
      await axios.put(`${baseURL}/language`, data);

    }catch(error){
        console.error(error);
    }
}