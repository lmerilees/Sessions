import React, { Component } from "react";
import "./Login.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";


  // style
  const styleHeader = {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'consolas',
    float: 'left',
  }

  const styleSignupBut = {
    fontSize: '10px',
    fontFamily: 'consolas'
  }

class Signup extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("signedup", 'false');
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

  // check if login info is valid and proceed to dashboard
  Signup = event => {
    let user_id = this.state.SignupParams.user_id;
    let user_password = this.state.SignupParams.user_password;
    fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id, user_password}),
      })
    .then(async response => {
      const data = await response.json();
      console.log(data);
      if (!response.ok) { // get error message or default reponse
        const err = (data && data.message) || response.status;
        return Promise.reject(err);
    }
    //if we return anything, we know the login info is correct
    if (data.rowCount != 0) {
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
      <Container fluid>
        {/* first row is our header */}
        <Row>
              <Col style={styleHeader} lg={10} md={10} sm={8}>
                Sessions
              </Col>

              <Col style={styleSignupBut} lg={2} md={2} sm={4}> 
                  <Button variant='primary' size="sm"  href={`/Login`}>
                    Log in
                  </Button>
              </Col>
        </Row>

        <Row> {/* This row is for spacing */} </Row>
                <div className="container">
                    <div className="styleBody">
                        <div className="styleMain">Sign up to start your session.</div>
                        <Row>
                            <Col lg={4}
                                md={2}
                                sm={1}></Col>
                            <Col lg={4}
                                md={4}
                                sm={4}>
                                <form onSubmit={
                                        this.Signup
                                    }
                                    className="form-signin">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" name="user_id"
                                                onChange={
                                                    this.handleFormChange
                                                }
                                                placeholder="Enter Username"/>
                                            <input type="password" name="user_password"
                                                onChange={
                                                    this.handleFormChange
                                                }
                                                placeholder="Enter Password"/>
                                            <input type="submit" value="Sign Up"/>
                                        </div>
                                    </div>
                                </form>

                            </Col>
                            <Col></Col>
                        </Row>

        </div>
      </div>
      
      <main role="main"> 
              <div className="main">
                <Switch>
                  <Route path={`/login`}>
                    <Signup/>
                  </Route>

                </Switch>
              </div>
            </main>  

      </Container>
    );
  }
}
export default Signup;