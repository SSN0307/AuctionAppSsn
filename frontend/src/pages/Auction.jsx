import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "../assets/styles/Auction.css";

const Auction = () => {
  const [cart, setCart] = useState([]);
  const [bidValues, setBidValues] = useState({});
  const [auctionItems, setAuctionItems] = useState([
    { id: 1, name: "Antique Clock", bid: 5500, img: "antique-clock.jpg" },
    { id: 2, name: "Vintage Camera", bid: 8200, img: "vintage-camera.jpg" },
    { id: 3, name: "Gold Necklace", bid: 15000, img: "gold-necklace.jpg" },
    { id: 4, name: "Painting", bid: 12000, img: "painting.jpg" },
    { id: 5, name: "Rare Coins Set", bid: 6800, img: "rare-coins.jpg" },
    { id: 6, name: "Handmade Sculpture", bid: 9700, img: "handmade-sculpture.jpg" },
    { id: 7, name: "Designer Handbag", bid: 11300, img: "designer-handbag.jpg" },
    { id: 8, name: "Luxury Watch", bid: 18000, img: "designer-handbag.jpg" },
    { id: 9, name: "Classic Car Model", bid: 25500, img: "classic-car.jpg" },
  ]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (item) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${item.name} added to cart!`);
    } else {
      alert("Item is already in the cart!");
    }
  };

  const handleBidChange = (id, value) => {
    setBidValues((prevBids) => ({ ...prevBids, [id]: value }));
  };

  const placeBid = (id) => {
    const newBid = bidValues[id];

    if (!newBid || isNaN(newBid) || newBid <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    setAuctionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bid: Math.max(item.bid, parseInt(newBid)) } : item
      )
    );

    alert("Bid placed successfully!");
  };

  return (
    <Container>
      <h2 className="auction-title text-center">LIVE AUCTIONS</h2>
      <Row className="auction-grid">
        {auctionItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card className="auction-card">
            <Card.Img
  variant="top"
  src={`/assets/images/${item.img}`}
  alt={item.name}
  className="auction-img"
/>

              <Card.Body className="text-center">
                <Card.Title className="auction-item-title">{item.name}</Card.Title>
                <Card.Text className="auction-item-price">Current Bid: ₹{item.bid}</Card.Text>

                {/* Input field for bidding */}
                <Form.Group className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Enter your bid"
                    value={bidValues[item.id] || ""}
                    onChange={(e) => handleBidChange(item.id, e.target.value)}
                  />
                </Form.Group>

                <Button variant="danger" className="place-bid" onClick={() => placeBid(item.id)}>
                  Place Bid
                </Button>

                <Button variant="success" className="add-to-cart" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Auction;
