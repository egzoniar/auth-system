import axios from 'axios';
import { AppEvents } from './AppEvents';

const axiosConfig = {
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-type': 'application/json',
	},
}

const instance = axios.create(axiosConfig);
const instanceRefreshToken = axios.create(axiosConfig);

export const refreshToken = async (): Promise<any> => {
	const refreshToken = getAuth()?.refreshToken;	
	const response = await instanceRefreshToken.post('/refresh', {refreshToken});
	return response.data;
}

instanceRefreshToken.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) removeAuth();
		
		return Promise.reject(error);
	}
);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
	const token = getAuth()?.accessToken;
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

// Refresh token on 401 error
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401) {
			
      const result = await refreshToken();
			
      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.accessToken}`,
        };

				setAuth({accessToken: result?.accessToken});
      }

      return axios(config);
    }

		removeAuth();

    return Promise.reject(error);
  }
);

const getAuth = () => {
	const auth = localStorage.getItem('auth');
	return auth ? JSON.parse(auth) : null;
}

const setAuth = (payload: any) => {
	const auth = localStorage.getItem('auth');
	const authObj = auth ? JSON.parse(auth) : null;
	localStorage.setItem('auth', JSON.stringify({...authObj, ...payload}));
}

const removeAuth = () => {
	AppEvents.getInstance().emit('logout');
}

export default instance;