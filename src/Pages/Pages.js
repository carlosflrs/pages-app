import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Posts from '../Posts/Posts.js'

/* UI */
import './Pages.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Tabs, Tab } from 'react-bootstrap';


class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = {pages: [], dataReady: false};
    };

    componentWillMount() {
        console.log("Pages componentWillMount");
        console.log(this.props);
        graph.get("/me/accounts", function(err, res) {
            console.log("In componentWillMount");
            console.log(res['data']);
            this.setState(
                {pages: res.data,
                    dataReady: true}
            );
        }.bind(this));
    };

    render() {
        let body = null;
        if (this.state.dataReady) {
            var pages_arr = [];
            var i;
            for (i=0; i < this.state.pages.length; i+=1) {
                pages_arr.push(<Tab eventKey={i} title={this.state.pages[i]['name']}>
                        <Posts page={this.state.pages[i]}/>
                    </Tab>);
            }
            body = <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        {pages_arr}
                    </Tabs>
        } else {
            body = <div className="loader"></div>;
        }
        return (
                <div className="page-container">
                    {body}
                </div>
        );
    }

}

export default Pages;
