import { BrowserRouter, Routes ,Route } from "react-router-dom";
import SignInComponent from "./user/SignInComponent";
import HomeComponent from "./HomeComponent";
import UploadComponent from "./review/UploadComponent";
import ReviewsComponent from "./review/ReviewsComponent";
import RestaurantComponent from "./RestaurantComponent";
import { SignUpComponent } from "./user/SignUpComponent";
import SearchRestaurantNameComponent from "./review/SearchRestaurantNameComponent";
import SearchFoodNameComponent from "./review/SearchFoodNameComponent";

export default function FoodByFoodComponent() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<SignInComponent />} />
                    <Route path="/signup" element={<SignUpComponent />} />
                    <Route path="/home" element={<HomeComponent/>} />
                    <Route path="/upload" element={<UploadComponent/>} />
                    <Route path="/reviews" element={<ReviewsComponent/>}>
                        <Route path="restaurantName" element={<SearchRestaurantNameComponent />} />
                        <Route path="foodName" element={<SearchFoodNameComponent />} />
                    </Route>
                    <Route path="/restaurants" element={<RestaurantComponent />} />


                </Routes>
            </BrowserRouter>
        </div>
    );
}
