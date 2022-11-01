export function GetContacts() {
	return fetch('http://localhost:5000/api/Contact', { method: 'GET' })
		.then(response => { return response.json() });
}

export function GetContact(id) {
	return fetch(`http://localhost:5000/api/Contact/${id}`, { method: 'GET' })
		.then(response => { return response.json() });
}

export function DeleteContact(id) {
	return fetch(`http://localhost:5000/api/Contact/${id}`, { method: 'DELETE' })
}

export function AddContactPerson(json) {
	let parseJSON = JSON.stringify(json);
	return fetch(`http://localhost:5000/api/Contact/`, 
	{ 
		method: 'POST', 
		body: parseJSON,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  }
	})
}

export function UpdateContactPerson(id, json) {
	let parseJSON = JSON.stringify(json);
	return fetch(`http://localhost:5000/api/Contact/${id}`, 
	{ 
		method: 'PUT', 
		body: parseJSON,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  }
	})
}