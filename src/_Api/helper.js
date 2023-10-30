import axios from "axios"
export const request = (path, data, method, type) => {
	var options = {
		method: method,
		//url: `${process.env.REACT_APP_API_URL}${path}`,
		url: `${'https://localhost:7001'}/${path}`,
		headers: {
			// "Content-Type":"application/json",
			'Content-Type': 'text/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		},
	};
	if (type) {
		options.headers = { "Content-Type": "multipart/form-data" }
	} else {
		options.dataType = 'json';
	}
	const userData = JSON.parse(localStorage.getItem('token'));
	//let userData = localStorage.getItem('token');
	if (userData) {
		options.headers["Authorization"] = 'Bearer ' + userData;
	}

	if (method === "GET") {
		options["params"] = data;
	} else if (method === "Patch") {
		options["params"] = data;
	}
	else {
		options["data"] = data;
	}
	return axios(options);
}

export const postRequest = (path, data, type) => request(path, data, "POST", type)
export const putRequest = (path, data, type) => request(path, data, "PUT", type)
export const patchRequest = (path, data) => request(path, data, "Patch")
export const getRequest = (path, data) => request(path, data, "GET")

