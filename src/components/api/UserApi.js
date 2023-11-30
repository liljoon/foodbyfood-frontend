import { apiClient } from "./ApiClient";

export function signIn(username, password) {
    return apiClient.post(`/user/signin`, {
        "username" : username,
        "password" : password
    });
}
