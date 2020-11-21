import './App.css';

import Login from "./Login";
import Signup from "./Signup";
import React, { Component } from "react";
import "./Dashboard.css";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


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
