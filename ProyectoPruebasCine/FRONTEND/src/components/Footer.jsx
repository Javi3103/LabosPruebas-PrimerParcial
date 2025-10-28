import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 fixed-bottom">
      <Container>
        <Row className="py-4">
          <Col md={4}>
            <h5>Acerca de Nosotros</h5>
            <p>Somos una empresa dedicada a brindar la mejor experiencia cinematográfica.</p>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>Email: info@cinema.com</li>
              <li>Teléfono: +1 234 567 890</li>
              <li>Dirección: Calle Falsa 123, Ciudad, País</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Síguenos</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Facebook</a></li>
              <li><a href="#" className="text-white">Twitter</a></li>
              <li><a href="#" className="text-white">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>&copy; {new Date().getFullYear()} Cinema. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
