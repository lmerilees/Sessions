import React, {Component} from "react";
import "./Login.css";
import {Switch, Route, Redirect} from "react-router-dom";
import {Row, Col, Container, Button} from 'react-bootstrap';
import Signup from "./Signup";


// style
const styleHeader = {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'consolas',
    float: 'left'
}

const styleSignupBut = {
    fontSize: '10px',
    fontFamily: 'consolas'
}

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
        this.setState({islogout: true});
    };

    handleFormChange = event => {
        let loginParamsNew = {
            ...this.state.loginParams
        };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({loginParams: loginParamsNew});
    };

    login = event => {
        let user_id = this.state.loginParams.user_id;
        let user_password = this.state.loginParams.user_password;

        fetch('http://localhost:3001/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {user_id, user_password}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }
            if (data.rowCount != 0) {
                localStorage.setItem("token", "T");
                localStorage.setItem("user", user_id)
                this.setState({islogged: true});
                event.preventDefault();
            } else {
                console.log("Username or Password are incorrect");
            }
        }).catch(err => {
            console.error("an error occured", err);
        });
        event.preventDefault();
    };

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to="/"/>;
        }
        const {match} = this.props;
        return (
            <Container fluid>

                {/* first row is our header */}
                <Row>
                    <Col style={styleHeader}
                        lg={10}
                        md={10}
                        sm={8}>
                        Sessions
                    </Col>

                    <Col style={styleSignupBut}
                        lg={2}
                        md={2}
                        sm={4}>
                        <Button variant='primary' size="sm"
                            onClick={
                                this.signUp
                            }
                            href={`/Signup`}>
                            Sign Up
                        </Button>
                    </Col>
                </Row>

                <Row> {/* This row is for spacing */} </Row>
                <div className="container">
                    <div className="styleBody">
                        <div className="styleMain">Find your perfect skate session.</div>
                        <Row>
                            <Col lg={4}
                                md={2}
                                sm={1}></Col>
                            <Col lg={4}
                                md={4}
                                sm={4}>
                                <form onSubmit={
                                        this.login
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
                                            <input type="submit" value="Login"/>
                                        </div>
                                    </div>
                                </form>

                            </Col>
                            <Col lg={4}
                                md={2}
                                sm={1}></Col>
                        </Row>

                    </div>
                </div>


                <main role="main">
                    <div className="main">
                        <Switch>
                            <Route path={`/signup`}>
                                <Signup/>
                            </Route>

                        </Switch>
                    </div>
                </main>

            </Container>
        );
    }
}
export default Login;
