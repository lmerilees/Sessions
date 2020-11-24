import { Container, Row, Col, Button, ListGroup, Carousel } from "react-bootstrap";
import { React, Component} from 'react';

const styleHeader = {
    color: 'white',
    fontSize: '50px',
    padding: '10px',
    fontFamily: 'consolas',
}

const styleMain = {
    color: 'white',
    fontSize: '50px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
}

const styleLeader = {
    color: 'white',
    fontSize: '50px',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'consolas',
}

const styleList = {
    maxHeight: '400px',
    overflowY: 'scroll'
}


const leaderArray = []

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionUser: localStorage.getItem('user'),
            leaderList: [],
            placeList: []
        };
    }

getLeaders = () => {
    fetch('http://localhost:3001/getLeaders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) { // get error message or default reponse
            const err = (data && data.message) || response.status;
            return Promise.reject(err);
        }

        console.log(data)

        // add spot names to our array
        let leaderArray = []
        let placeArray = []
        
        for (let i = 0; i < data.rowCount && i < 3; i++) {
            leaderArray.push(data.rows[i]);
            if(i == 0){
                placeArray.push("1st")
            }
            else if(i == 1){
                placeArray.push("2nd")
            }
            else if(i == 2){
                placeArray.push("3rd")
            }
        }

        console.log(leaderArray)
        console.log(placeArray)

        // update our spot state using the array
        this.setState({
            leaderList: leaderArray,
            placeList: placeArray
        })

    }).catch(err => {
        console.error("an error occured", err);
    });
}

componentDidMount = () =>{
    this.getLeaders();
}


    render() {
        return (
        <Container fluid>
            <Row>
                <Col lg={12}>
        
                        {/* Spot list */}
                        <div className="styleMain">Leaderboard</div>
                        <br/>
                                        <br/>
                        <Carousel style={styleLeader} interval={3000}>
                            {
                                this.state.leaderList.map((leader, key) => (
                                    <Carousel.Item>
                                        {this.state.placeList[key]}
                                        <br/>
                                        <br/>
                                        {leader.user_name}
                                        <Carousel.Caption>
                                            <h5>Reputation: {leader.reputation}</h5>
                                        </Carousel.Caption>
                                        <br/>
                                        <br/>
                                    </Carousel.Item>
                                ))   
                                
                            }
                        </Carousel>
                            <br/>
                            <h5 style={{textAlign: 'center'}}>Didn't make the cut? Find more spots!</h5>
 
                </Col>
            </Row>
        </Container>
    );

    }
}

export default Leaderboard;