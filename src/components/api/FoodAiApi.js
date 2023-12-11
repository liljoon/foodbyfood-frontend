import {apiClientAi, apiClientSegmentation} from "./ApiClient";
import axios from "axios";

export function foodRecognition(formData) {
    return apiClientAi.post('/food_recognition', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}

export function foodSegmentation(data) {
    return apiClientSegmentation.post('/food_segmentation' , data);
}