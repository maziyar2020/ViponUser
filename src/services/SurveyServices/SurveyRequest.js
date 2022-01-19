import http from '../UserService'

export const getSurveyDetail = (id) => http.get(`user/survey/${id}/`)

export const postUserVote = (id, data, option) => http.put(`user/survey/${id}/`, data, option)