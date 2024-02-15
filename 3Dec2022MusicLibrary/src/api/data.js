import { del, get, post, put } from "./api.js";

export async function getAllAlbums() {
    const data = await get('/data/albums?sortBy=_createdOn%20desc')
    return data;
};

export async function onLogin(data) {
    const result = await post('/users/login', data);
    return result;
};

export async function onRegister(data) {
    const result = await post('/users/register', data);
    return result;
}



export async function addAlbum(data) {
    const result = await post('/data/albums', data);
    return result;
}

export async function getAlbumsDetails(id) {
    const result = await get('/data/albums/' + id);
    return result;
}

export async function onEdit(data, id) {
    const result = put('/data/albums/' + id, data)
    return result;
}

export async function onDelete(id) {
    const result = await del('/data/albums/' + id);
    return result
}

export async function addLike(albumId) {
    const result = post('/data/likes', albumId);
    return result;
}

export async function getTotalLikes(albumId) {
    const result = get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
    return result;
}

export async function getOwnLike(albumId, userId) {
    const result = get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

window.onDelete = onDelete;