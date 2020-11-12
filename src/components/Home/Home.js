import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import { React, Component} from 'react';
import { Route, Switch } from 'react-router'

import "./Home.css";


const styleCol = {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
    padding: '0px, 10px, 0px, 10px'
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: [],
            key: 0,
            createParams: {
                spot_name: "",
                location: "",
                image: "",
                details: "",
                rating: 0,
                obstacles: "",
                security: "",
                challenges: "",
              }
        };
      }  

        getSpots() {
            fetch('http://localhost:3001/getSpots', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            .then(async response => {
              const data = await response.json();
              if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // add spot names to our array
            let spotArray = []
            for(let i = 0; i < data.rowCount; i++){
                //console.log(data.rows[i].spot_name);
                spotArray.push(data.rows[i].spot_name);
            }

            // update our spot state using the array
            this.setState({
                spotList: spotArray
            })
            
            //this.setState.spotList.push(data);
            }).catch(err => {
              console.error("an error occured", err);
            });
          }

        createSpot = event => {
            let spot_name = this.state.createParams.spot_name;
            let location = this.state.createParams.location;
            let image = this.state.createParams.image;
            let details = this.state.createParams.details;
            let rating = this.state.createParams.rating;
            let obstacles = this.state.createParams.obstacles;
            let security = this.state.createParams.security;
            let challenges = this.state.createParams.challenges;
            fetch('http://localhost:3001/createSpot', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({spot_name, location, image, details, rating, obstacles, security, challenges})
              })
            .then(async response => {
              const data = await response.json();
              if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // repopulate the spotlist to reflect addition
            this.getSpots();

            // let user know they added a new spot successfully
            alert(this.state.createParams.spot_name + " has been added!");

            // clear create forms 
            document.getElementById("form-create").reset();

            }).catch(err => {
              console.error("an error occured", err);
            });
        }

        handleFormChange = event => {
            let createParamsNew = { ...this.state.createParams };
            let val = event.target.value;
            createParamsNew[event.target.name] = val;
            this.setState({
              createParams: createParamsNew
            });
          };
    
    // load spots when component is rendered for the first time
    componentDidMount() {
        this.getSpots();
    }
      
render() {
  const { match } = this.props;
    return(
          <Container>
              <Row>
                    <Col>

                        <div className="styleMain">
                            News Feed
                        </div>
                        <ListGroup>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={this.state.key} action href={`${this.props.path}/spots/${(String(spot).split(" ").join(""))}`}>{spot}</ListGroup.Item>
                          ))}
                        </ListGroup>
                        
                    </Col>

                    <Col>
                    
                    </Col>
                        
                  <Col>

                    <Row>
                        <div className="styleMain">
                            Recently Added Spots
                        </div>
                        <ListGroup>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={this.state.key} action href={`${this.props.path}/spots/${(String(spot).split(" ").join(""))}`}>{spot}</ListGroup.Item>
                          ))}
                        </ListGroup>
                    </Row>

                    <Row>
                        <div className="styleMain">
                            Current Groups
                        </div>
                        <ListGroup>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={this.state.key} action href={`${this.props.path}/spots/${(String(spot).split(" ").join(""))}`}>{spot}</ListGroup.Item>
                          ))}
                        </ListGroup>
                    </Row>

                  </Col>
        
              </Row>


          </Container>
      );
    }
}

export default Home;