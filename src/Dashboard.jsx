import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Container, Row, Col, Button} from 'react-bootstrap';
import "./Dashboard.css";
import Splash from "./components/Splash/Splash";
//import Pos from "./Pos";
//import IndexDashboard from "./IndexDashboard";
//import NotFound from "./404";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }  

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div>
        <ul>
          <li>
            <div class='styleHeader'>
              <Link to={`${match.path}`}>Sessions</Link>
            </div>
          </li>
          <li>
            <div class='styleHeader'>
              <Link to={`${match.path}/Splash`}>Spots</Link>
            </div>
          </li>
          <li className="push-right">
            <Button onClick={this.signOut} href="#">
              Sign Out
            </Button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
            <Route path={`${match.path}/splash`}>
                <Splash />
            </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
 
export default withRouter(Dashboard);