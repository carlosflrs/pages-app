import React, { Component } from 'react';

/* UI */
import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.text === "Posts") {
            console.log(this.props.text);
        }
    }

    render() {
        return (
                <span className="Button" onClick={this.handleClick}>
                    {this.props.text}
                </span>
               );
    }

}

export default Button;
