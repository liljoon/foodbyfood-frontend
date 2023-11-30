import { useNavigate } from "react-router-dom"

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
            <div>
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                <button onClick={handleReview}>Review</button>
            </div>
        </div>
    )
}
