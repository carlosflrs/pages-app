import React, { Component } from 'react';

/* UI */
import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {hadler: this.handleClick};
    };

    handleClick() {
        console.log(this.props.text);
    };

    componentWillMount() {
        if (this.props.onClick) {
            this.setState({
                handler: this.props.onClick
            });
        }
    };

    render() {
        return (
                <span className="Button" onClick={this.state.handler}>
                    {this.props.text}
                </span>
               );
    };

}

export default Button;
