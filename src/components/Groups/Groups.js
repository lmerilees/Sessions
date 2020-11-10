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

const Groups = (props) => (
    <Container fluid>
        <Row>
            <Col>
                <div style={styleMain}>
                    Groups
                </div>
            </Col>
        </Row>
    </Container>
);

export default Groups;