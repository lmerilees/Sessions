import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl, Form, Modal } from "react-bootstrap";
import { React, Component} from 'react';
import { Route, Switch } from 'react-router'

import "./Spots.css";


const styleCol = {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
    padding: '0px, 10px, 0px, 10px',
    minWidth: '200px'
}

const styleList = {
  maxHeight: '400px',
  overflowY: 'scroll',
}

const styleMain = {
  fontFamily: 'consolas',
  fontSize: '15px',
}

class Spots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionUser: localStorage.getItem('user'),
            spotList: [],
            key: 0,
            userRep: this.props.rep,
            infoModal: false,
            selectedSpot: {},
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
        this.handleClick = this.handleClick.bind(this);
      }  

      getUserRep = () => {
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

          this.props.handler();

          //this.setState.spotList.push(data);
          }).catch(err => {
            console.error("an error occured", err);
          });
        }

      updateRep = () => {

        let user_name = this.state.sessionUser;
        let reputation = this.state.userRep + 1
      
        fetch('http://localhost:3001/updateRep', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({reputation, user_name})
          })
        .then(async response => {
          const data = await response.json();
          if (!response.ok) { // get error message or default reponse
            const err = (data && data.message) || response.status;
            return Promise.reject(err);
        }

        console.log(data)
          // update our states
          this.setState({
            userRep: data.rows[0].reputation
          })
          
          // this needs to be called to update the rep displayed on the header
          this.props.handler();

        }).catch(err => {
          console.error("an error occured", err);
        });
    }

        getSpots= () => {
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
                spotArray.push(data.rows[i]);
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

        createSpot = () => {
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

            // increate reputation for adding a new spot
            this.updateRep();

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


    handleClick = (spot) => {
      console.log(spot);
      this.setState({
        infoModal: !this.state.infoModal,
        selectedSpot: spot
      });
      
      }
    
    // load spots when component is rendered for the first time
    componentDidMount = () => {
        this.getSpots();
        this.getUserRep();
    }
      
render() {
    return(
          <Container fluid>
              <Row>
                  <Col lg={1} md={1} sm={1}>
                  </Col>
                    <Col style={styleCol}>

                      {/* Spot list */}
                      <div className="styleMain">Spot List</div>
                      <ListGroup style={styleList}>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={key} action onClick={() => {this.setState({selectedSpot: spot})}}>{spot.spot_name}</ListGroup.Item>
                          ))}
                      </ListGroup>

                      <div id="InfoModal">

                        <Modal show={this.state.infoModal}>
                          <Modal.Header>
                            <Modal.Title >{this.state.selectedSpot.spot_name}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>

                            <Row style={styleMain}>
                            
                              <Col lg={8} md={4} sm={2}>
                                <b>Address:</b> {this.state.selectedSpot.location} <br/>
                                <b>Details:</b> {this.state.selectedSpot.details} <br/>
                                <b>Obstacles:</b> {this.state.selectedSpot.obstacles} <br/>
                                <b>Security Level:</b> {this.state.selectedSpot.security} <br/>
                              </Col>
                                
                              <Col lg={4} md={2} sm={1}>
                                Image goes here
                              </Col>
                            
                            </Row>

                          </Modal.Body>
                          <Modal.Footer><Button onClick={() => this.handleClick(this.state.selectedSpot)}>Close</Button></Modal.Footer>
                        </Modal>
                      </div>
      
                      {/* Checkboxes for spot filter */}
                      <Row>
                          <Button variant="light" size="sm" onClick={() => this.handleClick(this.state.selectedSpot)}>Select</Button>
                          <ToggleButtonGroup type="checkbox" values="1" aria-label="Spot filters">
                              <ToggleButton type="checkbox" checked="true" value="1">Ledges</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Rails</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Manual pad</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Stairs</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Banks</ToggleButton>
                          </ToggleButtonGroup>
                      </Row>
                    </Col>
      

                  {/* This col is for spacing */}
                  <Col lg={2} md={1} sm={1}>
                  </Col>


                  <Col style={styleCol}>            
                    <div className="styleMain">Add a new spot

                        {/* input form for creating a new spot */}
                        <form id="form-create" onSubmit={this.createSpot} className="form-create">
                            <input type='text' name='spot_name' placeholder="Spot Name" onChange={this.handleFormChange}/>
                            <input type='text' name='location' placeholder="Location" onChange={this.handleFormChange}/>
                            <input type='text' name='obstacles' placeholder="Obstacles" onChange={this.handleFormChange}/>
                            <input type='text' name='security' placeholder="Security" onChange={this.handleFormChange}/>
                            <input type='text' name='details' placeholder="Details" onChange={this.handleFormChange}/>
                            <Button onClick={this.createSpot}>Add Spot</Button>
                        </form>                    
                    </div>

                  </Col>
        
                  <Col lg={1} md={1} sm={1}>
                  </Col>
              </Row>

          </Container>
      );
    }
}

export default Spots;