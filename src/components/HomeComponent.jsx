import { useNavigate } from "react-router-dom"
import {LogoutComponent} from "./user/LogoutComponent";
import {Button} from "react-bootstrap";

export default function HomeComponent() {
    const navigate = useNavigate();

    function handleUpload(event) {
        navigate('/upload');
    }

    function handleReview() {
        navigate('/restaurants')
    }

    return(
        <div>
            <h2 className="text-center mb-4">Home</h2>
            <div>
                <Button variant="info" className="m-3" onClick={handleUpload}>리뷰 업로드</Button>
            </div>
            <div>
                <Button variant="info" className="m-3" onClick={handleReview}>리뷰 조회</Button>
            </div>
            <div>
                <LogoutComponent />
            </div>
        </div>
    )
}
