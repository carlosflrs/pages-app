import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Posts from '../Posts/Posts.js'

/* UI */
import './Pages.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = {pages: [], dataReady: false};
        this.componentWillMount = this.componentWillMount.bind(this);
    }

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
    }

    render() {
        // For rendering posts:
        // http://v4-alpha.getbootstrap.com/components/list-group/
        // styling https://github.com/erikras/react-redux-universal-hot-example/issues/171
        let body = null;
        if (this.state.dataReady) {
            body =
                <div>
                    <Posts page={this.state.pages[1]}/>
                </div>
        } else {
            body =
                <div>
                    Data not ready.
                </div>
        }
        return (
                <div className="Posts">
                    {body}
                </div>
        );
    }

}

export default Pages;
