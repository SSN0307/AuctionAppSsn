import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Store JWT token
        setIsAuthenticated(true); // ✅ Update authentication state
        navigate("/"); // ✅ Redirect to Home Page
      } else {
        setError(data.message || "⚠️ Invalid email or password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("⚠️ Server Error! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "30rem", padding: "20px" }} className="shadow">
        <Card.Body>
          <h2 className="text-center text-primary">
            <FaSignInAlt /> Login
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>📧 Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>🔑 Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">📜 Sign Up</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
