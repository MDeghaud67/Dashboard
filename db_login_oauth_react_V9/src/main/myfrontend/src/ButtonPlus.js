import React from 'react';
import plus from './services/img/plus.png'
import {Button} from "reactstrap";

class ButtonPlus extends React.Component{

    render() {
        return (
                <Button color="outline-info" onClick={this.props.handleClick} ><img src = {plus} style={{height : 1.5+'em'}} alt = "plusButton"/></Button>
        );
    }
}

export default ButtonPlus;
