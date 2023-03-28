const request = async (method, url, data) => {
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

    const serializedAuth = localStorage.getItem('auth');
    if (serializedAuth) {
        const auth = JSON.parse(serializedAuth);
        const token = auth.accessToken;
        console.log('requester.js - token:', token);

        if (token) {
            options.headers = {
                ...options.headers,
                'X-Authorization': token,
            };
        } 
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

export const requestFactory = () => {
    return {
        get: request.bind(null, 'GET'),
        post: request.bind(null, 'POST'),
        put: request.bind(null, 'PUT'),
        delete: request.bind(null, 'DELETE'),
    };
};

