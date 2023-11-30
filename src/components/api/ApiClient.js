import axios from "axios"

axios.defaults.withCredentials = true;
export const apiClient = axios.create(
	{
		baseURL:'http://localhost:8080'
	}
)
