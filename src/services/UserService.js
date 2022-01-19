import axios from "axios";
import router from "../router/index";

const getAccessToken = () => {
    return localStorage.getItem("userAccessToken");
};

const getRefreshToken = () => {
    return localStorage.getItem("userRefreshToken");
};

const setToken = (token) => {
    localStorage.setItem("userAccessToken", token.access);
};

const clearToken = () => {
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("userCompleted");
};

const apiClient = axios.create({
    baseURL: "https://api.vipon.ir/api/v1/",
    timeout: 0,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (Response) => Response,
    (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 && originalRequest.url === "login/refresh/") {
            clearToken();
            router.push({ name: "Login" });
            router.go()
            return Promise.reject(error);
        }

        if (error.response.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();
            return apiClient
                .post("login/refresh/", {
                    refresh: refreshToken,
                })
                .then((res) => {
                    if (res.status === 200) {
                        setToken(res.data);
                        apiClient.defaults.headers.common["Authorization"] =
                            "Bearer " + getAccessToken();
                        return apiClient(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default {
    get: apiClient.get,
    post: apiClient.post,
    put: apiClient.put,
    delete: apiClient.delete,
};