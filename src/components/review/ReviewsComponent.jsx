import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import SearchRestaurantNameComponent from "./SearchRestaurantNameComponent";

export default function ReviewsComponent() {

    const [restaurantName, setRestaurantName] = useState("");
    const [foodName, setFoodName] = useState("");
    const navigate = useNavigate();


    function handleRestaurantNameChange(e) {
        setRestaurantName(e.target.value);
    }

    function handleFoodNameChange(e) {
        setFoodName(e.target.value);
    }

    function handleSubmitRestaurantName(e) {
        navigate({
            pathname: './restaurantName',
            search:`?query=${restaurantName}`
        });
    }
    function handleSubmitFoodName(e) {
        navigate({
            pathname: './foodName',
            search:`?query=${foodName}`
        });
    }

    return (
        <div>
            <h2 className="text-center mb-4">리뷰 조회</h2>
            <Container>
                <Row className="align-items-center m-5">
                    <Col>
                        음식점
                    </Col>
                    <Col>
                        <Form.Control type="text" value={restaurantName} onChange={handleRestaurantNameChange}></Form.Control>
                    </Col>
                    <Col>
                        <Button type={"submit"} onClick={handleSubmitRestaurantName}>검색</Button>
                    </Col>
                </Row>
                <Row className="align-items-center m-5">
                    <Col>
                        음식
                    </Col>
                    <Col>
                        <Form.Control type="text" value={foodName} onChange={handleFoodNameChange}/>
                    </Col>
                    <Col>
                        <Button type={"submit"} onClick={handleSubmitFoodName}>검색</Button>
                    </Col>
                </Row>
            </Container>
            <Outlet />
        </div>
    );
}
