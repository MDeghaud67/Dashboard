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
            user: props.user,
            weatherData : '',
            villeWeather: props.ville,
            weatherDataLoaded : false,
            showErrorMessage : false,};
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.delete) {
            console.log("componentDidUpdate");
            this.setState({delete: false});

            window.location.href = "/";
        }
    }

    componentDidMount() {

        if (this.props.ville !== undefined) {
            console.log("componentDidMount get data")
            console.log(this.props.name)
            this.getData(this.state.villeWeather);

        }
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
        this.setState({delete: true});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.setState({city : this.state.inputCityField})
        this.getData(this.state.inputCityField)

        fetch('/home/sauv/weather', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.parse(JSON.stringify('{"index":'+this.props.id+',"type":"'+this.state.type+'","city":"'+this.state.inputCityField+'"}')),
            credentials: 'include'
        })
            .then(res => res.text())
            .then(
                (result) => {
                    this.state.user["user"] = JSON.parse(result);
                    console.log("home sauv weather");
                    console.log(this.state.user);
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
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
                {this.state.villeWeather ? <div>{this.state.villeWeather}</div> :
                    this.weatherForm}
                {this.element}
                <Button color="outline-danger" onClick = {this.handleDeleteButton}>Delete</Button>
            </div>
        )
    }
}

export default WidgetTemplate;
