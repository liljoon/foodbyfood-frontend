import { BrowserRouter, Routes ,Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import HomeComponent from "./HomeComponent";
import UploadComponent from "./UploadComponent";
import ReviewsComponent from "./ReviewsComponent";
import RestaurantComponent from "./RestaurantComponent";

export default function FoodbyfoodComponent() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route path="/home" element={<HomeComponent/>} />
                    <Route path="/upload" element={<UploadComponent/>} />
                    <Route path="/reviews" element={<ReviewsComponent/>} />
                    <Route path="/restaurants" element={<RestaurantComponent />} />


                </Routes>
            </BrowserRouter>
        </div>
    );
}
