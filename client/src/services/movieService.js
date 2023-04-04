import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/movies';

export const movieServiceFactory = (token) => {
    const request = requestFactory(token);

    async function getAllMovies() {
        const result = await request.get(baseUrl);
        const movies = Object.values(result);
        return movies;
    }

    async function getById(id) {
        const result = await request.get(`${baseUrl}/${id}`);
        return result;
    }

    async function create(data) {
        const result = await request.post(baseUrl, data);
        return result;
    }
    
    async function edit(id, data) {
        const result = await request.put(`${baseUrl}/${id}`, data);
        return result;
    }

    async function deleteMovie(id) {
        const result = request.delete(`${baseUrl}/${id}`);
        return result;
    }

    return {
        getAllMovies,
        getById,
        create,
        edit,
        deleteMovie,
    };

}
