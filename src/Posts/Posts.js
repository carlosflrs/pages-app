import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Button from '../Button/Button.js'

/* UI */
import './Posts.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Well } from 'react-bootstrap';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {likes: {}}
        this.handleClick = this.handleClick.bind(this);
    };

    componentWillMount() {
        var likesReq = "/" + this.props.data['id'] + '/likes'
        graph.get(likesReq, function(err, res) {
            if (res) {
                console.log("Post componentWillMount");
                console.log(res);
                this.setState({
                    likes: res.data
                });
            }
        }.bind(this));
    };

    handleClick() {
        console.log(this.state.likes);
    };

    render() {
        return (
            <div>
                <Well bsSize="large" className="well"> {this.props.data['message']}
                    <Button text="Likes" onClick={this.handleClick}/>
                </Well>
            </div>
        );
    };
}

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: [],
                        likes: {},
                        dataReady: false,
                        likesReady: false};
    }

    /* Before component renders. */
    componentWillMount() {
        console.log("Posts componentWillMount");
        console.log(this.props);
        var reqUrl = "/" + this.props.page['id'] + "/feed";
        var likesReq = "";
        graph.get(reqUrl, function(err, res) {
            console.log("Res response:");
            console.log(res.data);
            var posts = [];
            var updates = [];
            var post;
            var i;
            for (i = 0; i < res.data.length; i+=1) {
                post = res.data[i];
                // if ('message' in post) {
                posts.push(post);
            }
            console.log("Setting state");
            this.setState(
                {posts: posts,
                    dataReady: true}
            );
        }.bind(this));
    }

    render() {
        let body = null;
        console.log("Rendering");
        console.log(this.state.dataReady);
        if (this.state.dataReady) {
            var rows = [];
            console.log(this.state.posts);
            this.state.posts.forEach((post) => {
                //TODO: Add type here to show update or post in <Post> component.
                rows.push(<Post data={post}/>);
            });
            body =
                <div>
                    {rows}
                </div>
        } else {
            body =
                <div>
                    // Do a spinner of sorts if posts take to long to render due to likes.
                    Data not ready.
                </div>
        }
        return (
                <div>
                    {body}
                </div>
        );
    }

}

export default Posts;
