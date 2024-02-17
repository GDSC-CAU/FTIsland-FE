import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getIslandInfo = async (islandName:string, userId:string|number) => {
    try{
      const data = {
        islandName: islandName,
        userId: userId,
      }
      const url = baseURL + '/island/book';
      const response = await axios.post(url, data);
      return response;

    }catch(error){
        console.error(error);
    }
}