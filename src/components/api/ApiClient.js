import axios from "axios"

export const apiClient = axios.create(
	{
		baseURL:'http://localhost:8080',
		withCredentials : true
	}
)

export const apiClientAi = axios.create(
	{
		baseURL:'http://localhost:8000'
	}
)

export const apiClientSegmentation = axios.create(
	{
		baseURL:'http://localhost:8001'
	}
)