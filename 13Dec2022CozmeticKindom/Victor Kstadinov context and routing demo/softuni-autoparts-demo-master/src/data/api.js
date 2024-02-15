export async function request(method,url,content){
   
    try {
        const option = {
            method,
            headers:{}
        }
    
        const userData = JSON.parse(localStorage.getItem('userData'))                       
    
        if(userData != null){
            option.headers['X-Authorization'] = userData.accessToken;
        }
    
        if(content != undefined){
           option.headers['Content-Type'] = 'application/json';
           option.body = JSON.stringify(content)
        }
        
        const res = await fetch(url,option);

        let result;

        if(res.status != 204){
            result = await res.json()
        }

        if(res.ok == false){
            if(res.status == 403){
                localStorage.removeItem('userData');           
            }
            const err = result;
            throw new Error(err.message)
        };

        const data = result;

        return data;

    } catch (error) {
        alert(error.message);
        throw error;
    }
};

export const get = request.bind(null,'get');
export const post = request.bind(null,'post');
