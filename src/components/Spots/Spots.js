import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import { React, Component} from 'react';
import "./Spots.css";

const styleCol = {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
    padding: '0px, 10px, 0px, 10px'
}

class Spots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: [],
            createParams: {
                spotName: "",
                location: "",
                skill: "",
                obstacles: "",
                security: ""
              }
        };
      }  

        getSpots() {
            // let user_id = this.state.loginParams.user_id;
            // let user_password = this.state.loginParams.user_password;
            console.log("getSpots()")
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

        createSpot() {
            console.log("createSpot()");
            console.log(this.state.createParams)
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
    return(
          <Container>
              <Row>
                    <Col style={styleCol}>

                      {/* Spot list */}
                      <div className="styleMain">
                          Spot List
                      </div>
                      <ListGroup defaultActiveKey="#link1">
                          {this.state.spotList.map(spot => (
                              <ListGroup.Item action href="#link${spot}">{spot}</ListGroup.Item>
                          ))}
                      </ListGroup>
      
                      {/* Checkboxes for spot filter */}
                      <Row>
                          <Button variant="light" size="sm" onClick={this.getSpots}>Select</Button>
                          <ToggleButtonGroup type="checkbox" values="1" aria-label="Spot filters">
                              <ToggleButton type="checkbox" checked="true" value="1">Ledges</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Rails</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Manual pad</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Stairs</ToggleButton>
                              <ToggleButton type="checkbox" checked="true" value="1">Banks</ToggleButton>
                          </ToggleButtonGroup>
                      </Row>
                    </Col>
      

                  <Col>
                  </Col>
                  <Col style={styleCol}>            
                    <div className="styleMain">Add a new spot

                        {/* input form for creating a new spot */}
                        <form onSubmit={this.createSpot} className="form-signin">
                            <input type='text' name='spotName' placeholder="Spot Name" onChange={this.handleFormChange}/>
                            <input type='text' name='locaation' placeholder="Location" onChange={this.handleFormChange}/>
                            <input type='text' name='skill' placeholder="Skill" onChange={this.handleFormChange}/>
                            <input type='text' name='obstacles' placeholder="Obstacles" onChange={this.handleFormChange}/>
                            <input type='text' name='security' placeholder="Security" onChange={this.handleFormChange}/>
                            <input type="submit" value="Login" />
                        </form>                    
                    </div>

                  </Col>
              
              </Row>
          </Container>
      );
    }
}

export default Spots;