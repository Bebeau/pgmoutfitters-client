import config from '../config/config';

class APIUtils {
	static callPost(endpoint, params) {
		return new Promise((resolve, reject) => {
			fetch(`${config.web.server_protocol}://${config.web.server_base}/${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(params),
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				resolve(json);
			}).catch(err => {
				reject(err);
			});
		});
	}

	static callPut(endpoint, params) {
		return new Promise((resolve, reject) => {
			fetch(`${config.web.server_protocol}://${config.web.server_base}/${endpoint}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(params),
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				resolve(json);
			}).catch(err => {
				reject(err);
			});
		});
	}

	static callDelete(endpoint, params) {
		return new Promise((resolve, reject) => {
			fetch(`${config.web.server_protocol}://${config.web.server_base}/${endpoint}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(params),
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				resolve(json);
			}).catch(err => {
				reject(err);
			});
		});
	}

	static callGet(endpoint) {
		return new Promise((resolve, reject) => {
			fetch(`${config.web.server_protocol}://${config.web.server_base}/${endpoint}`, {
				method: 'GET',
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				resolve(json);
			})
			.catch(err => {
				reject(err);
			});
		});
	}
}

export default APIUtils;