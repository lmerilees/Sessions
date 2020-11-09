import React from 'react'
import {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form, FormControl, FormGroup } from 'react-bootstrap'

function Login() {
    const [users, setUsers] = useState(false);

    useEffect(() => {
        getUser();
    }, []);
    
    function getUser() {
        fetch('http://localhost:3001/')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setUsers(data);
            });
    }

    function createUser() {
        let userName = prompt('Enter username');
        let password = prompt('Enter password');
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName, password}),
          })
            .then(response => {
              return response.text();
            })
            .then(data => {
              alert(data);
              getUser();
            });
        
    }





    return (
        <Container>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Row>
                <Col>
                    <Button onClick={createUser}>Add user</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login