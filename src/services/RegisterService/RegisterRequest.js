import http from '../UserService'

export const getRegisterData = (id) => {
    return http.get(`core/notification/${id}/`)
}