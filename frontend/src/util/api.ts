import axios from "axios";
import authTokenStorage from "@/storage/authTokenStorage";

const API = axios.create({
	baseURL: process.env.NEXT_API_URL,
	withCredentials: true
});

API.interceptors.request.use(config => {
	const token = authTokenStorage.getToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

API.interceptors.response.use(
	res => res,
	err => {
		const msg = err?.response?.data?.message || "Something went wrong";
		if (err?.response?.status === 401) {
			window.location.href = "/signin";
		} else {
			console.error("API Error:", msg);
		}
		return Promise.reject(err);
	}
);

export default API;
