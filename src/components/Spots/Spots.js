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

const Spots = (props) => (
    <Container>
        <Row>
            <Col>
                <div style={styleMain}>
                    Spot List
                </div>
            </Col>
            <Col>
            <div style={styleMain}>
                    Add a new spot
                </div>
            </Col>
        </Row>
    </Container>
);

export default Spots;