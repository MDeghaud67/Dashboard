import React from 'react';
import {Button, Form} from "reactstrap";
import {Select} from "@material-ui/core";

class WeatherForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = { city: 'Strasbourg' };
    }

    handleChange = (event) =>{
        this.setState({city : event.target.value});
    }
    submitHandler = (event) =>{
        event.preventDefault();
    }

    render(){
        return(
            <Form >
                <Select
                    value={this.state.city}
                    onChange={this.handleChange}
                >
                    <option value="Strasbourg">Strasbourg</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Paris">Paris</option>
                </Select>

                <Button color="outline-success" onClick={this.submitHandler}>Submit</Button>
            </Form>
        )
    }

}

export default WeatherForm;
