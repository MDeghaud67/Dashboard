import React from 'react';
import TempWidget from "./TempWidget";
import WindWidget from "./WindWidget";
import HumidWidget from "./HumidWidget";
import GlobalWidget from "./GlobalWidget";
import {Button, Form, Input, Label} from "reactstrap";

class WidgetTemplate extends React.Component{
    element = <div></div>;

    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            type : props.type,
            inputCityField : '',
            city : '',
            weatherData : '',
            weatherDataLoaded : false,
            showErrorMessage : false,};
    }

    getData(city){

        fetch('/home/service/weather?city=' + city, {method: 'GET'})
            .then(this.handleErrors)
            .then(res => res.json())
            .then(res => this.setState({weatherData : res,
                weatherDataLoaded : true,
                showErrorMessage : false,
                city : city}))
            .catch((error) => {console.log(error);
                this.setState({
                    showErrorMessage : true})})
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.setState({inputCityField : event.target.value});
    }

    handleDeleteButton = (event) =>{
        event.preventDefault();
        this.props.handleDelete(this.state.id);
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.setState({city : this.state.inputCityField})
        this.getData(this.state.inputCityField)
    }

    weatherForm = (
        <Form >
            <Label>City : </Label>
            <Input type="text" name = "City" onChange ={this.handleChange}/>
            <Button color="outline-success" onClick={this.submitHandler}>Submit</Button>
        </Form>
    );

    render(){

        if(this.state.showErrorMessage){
            this.element = <div> We haven't found this city</div>;
        }else{
        if(this.state.weatherDataLoaded){
                switch(this.state.type){
                    case "temp":
                        this.element = <TempWidget weatherData = {this.state.weatherData} city = {this.state.city}/>
                        break;
                    case "wind":
                        this.element = <WindWidget weatherData = {this.state.weatherData} city = {this.state.city}/>
                        break;
                    case "humid":
                        this.element = <HumidWidget weatherData = {this.state.weatherData} city = {this.state.city}/>
                        break;
                    case "global":
                        this.element = <GlobalWidget weatherData = {this.state.weatherData} city = {this.state.city}/>
                        break;
                }
            }
        }

        return(
            <div className="p-1 m-1 border-0 rounded bg-light">
                {this.weatherForm}
                {this.element}
                <Button color="outline-danger" onClick = {this.handleDeleteButton}>Delete</Button>
            </div>
        )
    }
}

export default WidgetTemplate;
