import { Container, Row, Col, Button } from "react-bootstrap";
import {React, Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
    width: '512px',
    height: '512px',
    position: "fixed",
    zIndex: 0,
};

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

class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorMessage: null,
            lat: 52.12,
            lon: -106.67,
        }        
    }

    // this method is called when the component is rendered for the first time
    componentDidMount() { 
       // determine user location
       this.getLocation();
    }

    componentWillUnmount() {
        // we need to clear the timer when the component unmounts to prevent memory leaks
        clearInterval(this.interval);
    }

    /**
     * Get geolocation of device and store latitude and longitude in states
     */
    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({lat: position.coords.latitude, lon: position.coords.longitude});
            // if successful, proceed to make API request
        }, (error) => this.setState({errorMessage: error}))
    }

    render() {
        return (
            <Container fluid>
                <div style={styleMain}>Map</div>
                <Row>
                    <Col>
                    
                        <div align="center">
                            <Row>
                                <Col>
                                    <br></br>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Map
                                        google={this.props.google}
                                        style={mapStyles}
                                        initialCenter={{
                                                lat: this.state.lat,
                                                lng: this.state.lon
                                            }}
                                        zoom={12}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* find a better way to do this or put something here */}
                                
                                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                    <Col>
                    <div style={styleMain}>Filters</div>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAorJgq9XDIR_SL9bZbsFsKaNjAiCZ_tyI'
})(MapContainer);