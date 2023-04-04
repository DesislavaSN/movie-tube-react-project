import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';
const request = requestFactory();

async function getAllReviews(movieId) {
    const searchQuery = encodeURIComponent(`movieId="${movieId}"`);
    const relationQuery = encodeURIComponent('author=_ownerId:users');
    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);

    const reviews = Object.values(result);
    return reviews;
};

async function createReview(id, data) {
    const result = await request.post(baseUrl, {id, data});
    return result;
};

export {
    getAllReviews,
    createReview,

};
