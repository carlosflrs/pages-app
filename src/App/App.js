import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';

import logo from '../imgs/pages.svg';
import './App.css';
import Button from '../Button/Button.js'


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
            isLoggedIn: true
        });
    }

    responseFacebook(response) {
        if (response.error || response.status === "unknown") {
            console.log("Something went wrong. Don't set userData");
        } else {
            this.handleLoginClick(response);
        }
        console.log("Response:");
        console.log(response);
    }

    render() {
        //TODO: Render a <Posts> here and add them once logged in.
        const isLoggedIn = this.state.isLoggedIn;
        let body = null;
        let header = null;
        if (isLoggedIn) {
            header =
                    <div className="App-header-login">
                        <div className="App-header-home">
                            <img src={logo} className="App-logo-login" alt="logo"/>
                            <Button text="Pages"/>
                            <Button text="Posts"/>
                            <Button text="Publish"/>
                        </div>
                    </div>
            body =
                    <div className="App-body-login">
                        Hello {this.state.userData["name"]} you are logged in!
                    </div>
        } else {
            console.log(isLoggedIn);
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
                            fileds='name,email,picture'
                            callback={this.responseFacebook}
                        />
                    </div>
        }
        return (
                <div className="App">
                    {header}
                    {body}
                </div>
               );
    }

}

export default App;
