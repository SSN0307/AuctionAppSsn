import React from "react";
import { Container, Row, Col, Card, Table, ProgressBar } from "react-bootstrap";

const BuyerDashboard = () => {
  // Sample Data
  const purchases = [
    { id: 1, item: "Antique Vase", price: "₹5,000", status: "Delivered" },
    { id: 2, item: "Vintage Watch", price: "₹15,000", status: "Shipped" },
    { id: 3, item: "Classic Car Model", price: "₹30,000", status: "Processing" },
  ];

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Left Sidebar */}
        
        {/* Main Dashboard */}
        <Col md={9}>
          <Row>
            {/* Total Purchases */}
            <Col md={4}>
              <Card className="p-3 text-center">
                <h6>Total Purchases</h6>
                <h3>15</h3>
              </Card>
            </Col>
            
            {/* Active Bids */}
            <Col md={4}>
              <Card className="p-3 text-center">
                <h6>Active Bids</h6>
                <h3>5</h3>
              </Card>
            </Col>

            {/* Wallet Balance */}
            <Col md={4}>
              <Card className="p-3 text-center">
                <h6>Wallet Balance</h6>
                <h3>₹12,500</h3>
              </Card>
            </Col>
          </Row>

          {/* Recent Purchases Table */}
          <Card className="mt-4">
            <Card.Body>
              <h5>Recent Purchases</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.id}</td>
                      <td>{purchase.item}</td>
                      <td>{purchase.price}</td>
                      <td>{purchase.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Spending Progress */}
          <Card className="mt-4 p-3">
            <h5>Spending Progress</h5>
            <ProgressBar now={60} label="₹60,000 spent" />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerDashboard;
