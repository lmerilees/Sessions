import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="light">Login</Button>
                        <Button variant="light">Sign Up</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Header;