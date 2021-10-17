

export async function getAllUsers() {
    const response = await fetch('/list_users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}
