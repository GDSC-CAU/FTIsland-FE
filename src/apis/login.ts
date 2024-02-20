import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const postLogin = async ({id, password}:{id:string; password:string;}) => {
	try {

    const data = {
      inputId: id,
      inputPassword: password,
    }

    const response = await axios.post(`${baseURL}/login`, data);

    if(response && response.status === 200){
      return response.data;
    }else{
      alert('등록된 정보가 없습니다.');
    }

	} catch (error) {
		console.error(error);
	}
};

export const postJoin = async ({id, password, name, mainLanguage, subLanguage}
  :{id:string; password:string; name:string; mainLanguage:string; subLanguage:string}) => {
	try {

    const data = {
      inputId: id,
      inputPassword: password,
      name: name,
      mainLanguage: mainLanguage || "ko",
      subLanguage: subLanguage || 'en',
    }
    console.log(data);

    const response = await axios.post(`${baseURL}/sign-up`, data);
    if(response){
      if(response.status === 200){//...수정해야함
        return response.data;
      }else {
        alert("Join Failed");
      }
    }

	} catch (error) {
		console.error(error);
	}
};