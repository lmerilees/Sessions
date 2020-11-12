import { Container, Row, Col, Button } from "react-bootstrap";
import {React, Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

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
            lat: "",
            lon: "",
            user_lat: 52.12,
            user_lon: -106.67,
        }        
    }

    // this method is called when the component is rendered for the first time
    componentDidMount() { 
       // determine user location
       this.getLocation();
    }

    /**
     * Get geolocation of user and store latitude and longitude in states
     */
    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({user_lat: position.coords.latitude, user_lon: position.coords.longitude});
        }, (error) => this.setState({errorMessage: error}))
    }

    // convert address to coordinates so that can be marked on the map
    getCoordinates() {
        let API = "648f721923c5e9d95de6fc8b69c904a2"
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=601+Spadina+Crescent,+Saskatoon,+SK&key=AIzaSyDRkknHDMFkSTIXzpRnySLykWf659-wzio")
        .then(async response => {
            const data = await response.json();
            // check if reponse is an error
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }

            // otherwise set states
            this.setState({
                lat: data.results[0].geometry.location.lat,
                lon: data.results[0].geometry.location.lng
            })

        }).catch(err => {
            this.setState({errorMessage: err});
            console.error("An error occured", err);
        });
    }
    

    componentDidMount() {
        this.getCoordinates();
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
                                                lat: this.state.user_lat,
                                                lng: this.state.user_lon
                                            }}
                                        zoom={12}
                                        hoverDistance={100}>

                                        <Marker key="marker_1"
                                        position={{
                                        lat: this.state.lat,
                                        lng: this.state.lon,
                                        text: "My location"
                                        }}
                                        />

                                    </Map>
                                    

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