import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-udemy-burger-chuka.firebaseio.com/ '
});

export default instance;
