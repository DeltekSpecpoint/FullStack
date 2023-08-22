import axios, { AxiosRequestConfig } from "axios"

// extract api config from environment vars
export const {
	VITE_PUBLIC_API_BASEURL: host,
	VITE_PUBLIC_API_ENDPOINT: endPoint,
} = import.meta.env

export const axiosBaseConfig: AxiosRequestConfig = {
	// 5s response timeout
	timeout: 5000,
}

export const AxiosInstance = axios.create({
	...axiosBaseConfig,
	baseURL: `${host}${endPoint}`,
})
