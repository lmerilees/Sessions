import { Container, Row, Col, Button, ListGroup, Alert, ToggleButton, ToggleButtonGroup, ButtonGroup, InputGroup, FormControl, Card } from "react-bootstrap";
import { React, Component} from 'react';
import { Route, Switch } from 'react-router'

import "./Home.css";


const ListGroupStyle = {
  maxHeight: '500px',
  minWidth: '200px',
  overflowY: 'scroll',
}

const styleList = {
  maxHeight: '90vh',
  maxWidth: '40vw',
  overflowY: 'scroll',
}

const cardBodyStyle = {
  color: "black",
  fontSize: "10px",
  textAlign: 'left'
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: [],
            postList: [],
            createParams: {
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

            let spotArray = [];
            // add spot names to our array
            for(let i = 0; i < data.rowCount; i++){
                spotArray.push(data.rows[i]);
            }

            this.setState({
                spotList: spotArray
            })
            
            }).catch(err => {
              console.error("an error occured", err);
            });
          }

          getPosts() {
            fetch('http://localhost:3001/getPosts', {
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

            let postArray = [];

            // add posts to our array
            for(let i = 0; i < data.rowCount; i++){
                postArray.push(data.rows[i]);
            }
            
            this.setState({
              postList: postArray
            })
            
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
        this.getPosts();
    }

      
render() {
  const { match } = this.props;
    return(
          <Container fluid>
              <Row>

                <Col lg={1} md={1} sm={1}>
                </Col>

                <Col lg={6} md={4} sm={2}>
                        <div className="styleMain">
                            News Feed
                        </div>
                          {/* Post list */}
                          <ListGroup style={ListGroupStyle}>
                          {this.state.postList.map((post, key) => (      
                              <ListGroup.Item eventKey={key} >
                                <Card bg='light'>
                                  <Card.Title>{post.post_name}</Card.Title>
                                  <Card.Body>
                                    <Card.Text style={cardBodyStyle}>
                                      {post.post_body}
                                      
                                    </Card.Text>
                                   
                                  </Card.Body>
                                </Card>
                              </ListGroup.Item>
                          ))}
                        </ListGroup>
                </Col>
                       
                  <Col lg={4} md={2} sm={2}>

                    
                        <div className="styleMain">
                            Recently Added Spots
                        </div>
                        <ListGroup style={styleList}>
                          {this.state.spotList.map((spot, key) => (      
                              <ListGroup.Item eventKey={key}>{spot.spot_name}</ListGroup.Item>
                          ))}
                       </ListGroup>
                        
      
                        <div className="styleMain">
                            Current Groups
                        </div>       

                  </Col>


              </Row>

          </Container>
      );
    }
}

export default Home;