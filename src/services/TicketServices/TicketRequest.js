import http from '../UserService'

export const getTickets = () => http.get('user/ticket/?limit=10&offset=0')

export const getTicketDetail = (id) => http.get(`user/ticket/${id}/`)

export const getTicketMessages = (query) => http.get(`user/ticketItem/${query}`)

export const postMessage = (id, data, config) => http.put(`user/ticket/${id}/`, data, config)