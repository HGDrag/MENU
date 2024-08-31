import { Container, Row, Col } from "react-bootstrap"

const FormContainer = ({children}) => {
  return (
    <Container className="">
        <Row className="justify-content-md-center mt-5 my-5">
            <Col xs={12} md={6} className="card p-5 shadow-lg border-0">
                {children}
            </Col>
        </Row>

    </Container>
  )
}

export default FormContainer