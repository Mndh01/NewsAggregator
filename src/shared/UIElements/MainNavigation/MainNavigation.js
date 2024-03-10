import React from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MainNavigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark">
      <Container fluid='lg'>
        <Navbar.Brand as={Link} to="">Blogly Aggregator</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="">Blogs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;