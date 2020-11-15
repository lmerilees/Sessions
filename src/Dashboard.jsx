import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Container, Row, Col, Button} from 'react-bootstrap';
import "./Dashboard.css";
import Profile from "./components/Profile/Profile";
import Spots from "./components/Spots/Spots.js";
import Home from "./components/Home/Home.js";
import Map from "./components/Map/Map";
import Groups from "./components/Groups/Groups";
import { bubble as Menu } from 'react-burger-menu';



  // style
  const styleHeader = {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'consolas',
    paddingLeft: '15px',
    float: 'left',
  }
  
  const styleRep = {
    color: 'white',
    fontSize: '15px',
    fontFamily: 'consolas',
    float: 'right',
    color: 'yellow',
  }

  const styleProfileBut = {
    fontSize: '10px',
    font: 'consolas'
  }

  const styleSignoutBut = {
    fontSize: '10px',
    fontFamily: 'consolas'
  }

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      sessionUser: localStorage.getItem('user'),
      userRep: null,
    };
  }  

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };

  getUserRep = event => {
    let user_id = this.state.sessionUser;
      fetch('http://localhost:3001/getProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: user_id}),
        })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) { // get error message or default reponse
          const err = (data && data.message) || response.status;
          return Promise.reject(err);
      }

      // update our states
      this.setState({
        userRep: data.rows[0].reputation
      })
      
      //this.setState.spotList.push(data);
      }).catch(err => {
        console.error("an error occured", err);
      });
    }

  componentDidMount() {
    this.getUserRep();
  }

  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <Container fluid>
        {/* first row is our header */}
        <Row>
              <Col style={styleHeader} lg={6} md={6} sm={6}>
                Sessions
              </Col>
              <Col style={styleRep} lg={2} md={1} sm={1}>
                Rep: {this.state.userRep}
              </Col>
              <Col lg={2} md={2} sm={2} style={styleProfileBut}>
                  <Button variant='primary' href={`${match.path}/Profile`}>
                    {this.state.sessionUser}
                  </Button>
              </Col>
              <Col style={styleSignoutBut} lg={2} md={2} sm={2}> 
                  <Button variant='primary'  size="sm" onClick={this.signOut}>
                    Sign Out
                  </Button>
              </Col>
        </Row>
            
            
        {/* second row is our main/body */}
        <Row>
          <Col>

            <Menu width={"200px"}>
              <a id="home" className="menu-item" href={`${match.path}/Home`}>Home</a>
              <a id="spots" className="menu-item" href={`${match.path}/Spots`}>Spots</a>
              <a id="map" className="menu-item" href={`${match.path}/Map`}>Map</a>
              <a id="group" className="menu-item" href={`${match.path}/Groups`}>Groups</a>
            </Menu>
            
            <main role="main"> 
              <div className="main">
                <Switch>
                  <Route path={`${match.path}/profile`}>
                    <Profile />
                  </Route>
                  <Route path={`${match.path}/home`}>
                      <Home />
                  </Route>
                  <Route path={`${match.path}/spots`}>
                      <Spots />
                  </Route>
                  <Route path={`${match.path}/map`}>
                      <Map />
                  </Route>
                  <Route path={`${match.path}/groups`}>
                      <Groups />
                  </Route>
                </Switch>
              </div>
            </main>  

          </Col>
        </Row>
        

      </Container>
    );
  }
}
 
export default withRouter(Dashboard);