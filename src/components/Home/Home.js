import {
    Container,
    Row,
    Col,
    Button,
    ListGroup,
    Card,
    Modal,
    Table,
    Image
} from "react-bootstrap";
import {React, Component} from 'react';

import "./Home.css";


const ListGroupStyle = {
    maxHeight: '500px',
    minWidth: '200px',
    overflowY: 'scroll'
}

const styleList = {
    maxHeight: '90vh',
    maxWidth: '40vw',
    overflowY: 'scroll'
}

const styleList2 = {
    maxHeight: '30vh',
    maxWidth: '50vw',
    overflowY: 'scroll'
}

const cardBodyStyle = {
    color: "black",
    fontSize: "15px",
    textAlign: 'left'
}

const stylePostHeader = {
    color: '#0275d8',
    fontWeight: 'bold',
    padding: '10px 0px 0px 10px'
}

const styleLikes = {
    color: 'green'
}

const styleDislikes = {
    color: 'red'
}

const styleMain = {
  fontFamily: 'consolas',
  fontSize: '15px'
}

const styleHeader = {
  fontFamily: 'consolas',
  fontSize: '40px'
}

const styleTag = {
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center'
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotList: [],
            postList: [],
            leaderList: [],
            createParams: {},
            selectedSpot: null
        };
        
    }

    getSpots() {
        fetch('http://localhost:3001/getSpots', {
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

            let spotArray = [];
            // add spot names to our array
            for (let i = 0; i < data.rowCount; i++) {
                spotArray.push(data.rows[i]);
            }

            this.setState({spotList: spotArray})

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    getPosts() {
        fetch('http://localhost:3001/getPosts', {
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

            let postArray = [];

            // add posts to our array
            for (let i = 0; i < data.rowCount; i++) {
                postArray.push(data.rows[i]);
            }

            this.setState({postList: postArray})

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    updatePostLikes = (post) => {

        let post_id = post.post_id;
        let likes = post.likes + 1;

        fetch('http://localhost:3001/updateLikes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {likes, post_id}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // update post list to reflect like
            this.getPosts();

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    updatePostDislikes = (post) => {
        let post_id = post.post_id;
        let dislikes = post.dislikes + 1;
        fetch('http://localhost:3001/updateDislikes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {dislikes, post_id}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // update post list to reflect dislike
            this.getPosts();

        }).catch(err => {
            console.error("an error occured", err);
        });
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

    handleFormChange = event => {
        let createParamsNew = {
            ...this.state.createParams
        };
        let val = event.target.value;
        createParamsNew[event.target.name] = val;
        this.setState({createParams: createParamsNew});
    };

    // load spots when component is rendered for the first time
    componentDidMount() {
        this.getSpots();
        this.getPosts();
        this.getLeaders();
    }


    render() {
        const {match} = this.props;
        return (
            <Container fluid>
                <Row>

                    <Col lg={1}
                        md={1}
                        sm={1}></Col>

                    <Col lg={6}
                        md={4}
                        sm={2}>
                        <div className="styleMain">
                            News Feed
                        </div>
                        {/* Post list */}
                        <ListGroup style={ListGroupStyle}>
                            {
                            this.state.postList.map((post, key) => (
                                <ListGroup.Item eventKey={key}>
                                    <Card bg='light'>
                                        <Card.Title style={stylePostHeader}>
                                            {
                                            post.post_name
                                        }</Card.Title>
                                        <Card.Body>
                                            <Card.Text style={cardBodyStyle}>
                                                <Row>

                                                    <Col lg={10}
                                                        md={8}
                                                        sm={6}>
                                                        {
                                                        post.post_body
                                                    }
                                                        <br/>
                                                        <br/>
                                                        <br/>

                                                        <div style={styleLikes}>
                                                            {
                                                            post.likes 
                                                        } 
                                                          {''}  people think this is sick!
                                                        </div>
                                                        <br/>
                                                        <div style={styleDislikes}>
                                                            {
                                                            post.dislikes
                                                        }
                                                          {''}  people think this is lame!
                                                        </div>
                                                    </Col>

                                                    <Col lg={2}
                                                        md={2}
                                                        sm={2}>
                                                        <Button variant='outline-success'
                                                            onClick={
                                                                () => this.updatePostLikes(post)
                                                        }>Sick!</Button>
                                                        <Button variant='outline-danger'
                                                            onClick={
                                                                () => this.updatePostDislikes(post)
                                                        }>Lame!</Button>
                                                    </Col>

                                                </Row>

                                            </Card.Text>

                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            ))
                        } </ListGroup>
                    </Col>

                    <Col lg={4}
                        md={2}
                        sm={2}>


                        <div className="styleMain">
                            Recently Added Spots
                        </div>
                        <ListGroup style={styleList2}>
                            {
                            this.state.spotList.map((spot, key) => (
                                <ListGroup.Item eventKey={key} action
                                onClick={
                                    () => {
                                        this.setState({selectedSpot: spot})
                                    }
                            }>
                                    {
                                    spot.spot_name
                                }</ListGroup.Item>
                            ))
                        } </ListGroup>


                        <div className="styleMain">
                            Top Users
                        </div>
                        <ListGroup style={styleList2}>
                            {
                            this.state.leaderList.map((leader, key) => (
                                <ListGroup.Item eventKey={key} action
                                >
                                    {
                                    this.state.placeList[key] + ": " + leader.user_name
                                }</ListGroup.Item>
                            ))
                        } </ListGroup>

                    </Col>


                </Row>

            </Container>
        );
    }
}

export default Home;
