import { Container, Row, Col, Button } from "react-bootstrap";
import {React, Component } from 'react';
import { Google, Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

const mapStyles = {
    width: '800px',
    height: '550px',
    position: "fixed"
};

const styleFilter = {
    color: 'white',
    fontSize: '30px',
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

const styleInfoWindowHeader = {
    fontSize: '20px',
    fontFamily: 'consolas',
    fontWeight: 'bold'
}

const styleInfoWindowbody = {
    fontSize: '15px',
    fontFamily: 'consolas',
    justifyContent: 'left',
    textAlign: 'left',
    float: 'left'
}

const markerArray = [];

class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorMessage: null,
            lat: "",
            lng: "",
            user_lat: 52.12,
            user_lon: -106.67,
            mapList: [],
            showingInfoWindow: false,
            activeMarker: ""
        }        
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
    getCoordinates(spot) {

        // access words of address string 
        let str = spot.location.split(' ');
        let streetNum = str[0];
        let streetName = str[1]
        let streetType = str[2];

        let sql = "https://maps.googleapis.com/maps/api/geocode/json?address=" + streetNum + "+"+ streetName + "+" + streetType + ",+" + "Saskatoon,+SK&key=AIzaSyDRkknHDMFkSTIXzpRnySLykWf659-wzio"
        fetch(sql)
        .then(async response => {
            const data = await response.json();
            // check if reponse is an error
            if (!response.ok) { // get error message or default reponse
                const err = (data && data.message) || response.status;
                return Promise.reject(err);
            }
        
            let loc = data.results[0].geometry.location
            
            // add name and location to our marker array
            markerArray.push({
                name: spot.spot_name,
                location: {
                    lat: loc.lat,
                    lng: loc.lng
                },
                obstacles: spot.obstacles,
                address: spot.location,
                image: spot.image,
                details: spot.details,
                rating: spot.rating,
                security: spot.security,
                challenges: spot.challenges
            })

        }).catch(err => {
            this.setState({errorMessage: err});
            console.error("An error occured", err);
        });
    }

    // get spots from the 
    getSpots() {
        console.log("getspots");
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

        // determine coordinates of spots
        for(let i = 0; i < data.rowCount; i++){
            this.getCoordinates(data.rows[i]);
        }
        
        this.setState({
            mapList: markerArray
        })

        }).catch(err => {
          console.error("an error occured", err);
        });
      }

    handleClick = (spot) => {
        console.log(spot)
        this.setState({
            activeMarker: spot,
            showingInfoWindow: true
        })
        
    }

    onInfoWindowClose = () =>{
        this.setState({
        showingInfoWindow: false
        });
    }

    

    componentDidMount() {
        this.getLocation();
        this.getSpots();
    }

    render() {
        return (
            <Container fluid>
                <div style={styleMain}>Map</div>
                <Row>
                                <Col lg={1} md={1} sm={1}></Col>
                                <Col lg={7} md={5} sm={4}>
                                    <Map
                                        google={this.props.google}
                                        style={mapStyles}
                                        initialCenter={{
                                                lat: this.state.user_lat,
                                                lng: this.state.user_lon
                                            }}
                                        zoom={12}
                                        hoverDistance={1000}
                                        zoomControl={true}
                                        mapTypeControl={true}
                                        scaleControl={true}
                                        streetViewControl={true}
                                        panControl={true}
                                        rotateControl={true}
                                        fullscreenControl={true}>

                                        {/* Add a marker on the map for each spot */}
                                        {
                                            this.state.mapList.map((spot, index) => {
                                                return (
                                                    <Marker title={spot.name} name={spot.name} key={index} center={spot.location} position={spot.location} clickable={true} onClick={() => {this.handleClick(spot)}} />
                                                )
                                            })
                                        }



                                        {/* Add info window for when user clicks on a marker */}
                                        {
                                            <InfoWindow position={this.state.activeMarker.location} onClose={() => {this.onInfoWindowClose()}} visible={this.state.showingInfoWindow}>
                                                <div>
                                                    <div>
                                                        <div style={styleInfoWindowHeader}>
                                                            {this.state.activeMarker.name}
                                                        </div>  <br/><br/>
                                                        <div style={styleInfoWindowbody}>
                                                         Address: {this.state.activeMarker.address}<br/>
                                                         Details: {this.state.activeMarker.details}<br/>
                                                         Rating: {this.state.activeMarker.rating}<br/>
                                                         Security: {this.state.activeMarker.security}<br/>
                                                         Obstacles: {this.state.activeMarker.obstacles}<br/>
                                                         Challenges: {this.state.activeMarker.challenges}<br/>
                                                         </div>
                                                    </div>

                                                </div>
                                            </InfoWindow>
                                        }
                                        
                                    </Map>
                                    
                                </Col>

                                <Col lg={4} md={4} sm={3}>
                                <div style={styleFilter}>Filters</div>
                                </Col>
                
                </Row>
            </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAorJgq9XDIR_SL9bZbsFsKaNjAiCZ_tyI'
})(MapContainer);