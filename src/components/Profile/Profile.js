import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, Form, FormControl, Image, Modal, Card } from "react-bootstrap";
import { React, Component} from 'react';
import { Route, Switch } from 'react-router'

import "./Profile.css";

const styleBut = {
  maxWidth: '200px',
  textAlign: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  paddingLeft: '100px'
}


const styleMain = {
  color: 'white',
  fontSize: '30px',
  textAlign: 'center',
  justifyContent: 'center',
  fontFamily: 'consolas',
}

const styleSection = {
  color: 'white',
  fontSize:'30px',
}

const cardBodyStyle = {
  color: "black",
  fontSize: "20px",
  textAlign: 'left'
}


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionUser: localStorage.getItem('user'),
            infoModal: false,
            setupModal: false,
            createParams: {
                image: "",
                reputation: 0,
                age: 0,
                stance: "",
                location: "Saskatoon",
                board: "",
                trucks: "",
                wheels: "",
                bearings: "",
                shoes: "",
                favourite_clip: "Add your favourite clip to show off your skills!",
                badges: "Badges earned will be displayed here. Get skating!",
              }
        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
      }  

        getUserInfo = () => {
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
              createParams: {
                age: data.rows[0].age,
                badges: data.rows[0].badges,
                reputation: data.rows[0].reputation,
                bearings: data.rows[0].bearings,
                favourite_clip: data.rows[0].favourite_clip,
                image: data.rows[0].image,
                location: data.rows[0].location,
                shoes: data.rows[0].shoes,
                stance: data.rows[0].stance,
                trucks: data.rows[0].trucks,
                wheels: data.rows[0].wheels,
                board: data.rows[0].board
              }
            })
            
            //this.setState.spotList.push(data);
            }).catch(err => {
              console.error("an error occured", err);
            });
          }

        modifyDetails = () => {
            if(this.state.infoModal == true){
              this.toggle();
            }
            if(this.state.setupModal == true){
              this.toggle2();
            }
            

            let image = this.state.createParams.image;
            let reputation = this.state.createParams.repuation;
            let age = this.state.createParams.age;
            let stance = this.state.createParams.stance;
            let location = this.state.createParams.location;
            let board = this.state.createParams.board;
            let trucks = this.state.createParams.trucks;
            let wheels = this.state.createParams.wheels;
            let bearings = this.state.createParams.bearings;
            let shoes = this.state.createParams.shoes;
            let favourite_clip = this.state.createParams.favourite_clip;
            let badges = this.state.createParams.badges;
            let user_name = this.state.sessionUser;
            fetch('http://localhost:3001/modifyProfile', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({image, reputation, age, stance, location, board, trucks, wheels, bearings, shoes, favourite_clip, user_name})
              })
            .then(async response => {
              const data = await response.json();
              if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }
            // repopulate the spotlist to reflect addition
            this.getUserInfo();

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

        toggle() {
          this.setState({
            infoModal: !this.state.infoModal
          });
        };

        toggle2() {
          this.setState({
            setupModal: !this.state.setupModal
          });
        };
    
    // load spots when component is rendered for the first time
    componentDidMount() {
        this.getUserInfo();
    }
      
render() {
  const { match } = this.props;
    return(
          <Container fluid>
              
              <Row>
                <Col lg={1}>            
                
                </Col>
      

                  <Col style={styleMain}>
                    {this.state.sessionUser}'s Profile
                  </Col>


                  <Col lg={1}>            

                  </Col>
        
              </Row>

              <Row>
                 <Col lg={2} md={2} sm={1}>
                 </Col>
                  <Col>
                    <div style={styleSection}> Basic Info </div>
                    <Card bg='light' style={{ width: '25rem' }}>
                      <Card.Img variant="top" src="holder.png/100px180" />
                      <Card.Body>
                        <Card.Text style={cardBodyStyle}>
                          Name: {this.state.sessionUser} <br/>
                          Age: {this.state.createParams.age} <br/>
                          Stance: {this.state.createParams.stance} Footed<br/>
                          Location: {this.state.createParams.location}
                        </Card.Text>
                        <Button size="sm" onClick={this.toggle}>Edit Info</Button>
                      </Card.Body>
                    </Card>
                      
                     
                      <div id="InfoModal">

                        <Modal show={this.state.infoModal}>
                          <Modal.Header>
                            <Modal.Title>Update Basic Info</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Col>

                              <Form>
                                <Form.Group controlId="form-stance">
                                  <Form.Label>Stance: </Form.Label>
                                  <Form.Control type="text" name='stance' placeholder={this.state.createParams.stance} onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="form-age">
                                  <Form.Label>Age: </Form.Label>
                                  <Form.Control type="text" name='age' placeholder={this.state.createParams.age} onChange={this.handleFormChange}/>
                                </Form.Group>

                                <Form.Group controlId="form-location">
                                  <Form.Label>Location: </Form.Label>
                                  <Form.Control type="text" name='location' placeholder={this.state.createParams.location} onChange={this.handleFormChange}/>
                                </Form.Group>
                              
                              </Form>
                              
                            </Col> 

                          </Modal.Body>
                          <Modal.Footer><Button onClick={this.modifyDetails}>Submit</Button></Modal.Footer>
                        </Modal>
                      </div>

                  </Col>
                  <Col lg={1} md={1} sm={1}>
                  </Col>

                  <Col>
                    <div style={styleSection}> My Favourite Clip </div>
                      <Card bg='light' style={{ width: '25rem' }}>
                        <Card.Img variant="top" src="holder.png/100px180" />
                        <Card.Body>
                          <Card.Text style={cardBodyStyle}>
                            Upload your favourite clip here!
                          </Card.Text>
                          <Form>
                            <Form.File 
                              id="custom-file"
                              label="Upload Your Clip"
                              custom
                            />
                          </Form>
                        </Card.Body>
                      </Card>
                  </Col>

              </Row>

              <Row>
              <Col lg={2} md={2} sm={1}>
                 </Col>
                  <Col>
                  <div style={styleSection}> Current Setup </div>

                    <Card bg='light' style={{ width: '25rem' }}>
                      <Card.Img variant="top" src="holder.png/100px180" />
                      <Card.Body>
                        <Card.Text style={cardBodyStyle}>
                          Board: {this.state.createParams.board} <br/>
                          Trucks: {this.state.createParams.trucks} <br/>
                          Wheels: {this.state.createParams.wheels} <br/>
                          Bearings: {this.state.createParams.bearings} <br/>
                          Shoes: {this.state.createParams.shoes} <br/>
                        </Card.Text>
                        <Button size="sm" onClick={this.toggle2}>Edit Info</Button>
                      </Card.Body>
                    </Card>

                    <div id="SetupModal">
                        <Modal show={this.state.setupModal}>
                          <Modal.Header>
                            <Modal.Title>Update Your Setup</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Col>

                            <Form>
                              <Form.Group controlId="form-board">
                                <Form.Label>Board: </Form.Label>
                                <Form.Control type="text" name='board' placeholder={this.state.createParams.board} onChange={this.handleFormChange}/>
                              </Form.Group>

                              <Form.Group controlId="form-trucks">
                                <Form.Label>Trucks: </Form.Label>
                                <Form.Control type="text" name='trucks' placeholder={this.state.createParams.trucks} onChange={this.handleFormChange}/>
                              </Form.Group>

                              <Form.Group controlId="form-wheels">
                                <Form.Label>Wheels: </Form.Label>
                                <Form.Control type="text" name='wheels' placeholder={this.state.createParams.wheels} onChange={this.handleFormChange}/>
                              </Form.Group>

                              <Form.Group controlId="form-bearings">
                                <Form.Label>Bearings: </Form.Label>
                                <Form.Control type="text" name='bearings' placeholder={this.state.createParams.bearings} onChange={this.handleFormChange}/>
                              </Form.Group>

                              <Form.Group controlId="form-shoes">
                                <Form.Label>Shoes: </Form.Label>
                                <Form.Control type="text" name='shoes' placeholder={this.state.createParams.shoes} onChange={this.handleFormChange}/>
                              </Form.Group>

                            </Form>

                            </Col>  
                          </Modal.Body>
                          <Modal.Footer><Button onClick={this.modifyDetails}>Submit</Button></Modal.Footer>
                        </Modal>
                      </div>
                  </Col>
                  <Col lg={1} md={1} sm={1}></Col>
                  <Col>
                    <div style={styleSection}> Badges </div>
                        <Card bg='light' style={{ width: '25rem' }}>
                          <Card.Img variant="top" src="holder.png/100px180" />
                          <Card.Body>
                            <Card.Text style={cardBodyStyle}>
                              Get skating to earn badges!
                            </Card.Text>
                          </Card.Body>
                        </Card>
                  </Col>
              </Row>
 
          </Container>
      );
    }
}

export default Profile;