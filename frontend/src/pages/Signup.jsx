import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa"; // Signup Icon

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("⚠️ All fields are required!");
      return;
    }

    // Save user data (Temporary Storage)
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/login"); // Redirect to login
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "30rem", padding: "20px" }} className="shadow">
        <Card.Body>
          <h2 className="text-center text-primary">
            <FaUserPlus /> Sign Up
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>👤 Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>📧 Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>🔑 Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100">Sign Up</Button>
          </Form>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">🔑 Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
