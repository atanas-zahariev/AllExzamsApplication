import { clearUser, setUserData } from "../utility.js";
import { del, get, post, put } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAllProductInSystem: '/data/shoes?sortBy=_createdOn%20desc',
    addNewItem: '/data/shoes',
    getDetails: '/data/shoes/',
    search: '/data/shoes?where=brand%20LIKE%20%22${query}%22'
}

export async function login(data) {
    const result = await post(endpoints.login, data);
    setUserData(result);
}

export async function register(data) {
    const result = await post(endpoints.register, data);
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUser()
}

export async function getAllProductInSystem() {
    const result = await get(endpoints.getAllProductInSystem);
    return result;
};

export async function addNewItem(data) {
    const result = await post(endpoints.addNewItem, data);
    return result;
}

export async function getDetails(id) {
    const result = await get(endpoints.getDetails + id);
    return result;
}

export async function onEdit(id, data) {
    const result = await put(endpoints.getDetails + id, data);
    return result;
}

export async function searchItem(query){
    const result = await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
    return result;
}


export async function deleteItem(id){
   const result = await del(endpoints.getDetails + id);
   return result;
}




window.getAllProductInSystem = getAllProductInSystem;
window.getDetails = getDetails;
window.searchItem = searchItem;

