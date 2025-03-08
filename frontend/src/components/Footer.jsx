import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <Container>
        <Row>
          <Col className="text-center">
            &copy; {new Date().getFullYear()} AuctionApp | All Rights Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

