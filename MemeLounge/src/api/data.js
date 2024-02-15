import { clearUser, setUserData } from "../utility.js";
import { del, get, post, put } from "./api.js"

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    getAllDataInSistem: '/data/memes?sortBy=_createdOn%20desc',
    getSpecificDataWithId:'/data/memes/',
    addInSysten:'/data/memes'
}

export async function login(data) {
    const result = await post(endpoints.login, data);
    setUserData(result);
}

export async function register(data){
    const result = await post(endpoints.register, data);
    setUserData(result);
}

export async function logout(){
    get(endpoints.logout);
    clearUser()
}

export async function getAllDataInSystem(){
    const result = await get(endpoints.getAllDataInSistem);
    return result;
}

export async function getSpecificDataWithId(id){
    const result = await get(endpoints.getSpecificDataWithId +id);
    return result;
}

export async function onEdit(id,data){
    const result = await put(endpoints.getSpecificDataWithId + id,data);
    return result;
}

export async function addInSystem(data){
    const result = await post(endpoints.addInSysten,data);
    return result;
}

export async function onDelete(id){
    const result = await del(endpoints.getSpecificDataWithId + id);
    return result;
}

// export async function makeAction(specificId){
//     await post( {specificId})
// }

// export async function getTotalAction(specificId){
//     const result = await get(``);
//     return result;
// }

// export async function getUserAction(specificId,userId){
//     const result = await get(``);
//     return result;
// }

export async function getUserMemes(userId){
    const result = await get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}