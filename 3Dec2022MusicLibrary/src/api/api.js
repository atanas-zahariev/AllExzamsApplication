const host = 'http://localhost:3030'

async function request(method, url, data) {
    const user = JSON.parse(localStorage.getItem('user'));

    const option = {
        method,
        headers: {}
    }

    if (user != null) {
        option.headers['X-Authorization'] = user.accessToken;
    }

    if (data != undefined) {
        option.headers['Content-Type'] = 'application/json'
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);

        let result;

        if(response.status != 204){
            result = response.json()
        }

        if(response.ok == false){
            if(response.status == 403){
                localStorage.removeItem('user');
            }

            const err = result;

            throw err;
        }

        return result;


    } catch (error) {

        alert(error.message);

        throw error
    }
}

export const get = request.bind(null,'get')
export const post = request.bind(null,'post')
export const put = request.bind(null,'put')
export const del = request.bind(null,'delete')