export function GetContacts() {
	return fetch('http://localhost:49240/api/Contact', { method: 'GET' })
		.then(response => { return response.json() });
}

export function GetContact(id) {
	return fetch(`http://localhost:49240/api/Contact/${id}`, { method: 'GET' })
		.then(response => { return response.json() });
}

export function DeleteContact(id) {
	return fetch(`http://localhost:49240/api/Contact/${id}`, { method: 'DELETE' })
		.then(response => { return response.json() });
}