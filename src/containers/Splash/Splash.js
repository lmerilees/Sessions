import React, { Component } from 'react';
import Background from '../../components/Background/Background'
import { Container, Row, Col } from 'react-bootstrap';
class Splash extends Component {
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
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Splash;