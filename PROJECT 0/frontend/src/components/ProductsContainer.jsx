import { Container, Row, Col } from "react-bootstrap";
import React from 'react'

const ProductsContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-center mt-5 myCards">
        <Col xs={12} className="p-5 d-flex flex-wrap">
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductsContainer




// const FormContainer = ({children}) => {
//   return (
//     <Container>
//         <Row className="justify-content-md-center mt-5">
//             <Col xs={12} md={6} className="card p-5">
//                 {children}
//             </Col>
//         </Row>

//     </Container>
//   )
// }

// export default FormContainer