import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const ReviewsContainer = ({children}) => {
    return (
        <Container  >
            <Row>
                <Col xs={12} className="d-flex flex-wrap justify-content-around">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default ReviewsContainer