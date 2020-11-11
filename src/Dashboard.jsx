import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Container, Row, Col, Button} from 'react-bootstrap';
import "./Dashboard.css";
import Splash from "./components/Splash/Splash";
import Spots from "./components/Spots/Spots.js";
import Map from "./components/Map/Map";
import Groups from "./components/Groups/Groups";
import { bubble as Menu } from 'react-burger-menu';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      sessionUser: localStorage.getItem('user')
    };
  }  

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };

  openProfile = () => {

  }

  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div>

        {/* first row is our header */}
            <div className="styleHeader">
              Sessions
              <div className="push-right">
                <Button variant='light' onClick={this.signOut}>
                  Sign Out
                </Button>
              </div>
              <div className="push-right">
                <Button variant='light' >
                  {this.state.sessionUser}
                </Button>
              </div>
            </div>
        {/* second row is our main/body */}
        
      
        <Menu width={"200px"}>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="spots" className="menu-item" href={`${match.path}/Spots`}>Spots</a>
          <a id="map" className="menu-item" href={`${match.path}/Map`}>Map</a>
          <a id="group" className="menu-item" href={`${match.path}/Groups`}>Groups</a>
        </Menu>
        
        <main role="main"> 
          <div className="main">
            <Switch>
              <Route path={`${match.path}/profile`}>
              {/* When profile component is created uncomment this
                <Profile />
              */}
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

      </div>
    );
  }
}
 
export default withRouter(Dashboard);