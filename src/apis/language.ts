import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postLanguages = async (userId:number, mainLanguage:string, subLanguage:string) => {
    try{
      const data = {
        userId: userId,
        mainLanguage: mainLanguage,
        subLanguage: subLanguage,
      }
      const response = await axios.post(`${baseURL}/language`, data);
      console.log(response);

    }catch(error){
        console.error(error);
    }
}