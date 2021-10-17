import React from 'react';
import {Button, Form} from "reactstrap";
import {Select} from "@material-ui/core";

class WidgetForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedValue : props.options[0][0]
        }
        // console.log(props.options)
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.setState({
            selectedValue : event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmitWidget(this.state.selectedValue);
    }

    render(){
        let element = []
        for(let index = 0; index < this.props.options.length; index++){
            let option = this.props.options[index];
            element.push(<option value = {option[0]} key = {option[0]}>{option[1]}</option>)
        }

        return(
            <div className="border-0 rounded p-1 m-2 bg-light">
                Choose a widget !
            <Form>
                <Select onChange={this.handleChange}>
                    {element}
                </Select>
                <Button color="outline-success" onClick={this.handleSubmit}> Submit</Button>
            </Form>
            </div>
        )
    }
}

export default WidgetForm;
