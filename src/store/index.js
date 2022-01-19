import { createStore } from "vuex";
import router from "../router/index";
let nextId = 1;

const store = createStore({
    state: {
        refreshToken: localStorage.getItem("userRefreshToken"),
        accessToken: localStorage.getItem("userAccessToken"),
        isAuthenticated: localStorage.getItem("userCompleted"),
        // notification List
        notifications: [],
    },
    mutations: {
        SET_AUTH: (state, completed) => {
            localStorage.setItem("userCompleted", completed);
            state.isAuthenticated = completed;
        },
        SET_REFRESH_TOKEN: (state, refresh) => {
            state.refreshToken = refresh;
            localStorage.setItem("userRefreshToken", refresh);
        },
        SET_ACCESS_TOKEN: (state, access) => {
            state.accessToken = access;
            localStorage.setItem("userAccessToken", access);
        },
        // delete all auth and user information from the state
        CLEAR_USER_DATA: (state) => {
            state.refreshToken = "";
            state.accessToken = "";
            state.isAuthenticated = false;
            localStorage.removeItem("userAccessToken");
            localStorage.removeItem("userRefreshToken");
            localStorage.removeItem("userCompleted");
            router.push({ name: "Login" });
            router.go();
        },
        // notifications
        PUSH_NOTIFICATION(state, notification) {
            state.notifications.push({
                ...notification,
                id: nextId++,
            });
        },
        DELETE_NOTIFICATION(state, notificationToRemove) {
            state.notifications = state.notifications.filter((notification) => {
                return notification.id !== notificationToRemove.id;
            })
        },
    },
    actions: {
        logIn: async({ commit }, payLoad) => {
            commit("SET_REFRESH_TOKEN", payLoad.data.refresh);
            commit("SET_ACCESS_TOKEN", payLoad.data.access);
            commit("SET_AUTH", payLoad.data.completed);
            // redirect to the home page
            if (payLoad.data.completed == true) {
                router.push({ name: "Home" });
            } else {
                router.push({ name: "SignUp" });
            }
        },
        refreshToken: async({ commit }, data) => {
            commit("SET_ACCESS_TOKEN", data);
        },
        clearUser: ({ commit }) => {
            commit("CLEAR_USER_DATA");
        },
        signedUp: ({ commit }, data) => {
            commit("SET_AUTH", data);
        },
        // notifications
        addNotification({ commit }, notification) {
            commit("PUSH_NOTIFICATION", notification);
        },
        removeNotification({ commit }, notificationToRemove) {
            commit("DELETE_NOTIFICATION", notificationToRemove);
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        accessToken: (state) => state.accessToken,
        refreshToken: (state) => state.refreshToken,
        notificationLength: (state) => state.notifications.length,
    },
});

export default store;