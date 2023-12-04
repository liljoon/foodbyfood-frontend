import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {retrieveReviewsByRestaurantName} from "../api/ReviewApi";
import {Col, Container, Image, ListGroup, Row, Table} from "react-bootstrap";

export default function SearchRestaurantNameComponent() {

    const [searchParams] = useSearchParams();
    let query = "";
    const [reviews , setReviews] = useState([]);
    const [overallReview, setOverallReview] = useState({
        "restaurantName": "",
        "scoreAverage" : 0,
        "foodScores" : []
    });
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        query = queryParams.get('query');
        retrieveReviewsByRestaurantName(query)
            .then(response => {
                setReviews(response.data.reviewResponses);
                setOverallReview({
                    "restaurantName": response.data.restaurantName,
                    "scoreAverage" : response.data.scoreAverage,
                    "foodScores" : response.data.foodScores
                })
            })
            .catch(error => {
                console.log(error)
                setReviews([]);
            });
    }, [location.search]);

    return (
        <>
          <Container>
              <Row className="mb-3">
                  <Col>{ overallReview.restaurantName }</Col>
                  <Col>{ overallReview.scoreAverage }</Col>
              </Row>
              {
                  overallReview['foodScores'].map((food, index) => (
                        <Row className="mb-1">
                            <Col>{food.foodName}</Col>
                            <Col>{food.foodScoreAverage}</Col>
                        </Row>
                    )
                  )
              }
              {
                  reviews.map((review, index) => (
                      <Container key={index} className="my-5">
                          <Row className="mb-2">
                              <Image src={review.imageB64} thumbnail />
                              <Col>{ review.username }</Col>
                              <Col>{ review.score }</Col>
                              <Col>{ review.context }</Col>
                          </Row>
                          <Row>
                              <ListGroup>
                              {
                                  review.detailReviewResponseList.map((detailReview, index) => (
                                      <ListGroup.Item key={index}>
                                          <Row>
                                              <Col></Col>
                                          <Col>{ detailReview.foodName }</Col>
                                          <Col>{ detailReview.score }</Col>
                                          <Col>{ detailReview.context }</Col>
                                          </Row>
                                      </ListGroup.Item>
                                  ))
                              }
                              </ListGroup>
                          </Row>
                      </Container>
                    )
                  )
              }
          </Container>
        </>
    );
}