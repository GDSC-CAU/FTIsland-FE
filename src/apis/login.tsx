import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postLogin = async ({id, password}:{id:string; password:string;}) => {
	try {

    const data = {
      id: id,
      password: password,
    }

    const response = await axios.post(`${baseURL}/login`, data);

    if(response){
      if(response.status === 201){
        return response.data;
      }else if(response.status === 409){
        alert('아이디가 중복됩니다.');
      }
    }

	} catch (error) {
		console.error(error);
	}
};