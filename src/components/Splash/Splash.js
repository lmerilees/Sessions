import { Container, Row, Col, Button } from "react-bootstrap";
import React from 'react';

const styleHeader = {
    color: 'white',
    fontSize: '50px',
    padding: '10px',
    fontFamily: 'consolas',
}

const styleMain = {
    color: 'white',
    fontSize: '50px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
}

const Splash = (props) => (
    <Container fluid>
        <div style={styleHeader}>
            <Row>
                <Col>
                    Sessions                                               
                    
                </Col>
                <Col>
                    
                </Col>
                <Col>
                    
                </Col>
            </Row>
        </div>
        <Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Col>
                <div style={styleMain}>
                    Find your perfect skate session.
                </div>
            </Col>
        </Row>
    </Container>
);

export default Splash;