import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaGavel, FaShoppingCart, FaUserCheck } from "react-icons/fa";
import "../assets/styles/home.css";

// Sample auction items
const auctionItems = [
  { id: 1, name: "Antique Clock", bid: 5500, img: "antique-clock.jpg" },
  { id: 2, name: "Vintage Camera", bid: 8200, img: "vintage-camera.jpg" },
  { id: 3, name: "Gold Necklace", bid: 15000, img: "gold-necklace.jpg" },
];

// Time Capsule Auction Items with expiration times
const timeCapsuleItems = [
  { id: 4, name: "Signed Vintage Poster", bid: 20000, img: "vintage-poster.jpg", expiresAt: Date.now() + 86400000 }, // 24 hours
  { id: 5, name: "Rare Coin Collection", bid: 12000, img: "rare-coins.jpg", expiresAt: Date.now() + 43200000 }, // 12 hours
  { id: 6, name: "Limited Edition Watch", bid: 35000, img: "limited-watch.jpg", expiresAt: Date.now() + 21600000 }, // 6 hours
];

const Home = () => {
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      timeCapsuleItems.forEach((item) => {
        const timeLeft = item.expiresAt - Date.now();
        newTimers[item.id] = timeLeft > 0 ? formatTime(timeLeft) : "Expired";
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format countdown time
  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center text-white">
        <h1>Welcome to the Online Auction Platform</h1>
        <p>Bid, Buy, and Sell Unique Items with Confidence!</p>
        <div className="hero-buttons">
          <Button as={Link} to="/LiveAuctions" variant="light">
            Browse Auctions <FaGavel />
          </Button>
          <Button as={Link} to="/Signup" variant="light">
            Join Now <FaUserCheck />
          </Button>
        </div>
      </section>

      {/* Time Capsule Auctions Section */}
      <section className="time-capsule-section text-center">
        <h2>⏳ Time Capsule Auctions – Limited-Edition Finds! ⏳</h2>
        <p>Exclusive ultra-rare items available for only 24 hours!</p>
        <Row className="justify-content-center">
          {timeCapsuleItems.map((item) => (
            <Col key={item.id} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
              <Card className="time-capsule-card glow-animation shadow-lg p-3 rounded" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`/images/${item.img}`}
                  alt={item.name}
                  style={{ height: "180px", objectFit: "cover", borderRadius: "10px" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Current Bid: ₹{item.bid}</Card.Text>
                  <Card.Text className="countdown-timer">
                    ⏳ Time Left: <strong>{timers[item.id]}</strong>
                  </Card.Text>
                  <Button as={Link} to="/auction" variant="danger" disabled={timers[item.id] === "Expired"}>
                    {timers[item.id] === "Expired" ? "Auction Closed" : <>Bid Now <FaGavel /></>}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Live Auctions Section */}
      <section className="live-auctions-section">
        <h2 className="text-center">Live Auctions</h2>
        <Row className="justify-content-center">
          {auctionItems.map((item) => (
            <Col key={item.id} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
              <Card className="auction-card shadow-lg p-3 rounded" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`/images/${item.img}`}
                  alt={item.name}
                  style={{ height: "180px", objectFit: "cover", borderRadius: "10px" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Current Bid: ₹{item.bid}</Card.Text>
                  <Button as={Link} to="/auction" variant="success">
                    Bid Now <FaGavel />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;
