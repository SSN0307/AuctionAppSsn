import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Table } from "react-bootstrap";

const SellerDashboard = () => {
  const [auctions, setAuctions] = useState([
    { id: 1, name: "Antique Clock", bid: 5500, img: "antique-clock.jpg" },
    { id: 2, name: "Vintage Camera", bid: 8200, img: "vintage-camera.jpg" },
  ]);

  const [newAuction, setNewAuction] = useState({
    name: "",
    bid: "",
    img: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setNewAuction({ ...newAuction, [e.target.name]: e.target.value });
  };

  // Add New Auction
  const addAuction = () => {
    if (!newAuction.name || !newAuction.bid || !newAuction.img) {
      alert("Please fill all fields.");
      return;
    }

    setAuctions([
      ...auctions,
      { id: auctions.length + 1, ...newAuction, bid: parseInt(newAuction.bid) },
    ]);

    setNewAuction({ name: "", bid: "", img: "" });
  };

  // Delete Auction
  const deleteAuction = (id) => {
    setAuctions(auctions.filter((auction) => auction.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Seller Dashboard</h2>

      {/* Seller Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h5>Total Auctions</h5>
            <p className="fs-4 fw-bold">{auctions.length}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h5>Active Listings</h5>
            <p className="fs-4 fw-bold">{auctions.length}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <h5>Total Earnings</h5>
            <p className="fs-4 fw-bold">₹50,000</p>
          </Card>
        </Col>
      </Row>

      {/* Add New Auction */}
      <Card className="mb-4 p-3 shadow-sm">
        <h4>Add New Auction</h4>
        <Row>
          <Col md={4}>
            <Form.Control
              type="text"
              name="name"
              placeholder="Item Name"
              value={newAuction.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              name="bid"
              placeholder="Starting Bid (₹)"
              value={newAuction.bid}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              name="img"
              placeholder="Image Filename (e.g. item.jpg)"
              value={newAuction.img}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Button variant="success" onClick={addAuction}>
              Add Item
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Seller's Auctions */}
      <Card className="shadow-sm p-3">
        <h4>My Auctions</h4>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item</th>
              <th>Current Bid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`/assets/images/${item.img}`}
                    alt={item.name}
                    style={{ width: "50px", borderRadius: "5px" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>₹{item.bid}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deleteAuction(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default SellerDashboard;
