import { apiClient } from "./ApiClient";

export function uploadReview(data) {
    return apiClient.post(`/reviews`, data);
}

export function retrieveReviewsByRestaurantName(restaurantName) {
    return apiClient.get(`/reviews/${restaurantName}`);
}

export function retrieveReviewsByFoodName(foodName) {
    return apiClient.get(`/reviews`, {
        params : {
            foodName : foodName
        }
    })
}