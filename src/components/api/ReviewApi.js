import { apiClient } from "./ApiClient";

export function uploadReview(data) {
    return apiClient.post(`/reviews`, data);
}