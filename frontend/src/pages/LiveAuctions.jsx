import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Offcanvas } from "react-bootstrap";
import axios from "axios"; // Import Axios for API calls
import "../assets/styles/Auction.css";

const socket = new WebSocket("ws://localhost:5000"); // WebSocket Server Connection

const LiveAuctions = () => {
  const [bidValues, setBidValues] = useState({});
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [auctionItems, setAuctionItems] = useState([
    { id: 1, name: "Antique Clock", bid: 5500, img: "antique-clock.jpg" },
    { id: 2, name: "Vintage Camera", bid: 8200, img: "vintage-camera.jpg" },
    { id: 3, name: "Gold Necklace", bid: 15000, img: "gold-necklace.jpg" },
    { id: 4, name: "Painting", bid: 12000, img: "painting.jpg" },
    { id: 5, name: "Rare Coins Set", bid: 6800, img: "rare-coins.jpg" },
    { id: 6, name: "Handmade Sculpture", bid: 9700, img: "handmade-sculpture.jpg" },
    { id: 7, name: "Designer Handbag", bid: 11300, img: "designer-handbag.jpg" },
    { id: 8, name: "Luxury Watch", bid: 18000, img: "lux-watch.jpg" },
    { id: 9, name: "Classic Car Model", bid: 25500, img: "classic-car.jpg" },
  ]);

  // 🟢 Connect WebSocket & Listen for Bid Updates
  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "UPDATE_BID") {
        setAuctionItems((prevItems) =>
          prevItems.map((item) =>
            item.id === data.id ? { ...item, bid: data.bid } : item
          )
        );
      }
    };
  }, []);

  // ✅ Handle Bid Input Change
  const handleBidChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue > 0) {
      setBidValues((prevBids) => ({ ...prevBids, [id]: parsedValue }));
    }
  };

  // ✅ Place Bid Function
  const placeBid = (id) => {
    const newBid = bidValues[id];

    if (!newBid || isNaN(newBid) || newBid <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const currentBid = auctionItems.find((item) => item.id === id).bid;
    if (newBid <= currentBid) {
      alert("Your bid must be higher than the current bid.");
      return;
    }

    // Send Bid to WebSocket Server
    socket.send(JSON.stringify({ type: "BID", id, bid: newBid }));

    setBidValues((prev) => ({ ...prev, [id]: "" }));
    alert("Bid placed successfully!");
  };

  // ✅ Add item to Cart
  const addToCart = (item) => {
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart([...cart, item]);
      alert(`${item.name} added to cart!`);
    } else {
      alert(`${item.name} is already in the cart.`);
    }
  };

  // ✅ Remove item from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ Handle Payment (Razorpay Integration)
  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.bid, 0);

      const response = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: totalAmount,
        currency: "INR",
      });

      const { order } = response.data;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Auction App",
        description: "Secure Transaction",
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await axios.post("http://localhost:5000/api/payments/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            alert("Payment Successful! Thank you for your purchase.");
            setCart([]); // Clear cart after successful payment
          } else {
            alert("Payment Verification Failed!");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Container>
      <h2 className="auction-title text-center my-4">LIVE AUCTIONS</h2>

      {/* 🛒 View Cart Button */}
      <Button variant="primary" className="mb-3" onClick={() => setShowCart(true)}>
        🛒 View Cart ({cart.length})
      </Button>

      <Row className="g-4">
        {auctionItems.map((item) => (
          <Col md={4} key={item.id}>
            <Card className="auction-card text-center shadow-sm">
              <Card.Img
                variant="top"
                src={`/assets/images/${item.img}`}
                alt={item.name}
                style={{ height: "150px", objectFit: "cover", borderRadius: "10px" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text className="text-muted">Current Bid: ₹{item.bid}</Card.Text>

                <Form.Group className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Enter your bid"
                    value={bidValues[item.id] || ""}
                    onChange={(e) => handleBidChange(item.id, e.target.value)}
                    min="1"
                  />
                </Form.Group>

                <Button variant="danger" className="place-bid w-100 mb-2" onClick={() => placeBid(item.id)}>
                  Place Bid
                </Button>

                {/* 🛍️ Add to Cart Button */}
                <Button variant="success" className="add-to-cart w-100" onClick={() => addToCart(item)}>
                  🛒 Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🛒 Cart Sidebar */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-unstyled">
                {cart.map((item) => (
                  <li key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <strong>{item.name}</strong> <br />
                      ₹{item.bid}
                    </div>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <Button variant="primary" className="w-100" onClick={handlePayment}>
                💳 Proceed to Payment
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default LiveAuctions;
