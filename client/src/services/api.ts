import axios from "axios";

const api = axios.create({
	baseURL: "https://projeto-fullstack.onrender.com",
});

export default api;
