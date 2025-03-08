import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/styles/Categories.css";

// Sample Data (Replace with API call if needed)
const auctionItems = [
  { id: 1, name: "Antique Clock", bid: 5500, img: "antique-clock.jpg", category: "antiques" },
  { id: 2, name: "Vintage Camera", bid: 8200, img: "vintage-camera.jpg", category: "antiques" },
  { id: 3, name: "Gold Necklace", bid: 15000, img: "gold-necklace.jpg", category: "jewelry" },
  { id: 4, name: "Painting", bid: 12000, img: "painting.jpg", category: "art" },
  { id: 5, name: "Rare Coins Set", bid: 6800, img: "rare-coins.jpg", category: "collectibles" },
  { id: 6, name: "Luxury Watch", bid: 18000, img: "luxury-watch.jpg", category: "watches" },
  { id: 7, name: "Classic Car Model", bid: 25500, img: "classic-car.jpg", category: "vintage cars" },
];

const Categories = () => {
  const { categoryName } = useParams(); // Get category from URL

  // Filter items based on selected category
  const filteredItems = auctionItems.filter(
    (item) => item.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <Container>
      <h2 className="text-center">{categoryName.toUpperCase()} ITEMS</h2>
      <Row>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card className="auction-card">
                <Card.Img
                  variant="top"
                  src={`/assets/images/${item.img}`}
                  alt={item.name}
                  className="auction-img"
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Current Bid: ₹{item.bid}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No items available in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default Categories;
