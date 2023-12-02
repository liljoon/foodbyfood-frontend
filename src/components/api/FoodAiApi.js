import {apiClientAi} from "./ApiClient";

export function foodRecognition(formData) {
    return apiClientAi.post('/food_recognition', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}