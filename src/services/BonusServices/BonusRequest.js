import http from '../UserService'

export const getBonusData = (id) => {
    return http.get(`/user/bonus/${id}/`)
}