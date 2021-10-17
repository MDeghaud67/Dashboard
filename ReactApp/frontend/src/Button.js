import React from 'react';
import plus from './img/plus.png'

class Button extends React.Component{

    render() {
        return (
                <button onClick={this.props.handleClick} ><img src = {plus} style={{height : 1.5+'em'}} alt = "plusButton"/></button>
        );
    }
}

export default Button;
