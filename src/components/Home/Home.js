import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import { React, Component} from 'react';
import { Route, Switch } from 'react-router'

import "./Home.css";


const ListGroupStyle = {
  maxHeight: '500px',
  minWidth: '200px',
  overflowY: 'scroll',
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
          <Container fluid>
              <Row>

                <Col lg={1} md={1} sm={1}>
                </Col>

                <Col>
                        <div className="styleMain">
                            News Feed
                        </div>
                        <ListGroup style={ListGroupStyle}>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={this.state.key} action href={`${this.props.path}/spots/${(String(spot).split(" ").join(""))}`}>{spot}</ListGroup.Item>
                          ))}
                        </ListGroup>
                        
                </Col>

                    <Col lg={2} md={1} sm={1}>
                    </Col>
                        
                  <Col>

                    
                        <div className="styleMain">
                            Recently Added Spots
                        </div>
                        <ListGroup style={ListGroupStyle}>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={this.state.key} action href={`${this.props.path}/spots/${(String(spot).split(" ").join(""))}`}>{spot}</ListGroup.Item>
                          ))}
                        </ListGroup>
      
                        <div className="styleMain">
                            Current Groups
                        </div>       

                  </Col>


                  <Col lg={1} md={1} sm={1}>
                  </Col>

              </Row>

          </Container>
      );
    }
}

export default Home;