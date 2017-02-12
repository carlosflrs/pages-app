import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.text);
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
