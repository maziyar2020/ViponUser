import http from '../UserService'

export const getBranchData = (id) => {
    return http.get(`user/branch/?user=${id}`)
}

export const getBranchRouteDate = (id) => {
    return http.get(`user/branch/${id}/`)
}