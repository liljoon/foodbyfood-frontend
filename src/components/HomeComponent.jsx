import { useNavigate } from "react-router-dom"
import {LogoutComponent} from "./user/LogoutComponent";
import {Button, Container, Stack} from "react-bootstrap";

export default function HomeComponent() {
    const navigate = useNavigate();

    function handleUpload(event) {
        navigate('/upload');
    }

    function handleReview() {
        navigate('/reviews')
    }

    return(
        <div>
            <h2 className="text-center mb-4">Home</h2>
            <Stack>
                <Button variant="info" className="m-3" onClick={handleUpload}>리뷰 업로드</Button>
                <Button variant="info" className="m-3" onClick={handleReview}>리뷰 조회</Button>
                <LogoutComponent />
            </Stack>
        </div>
    )
}
