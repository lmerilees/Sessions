import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl, Image, Modal } from "react-bootstrap";
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
  fontSize: '40px',
  textAlign: 'center',
  justifyContent: 'center',
  fontFamily: 'consolas',
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionUser: localStorage.getItem('user'),
            infoModal: false,
            setupModal: false,
            createParams: {
                reputation: "",
                image: "",
                info: "",
                setup: "",
                badges: "Badges earned will be displayed here. Get skating!",
                favourite_clip: "",
              }
        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
      }  

        getUserInfo = event => {
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


            console.log(data);
            // add spot names to our array
            let spotArray = []
            for(let i = 0; i < data.rowCount; i++){
                //console.log(data.rows[i].spot_name);
                //spotArray.push(data.rows[i].spot_name);
            }

            // update our states
            this.setState({
              image: data
            })
            
            //this.setState.spotList.push(data);
            }).catch(err => {
              console.error("an error occured", err);
            });
          }

        modifyDetails = event => {
            let info = this.state.createParams.info;
            let image = this.state.createParams.image;
            let setup = this.state.createParams.setup;
            let reputation = this.state.createParams.repuation;
            let badges = this.state.createParams.badges;
            fetch('http://localhost:3001/modifyUser', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({info, image, setup, reputation, badges})
              })
            .then(async response => {
              const data = await response.json();
              if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // repopulate the spotlist to reflect addition
            this.getProfile();

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
                 
                  <Col style={styleMain}>
                      <div> Basic Info</div>
                      <div><Button size="sm" onClick={this.toggle}>Edit Info</Button></div>
                      
                      <Image src='./holder.png' roundedCircle />
                      
                      
                     
                      <div id="InfoModal">
                        <Modal show={this.state.infoModal}>
                          <Modal.Header>
                            <Modal.Title>Update Basic Info</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Col>
                              {/* input form for creating a new spot */}
                              <form id="form-create" onSubmit={this.createSpot} className="form-create">
                                  <input type='text' name='stance' placeholder="Stance" onChange={this.handleFormChange}/>
                                  <input type='text' name='age' placeholder="Age" onChange={this.handleFormChange}/>
                                  <input type='text' name='location' placeholder="Location" onChange={this.handleFormChange}/>
                              </form>  
                            </Col> 
                          </Modal.Body>
                          <Modal.Footer><Button onClick={this.toggle}>Submit</Button></Modal.Footer>
                        </Modal>
                      </div>

                  </Col>

                  <Col style={styleMain}>
                    <div>My Favourite Clip</div>
                    <Image src='./holder.png' roundedCircle />
                  </Col>

              </Row>

              <Row>
                  <Col>
                    <div className="styleMain">Current Setup</div>
                    <div><Button size="sm" onClick={this.toggle2}>Edit Info</Button></div>
                    <div id="SetupModal">
                        <Modal show={this.state.setupModal}>
                          <Modal.Header>
                            <Modal.Title>Update Your Setup</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Col>
                              Board:
                              Trucks:
                              Wheels:
                              Shoes:
                            </Col> 
                          </Modal.Body>
                          <Modal.Footer><Button onClick={this.toggle2}>Submit</Button></Modal.Footer>
                        </Modal>
                      </div>
                  </Col>
                  <Col>
                    <div className="styleMain">Badges</div>
                    <div className="styleMain">{this.state.badges}</div>
                  </Col>
              </Row>
 
          </Container>
      );
    }
}

export default Profile;