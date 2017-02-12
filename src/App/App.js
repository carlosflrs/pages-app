import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';

/* Own Components */
import Button from '../Button/Button.js'
import Pages from '../Pages/Pages.js'

/* UI */
import logo from '../imgs/pages.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {userData: {}, isLoggedIn: false};
        this.responseFacebook = this.responseFacebook.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }


    componentWillMount() {
        //TODO set isLoggedIn variable here to show correct view when refreshing
    }

    handleLoginClick(data) {
        this.setState({
            userData: data,
            isLoggedIn: true
        });
    }

    handleLogoutClick() {
        this.setState({
            userData: {},
            isLoggedIn: true
        });
    }

    /* Callback to handle FacebookLogin response. */
    responseFacebook(response) {
        if (response.expiresIn === undefined) {
            console.log("Something went wrong. Don't set userData");
            console.log("Error Response:");
            console.log(response);
        } else {
            console.log("Response:");
            console.log(response);
            graph.setAccessToken(response['accessToken']);
            this.handleLoginClick(response);
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let body = null;
        let header = null;
        console.log("isLoggedIn:")
        console.log(isLoggedIn);
        if (isLoggedIn) {
            // header = <Navbar inverse collapseOnSelect>
                // <Navbar.Header>
                //     <Navbar.Brand>
                //         Pages
                //     </Navbar.Brand>
                // <Navbar.Toggle />
                // </Navbar.Header>
                // <Navbar.Collapse>
                // <Nav>
                // <NavItem eventKey={1} > Posts </NavItem>
                // <NavItem eventKey={2} > Publish </NavItem>
                // </Nav>
                // <Nav pullRight>
                // <NavItem eventKey={1} href="#">Link Right</NavItem>
                // <NavItem eventKey={2} href="#">Link Right</NavItem>
                // </Nav>
                // </Navbar.Collapse>
                // </Navbar>
            header =
                <div className="App-navbar">
                <div className="App-navbar-items">
                <img src={logo} className="App-logo-login" alt="logo"/>
                <Button text="Pages"/>
                <Button text="Posts"/>
                <Button text="Publish"/>
                </div>
                </div>

            body =
                <div className="App-body-login">
                <Pages user={this.state.userData}/>
                </div>
        } else {
            header =
                <div className="App-header-intro">
                    <img src={logo} className="App-logo-intro" alt="logo" />
                    <h2>Welcome to Pages</h2>
                </div>
            body =
                <div className="App-body-intro">
                    <p className="App-intro">
                    The app that allows you to manage your Facebook pages.
                    </p>
                    <FacebookLogin
                        appId='333756033684992'
                        autoLoad={false}
                        fileds='manage_pages'
                        callback={this.responseFacebook}
                    />
                </div>
        }
        return (
            <div>
            {header}
            {body}
            </div>
        );
    }

}

export default App;
