import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {retrieveReviewsByFoodName} from "../api/ReviewApi";
import {Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";

export default function SearchFoodNameComponent() {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [reviewsGroupByRestaurant, setReviewsGroupByRestaurant] = useState([]);
    const [foodName, setFoodName] = useState("");

    let query = "";
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        query = queryParams.get('query');
        setFoodName(query);
        retrieveReviewsByFoodName(query)
            .then(response => {
                setReviewsGroupByRestaurant(response.data);
            })
            .catch(err => {
                setReviewsGroupByRestaurant([]);
                console.log(err);
            })
    }, [location.search]);

    return (
        <>
            <Container>
                <h3>{ foodName }</h3>
                {
                    reviewsGroupByRestaurant.map((data, index) => (
                        <Container key={index} className="my-5">
                            <Row className="mb-2">
                                <Col>{ data.restaurantName }</Col>
                                <Col>{ data.foodScoreAverage}</Col>
                            </Row>
                            <ListGroup>
                                {
                                    data.detailReviewResponseList.map((detailReview,index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col>
                                                    <Image src={detailReview.imageB64} thumbnail fluid style={{width:"300px"}} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>{ detailReview.username }</Col>
                                                <Col>{ detailReview.score }</Col>
                                                <Col>{ detailReview.context }</Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        </Container>
                    ))
                }

            </Container>
        </>
    );
}