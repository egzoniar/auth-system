import axios from 'axios';

export const fetchCategories = async () => {
	return (await axios.get('https://api.chucknorris.io/jokes/categories')).data;
}

export const fetchRandomJoke = async (category: string) => {
  return await (await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)).data;
}