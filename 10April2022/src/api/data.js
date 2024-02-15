import { clearUser, setUserData } from "../utility.js";
import { del, get, post, put } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAllDataInSistem: '/data/posts?sortBy=_createdOn%20desc',
    getSpecificDataWithId: '/data/posts/',
    addInSysten: '/data/posts'
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

export async function getAllDonation(postId) {
    const result = await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
    return result;
}

export async function getUserDonation(postId, userId) {
    const result = await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

export async function makeDonation(postId){
    await post('/data/donations',{postId})
}

export async function getUserPost(userId){
    const result = await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

window.getAllDataInSystem = getAllDataInSystem;
window.makeDonation = makeDonation;
window.getAllDonation = getAllDonation;