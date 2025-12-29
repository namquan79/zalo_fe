// src/store/index.ts
import { createStore } from "vuex";

export type AnyObj = Record<string, any>;

export interface RootState {
    token: string;
    accessToken: string;
    user: AnyObj | null;
    permission: string[];
}

const store = createStore<RootState>({
    state: {
        token: "DEV",
        accessToken: "DEV",
        user: { role: "admin" },
        permission: ["admin"],
    },


    mutations: {
        setAccessToken(state, token: string) {
            const t = token || "";
            state.token = t;
            state.accessToken = t;
            if (t) localStorage.setItem("access_token", t);
            else localStorage.removeItem("access_token");
        },
        setUser(state, user: AnyObj | null) {
            state.user = user;
        },
        setPermission(state, p: string[]) {
            state.permission = Array.isArray(p) ? p : [];
        },
        clearAuth(state) {
            state.token = "";
            state.accessToken = "";
            state.user = null;
            localStorage.removeItem("access_token");
        },
        clearPermission(state) {
            state.permission = [];
        },
    },

    actions: {
        clearToken({ commit }) {
            commit("clearAuth");
        },
        clearPermission({ commit }) {
            commit("clearPermission");
        },
        setToken({ commit }, token: string) {
            commit("setAccessToken", token);
        },
    },
});

export default store;
