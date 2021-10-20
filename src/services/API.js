import axios from "axios";

const API_URL = "https://localhost:4000";

const signIn = (body) => axios.post(`${API_URL}/sign-in`, body);

export {
    signIn
};