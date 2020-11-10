import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import {Row, Col, Container, Button} from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        user_id: "",
        user_password: ""
      }
    };
  }
  
  signUp = () => {
     localStorage.removeItem("token");
     this.setState({
       islogout: true
     });
    console.log("signup");
  };

  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  login = event => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    
    fetch('http://localhost:3001/getUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, user_password}),
      })
    .then(async response => {
      const data = await response.json();
      if (!response.ok) { // get error message or default reponse
        const err = (data && data.message) || response.status;
        return Promise.reject(err);
    }
    if(data.rowCount != 0){
          localStorage.setItem("token", "T");
          localStorage.setItem("user", user_id)
            this.setState({
              islogged: true
            });
        event.preventDefault();
      }
    else{
      console.log("Username or Password are incorrect");
    }
    }).catch(err => {
      console.error("an error occured", err);
    });
    event.preventDefault();
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="styleHeader">
          Sessions
          <div className="push-right">
          <Button variant="light" onClick={this.signUp}>Sign Up</Button>
          </div>
        </div>
        <div className="container">
            <div className="styleBody">
            <div className="styleMain">Find your perfect skate session.</div>
              <form onSubmit={this.login} className="form-signin">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="user_id"
                      onChange={this.handleFormChange}
                      placeholder="Enter Username"
                    />
                    <input
                      type="password"
                      name="user_password"
                      onChange={this.handleFormChange}
                      placeholder="Enter Password"
                    />
                    <input type="submit" value="Login" />
                  </div>
                </div>
              </form>
            </div>
        
      </div>
      </div>
    );
  }
}
export default Login;