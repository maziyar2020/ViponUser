import http from '../UserService'

export const getStoreData = (id) => {
    return http.get(`user/wallet/${id}/`)
}


export const getStores = (url) => http.get(url)