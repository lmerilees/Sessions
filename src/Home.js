import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'

function Home() {
    const [users, setUsers] = useState(false);

    useEffect(() => {
        getUser();
    }, []);
    
    function getUser() {
        fetch('http://localhost:3001')
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(data => {
                console.log(data);
                setUsers(data);
            });
    }

    function createUser() {
        let name = prompt('Enter username');
        let email = prompt('Enter password');
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email}),
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

export default Home