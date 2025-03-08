import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart data from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Container>
      <h2 className="text-center my-4">Your Cart</h2>
      {cart.length === 0 ? (
        <h4 className="text-center">Your cart is empty.</h4>
      ) : (
        <Row>
          {cart.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.img || "https://via.placeholder.com/300"} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Bid Price: ₹{item.bid}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Cart;
