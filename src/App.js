import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import graph from 'fb-react-sdk';

import logo from './logo.svg';
import './App.css';


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
        if (isLoggedIn) {
            body = <div> Hello {this.state.userData["name"]} you are logged in! </div>
        } else {
            console.log(isLoggedIn);
            body = 
                    <FacebookLogin
                        appId='333756033684992'
                        autoLoad={false}
                        fileds='name,email,picture'
                        callback={this.responseFacebook}
                    />
        }
        return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    {body}
                    <div className="App-footer"> </div>
                </div>
               );
    }

}

export default App;
