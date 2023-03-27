const request = async (method, token, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'Content-Type': 'Application/json',
            };

            options.body = JSON.stringify(data);
        }
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = (token) => {
    if (!token) {
        const serializedAuth = localStorage.getItem('auth');

        if (serializedAuth) {
            const auth = JSON.parse(serializedAuth);
            console.log('token:', auth.accessToken);
            token = auth.accessToken;
        }
    }

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        delete: request.bind(null, 'DELETE', token),
    };
};



// async function request (url, method, data ){
//     const options = {
//         method,
//         headers: {}
//     };

//     if (data !== undefined) {
//         options.headers['Content-Type'] = 'application/json';
//         options.body = JSON.stringify(data);
//     }

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.log('Error in request.js file >>>', error);
//     }
// }

// export async function get(url) {
//     return request(url, 'GET');
// }

// export async function post(url, data) {
//     return request(url, 'POST', data);
// }

// export async function put(url, data){
//     return request(url, 'PUT', data);
// }

// export async function del(url) {
//     return request(url, 'DELETE');
// }