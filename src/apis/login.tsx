import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getLogin = async (setCode: (value: string) => void, setUserId: (value: string) => void, setUserRole: (value: string) => void) => {
	try {
    await axios.get(`${baseURL}/oauth2/authorization/google`);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    const code = params.get('code');
    const userId = params.get('id');
    const userRole = params.get('userRole');

    if(code){
      setCode(code);
    }
    if(userId){
      setUserId(userId);
    }
    if(userRole){
      setUserRole(userRole);
    }
	} catch (error) {
		console.error(error);
	}
};