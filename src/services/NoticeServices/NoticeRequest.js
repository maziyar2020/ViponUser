import http from '../UserService'

export const getNoticeDetail = (id) => http.get(`user/notice/${id}/`)