import logo from './logo.svg';
import './App.css';
import React from 'react';
import Layout from './components/Layout/Layout';
import Home from './Home';
import Login from './components/Login/Login';
import Splash from './components/Splash/Splash';

import {BrowserRouter, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function App() {
  return (
    <Layout>
      <Splash/>
    </Layout>
  );
}

export default App;
