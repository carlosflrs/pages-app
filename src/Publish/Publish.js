import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Button from '../Button/Button.js'

/* UI */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Panel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';


class Publish extends Component {

    constructor(props) {
        super(props);
    }

    /* Before component renders. */
    componentWillMount() {
        graph.setAccessToken(this.props.page['access_token']);
        console.log("In componentWillMount Publish");
        var message = "'Testing publishing to pages'";
        console.log(this.props);
        var page_id = this.props.page['id'];
        var postUrl = "/" + page_id + "/feed?message=" + message;
        console.log("Post url");
        console.log(postUrl);
        graph.post(postUrl, function(err, res) {
            console.log("Publish callback");
            console.log(res);
            console.log(err);
        }.bind(this));
    }

    render() {
        (<div> Hello </div>);
    }

}

export default Publish;
