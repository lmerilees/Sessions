import React, { Component } from "react";
//import "./Signup.css";
import { Redirect } from "react-router-dom";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      SignupParams: {
        user_id: "",
        user_password: ""
      }
    };
  }

  
  handleFormChange = event => {
    let SignupParamsNew = { ...this.state.SignupParams };
    let val = event.target.value;
    SignupParamsNew[event.target.name] = val;
    this.setState({
      SignupParams: SignupParamsNew
    });
  };

  getUser = event => {
    fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            return data.text();
        });
}

// add new user to the database
Signup = event => {
    let userName = this.state.SignupParams.user_id;
    let password = this.state.SignupParams.user_password;
    console.log(userName, password);
    localStorage.setItem("token", "T");
            this.setState({
                islogged: true
            });

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
        
        
        event.preventDefault();
            //getUser();
            });
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.Signup} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Find your perfect skate session.</h1>
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
              <input type="submit" value="Signup" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Signup;