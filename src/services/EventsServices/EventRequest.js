import http from '../UserService'

export const getBuyEventData = (id) => {
    return http.get(`user/transaction/${id}/`)
}

export const postUserStarRating = (id, data, header) => {
    return http.put(`user/transaction/${id}/`, data, header)
}