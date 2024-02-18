import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postLanguages = async (userId:string, nickName:string, mainLanguage:string, subLanguage:string) => {
    try{
      const data = {
        userId: userId,
        nickName: nickName,
        mainLanguage: mainLanguage,
        subLanguage: subLanguage,
      }
      await axios.post(`${baseURL}/language`, data)

    }catch(error){
        console.error(error);
    }
}

export const getBookExample = async () => {
  try{
    const response = await axios.get(`${baseURL}/book/info?bookId=1`);
    console.log(response);
  }catch(error){
    console.error(error);
  }
}