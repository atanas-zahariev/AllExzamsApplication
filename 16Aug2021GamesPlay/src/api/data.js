import { clearUser, setUserData } from "../utility.js";
import { del, get, post, put } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAllDataInSistem: '/data/games?sortBy=_createdOn%20desc',
    getAllForHomePage: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    getSpecificDataWithId: '/data/games/',
    addInSysten: '/data/games'
}

export async function getDataForHomePage() {
    const result = await get(endpoints.getAllForHomePage);
    return result
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

export async function getAllDataInSystem() {
    const result = await get(endpoints.getAllDataInSistem);
    return result;
}

export async function getSpecificDataWithId(id) {
    const result = await get(endpoints.getSpecificDataWithId + id);
    return result;
}

export async function onEdit(id, data) {
    const result = await put(endpoints.getSpecificDataWithId + id, data);
    return result;
}

export async function addInSystem(data) {
    const result = await post(endpoints.addInSysten, data);
    return result;
}

export async function onDelete(id) {
    const result = await del(endpoints.getSpecificDataWithId + id);
    return result;
}

export async function makeAction(result) {
    await post('/data/comments', result)
}

export async function getTotalAction(specificId) {
    const result = await get(`/data/comments?where=gameId%3D%22${specificId}%22`);
    return result;
}

// export async function getUserAction(specificId,userId){
//     const result = await get(`/data/donation?where=petId%3D%22${specificId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
//     return result;
// }