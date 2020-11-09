import React from 'react'
import {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Splash from './components/Splash/Splash';

import {BrowserRouter, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function Home() {
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
        <div>
            Sessions
        </div>
    );
}

export default Home