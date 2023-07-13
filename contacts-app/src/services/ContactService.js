export async function getAllUsers() {

    try {
        const response = await fetch('api/Contact');
        return await response.json();
    } catch (error) {
        return [];
    }

}

export async function createUser(data) {
    const response = await fetch(`api/Contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function updateUser(id, data) {
    const response = await fetch(`api/Contact/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteUser(id) {
    await fetch(`api/Contact/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        }
    })
}