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



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {userData: {}, isLoggedIn: false};
        this.responseFacebook = this.responseFacebook.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
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
            isLoggedIn: false
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
        if (isLoggedIn) {
            header =
                <div className="App-navbar">
                    <div className="App-navbar-items">
                    <img src={logo} className="App-logo-login" alt="logo"/>
                        <span style={{'margin-right': "10px"}}> Pages </span>
                        <Button type="logout" text="Log out" onClick={this.handleLogoutClick}/>
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
                        appId= /* App-id*/,
                        autoLoad={false}
                        fileds='id,name'
                        scope='manage_pages, publish_pages,publish_actions'
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
