import http from '../UserService'

export const postUserPhoneNumber = (data, config) => {
    return http.post('login/user/', data, config)
}

export const postUserConfirmCode = (data, config) => {
    return http.post('login/user/confirm/', data, config)
}

export const refreshToken = (data) => {
    return http.post('/login/refresh/', data)
}