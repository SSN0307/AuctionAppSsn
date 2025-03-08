import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ cartCount }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Auction</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/auction">Live Auctions</Nav.Link>

            {/* Dropdown for Categories */}
            <NavDropdown title="Categories" id="categories-dropdown">
              <NavDropdown.Item as={Link} to="/category/antiques">Antiques</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/paintings">Paintings</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/vintage-cameras">Vintage Cameras</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/coins">Rare Coins</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/sculptures">Sculptures</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/watches">Luxury Watches</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/handbags">Designer Handbags</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/cars">Classic Cars</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/jewelry">Jewelry</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/electronics">Electronics</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/furniture">Furniture</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/toys">Vintage Toys</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/stamps">Rare Stamps</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/books">Antique Books</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/music">Music Memorabilia</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-side options */}
          <Nav>
            <NavDropdown title="Dashboard" id="dashboard-dropdown">
              <NavDropdown.Item as={Link} to="/buyer-dashboard">Buyer Dashboard</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/seller-dashboard">Seller Dashboard</NavDropdown.Item> {/* FIXED */}
            </NavDropdown>
            
            {/* Cart with Dynamic Count */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              🛒 Cart 
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavigationBar;
