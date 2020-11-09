import React from 'react';
import { Nav, Navbar, NavLink, Row, Col, Container, Button } from 'react-bootstrap';

const styleHeader = {
    color: 'white',
    fontSize: '50px',
    padding: '10px',
    fontFamily: 'consolas',
}

const Header = (props) => (
    <Container fluid>
        <div style={styleHeader}>
        
            <Navbar bg="dark" variant="dark" expand="sm" >
                            <Navbar.Brand>Weatherboi</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link as={NavLink} to="/login">Sign Up</Nav.Link>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                </Nav>
                                <input
                                    type="text"
                                    value="Search"
                                />
                            </Navbar.Collapse>
                        </Navbar>

        </div>
    </Container>
);

export default Header;
