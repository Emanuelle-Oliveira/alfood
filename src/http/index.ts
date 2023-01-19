import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:7000/api/v2/'
});

export default http;