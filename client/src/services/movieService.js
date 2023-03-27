import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/movies';

const request = requestFactory();

async function getAllMovies(){
    const result = await request.get(baseUrl);
    const movies = Object.values(result);
    return movies;
}

async function getById(id) {
    const result = await request.get(`${baseUrl}/${id}`);
    // console.log(result);
    return result;
}

async function create (data) {
    const result = await request.post(baseUrl, data);
    // console.log(result);
    return result;
}

async function addComment(movieId, data) {
    const result = await request.post(`${baseUrl}/${movieId}/comments`, data);
    return result;
}

export {
    getAllMovies,
    getById,
    create,
    addComment,
    
};