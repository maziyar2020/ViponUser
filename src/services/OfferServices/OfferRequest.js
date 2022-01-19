import http from '../UserService'

export const getOfferInfo = (id) => {
    return http.get(`user/offer/${id}/`)
}

export const getOfferPageDetail = (id) => {
    return http.get(`user/store/${id}/`)
}