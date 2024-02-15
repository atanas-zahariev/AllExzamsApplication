import { clearUser, setUserData } from "../utility.js";
import { del, get, post, put } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAllDataInSistem: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    getSpecificDataWithId: '/data/pets/',
    addInSysten: '/data/pets',
    makeDonation: '/data/donation'
}

export async function login(data) {
    const result = await post(endpoints.login, data);
    setUserData(result);
};

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

export async function makeDonation(petId){
    await post(endpoints.makeDonation, {petId})
}

export async function getTotalDonation(petId){
    const result = await get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    return result;
}

export async function getUserDonation(petId,userId){
    const result = await get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

window.getAllDataInSistem = getAllDataInSystem;