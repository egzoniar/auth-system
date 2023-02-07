import axios from './axios';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}


export const me = async (): Promise<IUser> => { 
  const response = await axios.get('/me');
  return response.data;
}