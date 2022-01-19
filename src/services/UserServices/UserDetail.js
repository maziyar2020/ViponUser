import http from "../UserService";

export const userData = () => http.get("/user/");

export const userEvents = () => http.get("core/notification/");

export const getShops = () => http.get("user/wallet/");

export const getAllEvents = (url) => http.get(url);

export const getCompleted = () => http.get("/user/profile/complete/");
export const postCompleted = (data, config) => http.post("/user/profile/complete/", data, config);