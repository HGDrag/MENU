import { Container, Row, Col } from "react-bootstrap";
import React from 'react'

const ProductsContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={10} className="d-flex flex-wrap offset-2 my-5">
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