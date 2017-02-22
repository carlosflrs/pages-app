import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Posts from '../Posts/Posts.js'
import Publish from '../Publish/Publish.js'

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
        graph.get("/me/accounts", function(err, res) {
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
            body =
                <div>
                    <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                        {pages_arr}
                    </Tabs>
                    <Publish page={this.state.pages[1]}/>
                </div>
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
