import React, {Component} from 'react';
import {Button, Nav, Navbar, Form, FormControl, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import refresh from 'C:/Users/city_/weather-app2/src/Images/refresh.png'


class Toolbars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null
        }
    }

    reloadPage() {
        window.location.reload(false)
    }

    // this method is called when the component is rendered for the first time
    componentDidMount() {
        this.setState = {
            img: {refresh}
        }
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Weatherboi</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </>
        );
    }
}

export default Toolbars;
