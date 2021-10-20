import axios from "axios";

const API_URL = "https://localhost:4000";

const signIn = (body) => axios.post(`${API_URL}/sign-in`, body);
const signUp = (body) => axios.post(`${API_URL}/sign-up`, body);
const getEntries = () => axios.get(`${API_URL}/user`);
const addEntry = (body) => axios.post(`${API_URL}/user`, body);

export {
    signIn,
    signUp,
    getEntries,
    addEntry
};