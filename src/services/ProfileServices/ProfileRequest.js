import http from '../UserService'

export const getProvinceDetail = () => http.get('/core/province/')
export const getCityDetail = (id) => http.get(`/core/city/?province=${id}`)
export const postProfileForm = (data, body) => http.post('user/profile/complete/', data, body)
export const postProfilePic = (data, body) => http.post('user/profile/image/', data, body)