import {
    Container,
    Row,
    Col,
    Button,
    ListGroup,
    ToggleButton,
    ToggleButtonGroup,
    Modal,
    Image,
    Table
} from "react-bootstrap";
import {React, Component} from 'react';
import {Route, Switch} from 'react-router';
import * as Dropzone from 'react-dropzone';

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
    overflowY: 'scroll'
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

class Spots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionUser: localStorage.getItem('user'),
            spotList: [],
            key: null,
            userRep: this.props.rep,
            infoModal: false,
            selectedSpot: {},
            buttonDisabled: false,
            createParams: {
                spot_name: "",
                location: "",
                image: "",
                details: "",
                obstacles: "",
                security: "",
                challenges: ""
            }
        };
        this.handleClick = this.handleClick.bind(this);
    }

    getUserRep = () => {
        let user_id = this.state.sessionUser;
        fetch('http://localhost:3001/getProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {user_id: user_id}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // update our states
            this.setState({userRep: data.rows[0].reputation})

            this.props.handler();

            // this.setState.spotList.push(data);
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {reputation, user_name}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            console.log(data)
            // update our states
            this.setState({userRep: data.rows[0].reputation})

            // this needs to be called to update the rep displayed on the header
            this.props.handler();

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    getSpots = () => {
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

            // add spot names to our array
            let spotArray = []
            for (let i = 0; i < data.rowCount; i++) {
                spotArray.push(data.rows[i]);
            }

            // update our spot state using the array
            this.setState({spotList: spotArray})

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    createSpot = () => {
        let spot_name = this.state.createParams.spot_name;
        let location = this.state.createParams.location;
        let image = this.state.createParams.image;
        let details = this.state.createParams.details;
        let obstacles = this.state.createParams.obstacles;
        let security = this.state.createParams.security;
        let challenges = this.state.createParams.challenges;
        fetch('http://localhost:3001/createSpot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    spot_name,
                    location,
                    image,
                    details,
                    obstacles,
                    security,
                    challenges
                }
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // repopulate the spotlist to reflect addition
            this.getSpots();

            // increate reputation for adding a new spot
            this.updateRep();

            // create a post for the news feed
            this.createPost();

            // let user know they added a new spot successfully
            alert(this.state.createParams.spot_name + " has been added!");

            // clear create forms
            document.getElementById("form-create").reset();

        }).catch(err => {
            console.error("an error occured", err);
        });
    }


    updateRating = (spotRating) => {
        let spot_name = this.state.selectedSpot.spot_name;
        let rating = this.state.selectedSpot.rating + spotRating;
        fetch('http://localhost:3001/updateRating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {rating, spot_name}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // find a better way to update rating in Modal without resetting every state
            this.setState({
                selectedSpot: {
                    spot_name: this.state.selectedSpot.spot_name,
                    details: this.state.selectedSpot.details,
                    image: this.state.selectedSpot.image,
                    location: this.state.selectedSpot.location,
                    obstacles: this.state.selectedSpot.obstacles,
                    security: this.state.selectedSpot.security,
                    rating: this.state.selectedSpot.rating + spotRating,
                    challenges: this.state.selectedSpot.challenges
                }
            })

            this.getSpots();


            // let user know they added a new spot successfully <Alert>Thanks for letting us know!</Alert>

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    createPost = () => {
        console.log("createPost()");

        let spot_name = this.state.createParams.spot_name;
        let location = this.state.createParams.location;
        let image = this.state.createParams.image;
        let details = this.state.createParams.details;
        let security = this.state.createParams.security;
        let obstacles = this.state.createParams.obstacles;
        let user_name = this.state.sessionUser;
        let post_name = user_name + " added a new spot called " + spot_name;
        let post_body = "Address: " + location + ", " + details + ", and its got " + obstacles;
        fetch('http://localhost:3001/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {post_name, post_body, user_name}
            )
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }
            console.log(data);

        }).catch(err => {
            console.error("an error occured", err);
        });
    }

    handleFileUpload = (file) => {
        console.log("fileUpload()");
        // console.log(file);
    }

    handleFormChange = event => {
        let createParamsNew = {
            ...this.state.createParams
        };
        let val = event.target.value;
        createParamsNew[event.target.name] = val;
        this.setState({createParams: createParamsNew});
    };


    handleClick = (spot) => {
        this.setState({
            infoModal: !this.state.infoModal,
            selectedSpot: spot,
            buttonDisabled: false
        });
    }

    handleClickLike = () => {
        this.setState({buttonDisabled: true})
        this.updateRating(1);
    }

    handleClickDislike = () => {
        this.setState({buttonDisabled: true})
        this.updateRating(-1)
    }

    // load spots when component is rendered for the first time
    componentDidMount = () => {
        this.getSpots();
        this.getUserRep();
    }

    componentDidUpdate = () => {
        this.getSpots();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col lg={1}
                        md={1}
                        sm={1}></Col>
                    <Col style={styleCol}>

                        {/* Spot list */}
                        <div className="styleMain">Spot List</div>
                        <ListGroup style={styleList}>
                            {
                            this.state.spotList.map((spot, key) => (
                                <ListGroup.Item eventKey={key}
                                    action
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

                        <div id="InfoModal">

                            <Modal dialogClassName="styleModal"
                                show={
                                    this.state.infoModal
                            }>
                                <Modal.Header>
                                    <Modal.Title style={styleHeader}>
                                        {
                                        this.state.selectedSpot.spot_name
                                    }</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Row style={styleMain}>

                                        <Col lg={6}
                                            md={4}
                                            sm={2}>
                                            <Table bordered={true}
                                                size="lg">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <b>Address:</b>
                                                        </td>
                                                        <td> {
                                                            this.state.selectedSpot.location
                                                        } </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Details:</b>
                                                        </td>
                                                        <td> {
                                                            this.state.selectedSpot.details
                                                        } </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Obstacles:</b>
                                                        </td>
                                                        <td> {
                                                            this.state.selectedSpot.obstacles
                                                        } </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Security Level:</b>
                                                        </td>
                                                        <td> {
                                                            this.state.selectedSpot.security
                                                        } </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>Rating:</b>
                                                        </td>
                                                        <td> {
                                                            this.state.selectedSpot.rating
                                                        } </td>
                                                    </tr>
                                                </tbody>

                                            </Table>

                                            <br/>
                                            <div style={styleTag}>Had a session here? Rate it!</div>
                                            <Row lg={4}>
                                                <Col>
                                                    <Button variant="outline-success"
                                                        onClick={
                                                            () => this.handleClickLike()
                                                        }
                                                        disabled={
                                                            this.state.buttonDisabled
                                                    }>Like</Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="outline-danger"
                                                        onClick={
                                                            () => this.handleClickDislike()
                                                        }
                                                        disabled={
                                                            this.state.buttonDisabled
                                                    }>Dislike</Button>
                                                </Col>
                                            </Row>

                                        </Col>

                                        <Col lg={6}
                                            md={2}
                                            sm={1}>
                                            <Image src="http://www.cityspaces.ca/wp-content/uploads/2013/09/screen-shot-2013-05-11-at-3-30-31-pm-680x487.png" fluid rounded/>

                                        </Col>

                                    </Row>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-primary"
                                        onClick={
                                            () => this.handleClick(this.state.selectedSpot)
                                    }>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        {/* Checkboxes for spot filter */}
                        <Row>
                            <Button variant="primary"
                                onClick={
                                    () => this.handleClick(this.state.selectedSpot)
                            }>Select</Button>
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
                    <Col lg={2}
                        md={1}
                        sm={1}></Col>


                    <Col style={styleCol}>
                        <div className="styleMain">Add a new spot {/* input form for creating a new spot */}
                            <form id="form-create"
                                onSubmit={
                                    this.createSpot
                                }
                                className="form-create">
                                <input type='text' name='spot_name' placeholder="Spot Name"
                                    onChange={
                                        this.handleFormChange
                                    }/>
                                <input type='text' name='location' placeholder="Location"
                                    onChange={
                                        this.handleFormChange
                                    }/>
                                <input type='text' name='obstacles' placeholder="Obstacles"
                                    onChange={
                                        this.handleFormChange
                                    }/>
                                <input type='text' name='security' placeholder="Security"
                                    onChange={
                                        this.handleFormChange
                                    }/>
                                <input type='text' name='details' placeholder="Details"
                                    onChange={
                                        this.handleFormChange
                                    }/>
                                <Button onClick={
                                    this.createSpot
                                }>Add Spot</Button>
                            </form>
                        </div>

                    </Col>

                    <Col lg={1}
                        md={1}
                        sm={1}></Col>
                </Row>

            </Container>
        );
    }
}

export default Spots;
