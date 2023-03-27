import { get, post } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

async function getAllComments(gameId) {
    const query = encodeURIComponent(`gameId="${gameId}"`);
    const result = await get(`${baseUrl}?where=${query}`);
    const comments = Object.values(result);
    console.log(comments);
    return comments;
};

async function createComment(data) {
    const result = await post(baseUrl, data);
    console.log(result);
    return result;
};

export {
    getAllComments,
    createComment,

};