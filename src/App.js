import './App.css';
//import React from 'react';
//import Layout from './components/Layout/Layout';
//import Home from './Home';
//import Login from './components/Login/Login';
//import Splash from './components/Splash/Splash';
import Login from "./Login";
import Signup from "./Signup";
import React, { Component } from "react";
//import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./Dashboard.css";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

//import {BrowserRouter, browserHistory, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {Container, Button, Row, Col, Nav, Navbar } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard/>
        </ProtectedRoute>
        <Route exact path='/'>
          <Redirect exact from="/" to="dashboard/Home"/>
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
