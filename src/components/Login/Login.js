import React from 'react'
import {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'

function Login() {
    const [users, setUsers] = useState(false);

    useEffect(() => {
        getUser();
    }, []);
    
    function getUser() {
        fetch('http://localhost:3001')
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
            <Row>
                <Col>
                    <Button onClick={createUser}>Add user</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {users ? users : 'There is no user data available'}
                </Col>
            </Row>
        </Container>
    );
}

export default Login