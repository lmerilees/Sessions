import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap';

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
      <div className="container">
        <Row>
          <div class="styleHeader">
            Sessions
          </div>
        </Row>
        <Row>
          <Col>
            <div class="styleBody">
              <form onSubmit={this.login} className="form-signin">
                <div class="styleMain">Find your perfect skate session.</div>
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
          </Col>
        </Row>
      </div>
    );
  }
}
export default Login;