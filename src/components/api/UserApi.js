import { apiClient } from "./ApiClient";

export function signIn(username, password) {
    return apiClient.post(`/user/signin`, {
        "username" : username,
        "password" : password
    });
}

export function signUp(username, password) {
    return apiClient.post(`/user/signup`, {
        "username" : username,
        "password" : password
    });
}

export function logout() {
    return apiClient.get(`/user/logout`);
}
