import { useState} from "react";
import { useNavigate } from "react-router-dom"
import {Button, Form, Spinner, Table} from "react-bootstrap";
import {foodRecognition} from "../api/FoodAiApi";
import {uploadReview} from "../api/ReviewApi";



export default function UploadComponent() {

    const [flag, setFlag] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [foodNames, setFoodNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function LoadingComponent() {
        return isLoading ? (
            <>
                <Spinner animation="border" />
            </>
        ) : null;
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImageUrl(reader.result);
        };
    }
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        setIsLoading(true);
        foodRecognition(formData)
            .then(response => {
                setIsLoading(false);
                setFlag(true);
                setFoodNames(response.data);
                getBase64(data.food_image);
            })
    }

    function UploadImage() {
        if (!flag) {
            return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="m-3">
                        <Form.Label>음식 사진</Form.Label>
                        <Form.Control type="file" name="food_image" />
                    </Form.Group>
                    <Button type="submit">submit</Button>
                </Form>
            </div>
            )
        }
        else {
            return null;
        }
    }

    function UploadReview() {
        const [reviews, setReviews] = useState(() => {
            let initReviews = new Array(foodNames.length);
            for (let i=0;i<initReviews.length;i++) {
                initReviews[i]= {
                    "foodName" : foodNames[i]['foodName'],
                    "score" : 3,
                    "context" : ""
                }
            }
            return initReviews;
        });
        const [overall, setOverall] = useState({
            "restaurantId" : 0,
            "score" : 3,
            "context" : ""
        });

        function handleOverall(event) {
            if (event.target.id === "restaurantId") {
                overall["restaurantId"] = event.target.value;
                setOverall(overall);
            } else if (event.target.id === "score") {
                overall["score"] = event.target.value;
                setOverall(overall);
            } else if (event.target.id === "context") {
                overall["context"] = event.target.value;
                setOverall(overall);
            }
        }

        function handleReviews(event , idx) {

            const updatedFields = [...reviews];

            if (event.target.id === "foodName") {
                updatedFields[idx]["foodName"] = event.target.value;
            } else if (event.target.id === "score") {
                updatedFields[idx]["score"] = event.target.value;
            } else if (event.target.id === "context") {
                updatedFields[idx]["context"] = event.target.value;
            }
            setReviews(updatedFields);
        }

        function handleSubmit() {

            overall['detailReviews'] = reviews;
            overall['imageB64'] = imageUrl;
            console.log(overall);
            uploadReview(overall)
                .then(response => {
                    alert("업로드 성공!");
                    navigate('/home');
                })
                .catch(err => {
                    alert(err);
                })
        }

        if (flag) {
            return (
            <>
                <div>
                    <img src={imageUrl} width={300} height={300} className="m-3"/>
                </div>
                <Form>
                    <Table striped bordered hover variant="dark">
                        <tbody>
                            <tr >
                                <td >
                                    <Form.Group>
                                        <Form.Label>음식점 이름</Form.Label>
                                        <Form.Control id="restaurantId" type="text" onChange={handleOverall}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group>
                                        <Form.Label>평점</Form.Label>
                                        <Form.Range id="score" min={1} max={5} onChange={handleOverall}/>
                                    </Form.Group>
                                </td>
                                <td>
                                    <Form.Group>
                                        <Form.Label>평가</Form.Label>
                                        <Form.Control id="context" as="textarea" onChange={handleOverall}/>
                                    </Form.Group>
                                </td>
                            </tr>
                            {
                                foodNames.map(
                                    (foodData, index) => (
                                        <tr>
                                            <td>
                                                <Form.Group>
                                                    <Form.Label>음식</Form.Label>
                                                    <Form.Control id="foodName" onChange={(e) => handleReviews(e,index)} type="text" value={reviews[index]['foodName']} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group>
                                                    <Form.Label>평점</Form.Label>
                                                    <Form.Range id="score" onChange={(e) => handleReviews(e,index)} min={1} max={5} />
                                                </Form.Group>
                                            </td>
                                            <td>
                                                <Form.Group>
                                                    <Form.Label>평가</Form.Label>
                                                    <Form.Control id="context" onChange={(e) => handleReviews(e,index)} as="textarea" />
                                                </Form.Group>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                    <Button onClick={handleSubmit}>업로드</Button>
                </Form>
            </>
            );
        }
        else {
            return null;
        }
    }



    return (
        <div>
            <h2 className="text-center mb-4">리뷰 업로드</h2>
            <LoadingComponent />
            <UploadImage />
            <UploadReview />
        </div>
    );
}
