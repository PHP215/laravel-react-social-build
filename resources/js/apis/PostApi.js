import Http, { requestCookie } from '@utils/Http'

export const fetchFeed = async(page = 1) => {
    await requestCookie()
    return Http.get('/posts', {
        params: { page }
    })
}

export const fetchPost = async(post_id) => {
    await requestCookie()
    return Http.get(`/posts/${post_id}`);
}

export const createPost = async(content) => {
    await requestCookie()
    return Http.post('/posts', {content})
}

export const likePost = async(post_id) => {
    await requestCookie()
    return Http.post(`/posts/${post_id}/like`);
}

export const unLikePost = async(post_id) => {
    await requestCookie()
    return Http.post(`/posts/${post_id}/unlike`);
}

export default {
    fetchFeed,
    createPost
}