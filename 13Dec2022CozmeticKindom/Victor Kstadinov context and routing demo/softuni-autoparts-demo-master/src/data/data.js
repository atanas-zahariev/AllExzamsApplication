import { get, post } from "./api.js";

export async function getParts() {
    return await get('http://localhost:3030/data/autoparts')
};

export async function getDetails(id) {
    return await get('http://localhost:3030/data/autoparts/' + id)

};

export async function login(email, password ) {
    const userData = await post('http://localhost:3030/users/login', { email, password });
   
    localStorage.setItem('userData', JSON.stringify({
        email: userData.email,
        id: userData._id,
        accessToken: userData.accessToken
    }))
}