import React, { Component } from 'react';
import graph from 'fb-react-sdk';

/* Own Components */
import Button from '../Button/Button.js'

/* UI */
import './Posts.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Panel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {likes: {}, likes_list: ""};
        this.handleClick = this.handleClick.bind(this);
    };

    componentWillMount() {
        var likesReq = "/" + this.props.data['id'] + '/likes'
        graph.get(likesReq, function(err, res) {
            if (res) {
                console.log("Post componentWillMount");
                console.log(res);
                let likes_list = [];
                var link = "";
                res.data.forEach((like) => {
                    console.log(like);
                    link = "https://facebook.com/" + like['id'];
                    likes_list.push(<MenuItem href={link} target="_blank" eventKey="1">
                        {like['name']}
                    </MenuItem>);
                });
                this.setState({
                    likes: res.data,
                    likes_list: likes_list
                });
            }
        }.bind(this));
    };

    handleClick() {
        console.log("Post handle click");
        console.log(this.state.likes);
    };

    render() {
        let title = this.state.likes_list.length + " Likes";
        let text = null;
        let header = null;
        if ("message" in this.props.data) {
            header = "Post";
            text = this.props.data['message'];
        } else if ("story" in this.props.data) {
            header = "Update";
            text = this.props.data['story'];
        }
        return (
            <div>
                <Panel header={header}>
                    {text}
                    <ButtonToolbar>
                      <DropdownButton style={{top: "5px"}} title={title} dropup pullRight id="dropdown-no-caret">
                        {this.state.likes_list}
                      </DropdownButton>
                    </ButtonToolbar>
                </Panel>
            </div>
        );
    };
}

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {posts: [], dataReady: false};
    }

    /* Before component renders. */
    componentWillMount() {
        console.log("Posts componentWillMount");
        console.log(this.props);
        var reqUrl = "/" + this.props.page['id'] + "/posts";
        graph.get(reqUrl, function(err, res) {
            console.log("Res response:");
            console.log(res.data);
            var posts = [];
            res.data.forEach((post) => {
                posts.push(post);
            });
            console.log("Setting state");
            this.setState({posts: posts, dataReady: true});
        }.bind(this));
    }

    render() {
        let body = null;
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
        return (
                <div className="post-body">
                    {body}
                </div>
        );
    }

}

export default Posts;
