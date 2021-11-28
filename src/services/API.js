import axios from "axios";

const API_URL = "https://mywallet-b.herokuapp.com";

const createHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const signIn = ({ body }) => axios.post(`${API_URL}/sign-in`, body);
const signUp = ({ body }) => axios.post(`${API_URL}/sign-up`, body);
const getEntries = ({ token }) =>
  axios.get(`${API_URL}/entries`, createHeaders(token));
const addEntry = ({ token, body }) =>
  axios.post(`${API_URL}/entries`, body, createHeaders(token));

export { signIn, signUp, getEntries, addEntry };
