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
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }
    }

	} catch (error) {
		console.error(error);
	}
};

export const postJoin = async ({id, password, name, mainLanguage, subLanguage}
  :{id:string; password:string; name:string; mainLanguage:string; subLanguage:string}) => {
	try {

    const data = {
      id: id,
      password: password,
      name: name,
      mainLanguage: mainLanguage,
      subLanguage: subLanguage,
    }

    const response = await axios.post(`${baseURL}/sign-up`, data);

    if(response){
      if(response.status === 201){//...수정해야함
        return response.data;
      }else if(response.status === 404){
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }

	} catch (error) {
		console.error(error);
	}
};