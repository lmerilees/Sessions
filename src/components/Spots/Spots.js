import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup } from "react-bootstrap";
import { React, Component} from 'react';
import "./Spots.css";

class Spots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: []
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

            // 
            let spotArray = []
            for(let i = 0; i < data.rowCount; i++){
                console.log(data.rows[i].spot_name);
                spotArray.push(data.rows[i].spot_name);
            }

            // update our spot state 
            this.setState({
                spotList: spotArray
            })
            
            //this.setState.spotList.push(data);
            }).catch(err => {
              console.error("an error occured", err);
            });
          }
    
    componentDidMount() {
        this.getSpots();
    }
      
render() {
    return(
          <Container>
              <Row>
                  <Col>
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
                      <div className="styleMain">Add a new spot</div>
                  </Col>
              
              </Row>
          </Container>
      );
    }
}

export default Spots;