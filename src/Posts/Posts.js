import React, { Component } from 'react';
import './Posts.css';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        return;
    }

    render() {
        // For rendering posts:
        // http://v4-alpha.getbootstrap.com/components/list-group/
        // styling https://github.com/erikras/react-redux-universal-hot-example/issues/171
        return (
            <div>
                {this.props.text}
            </div>
        );
    }

}

export default Posts;
