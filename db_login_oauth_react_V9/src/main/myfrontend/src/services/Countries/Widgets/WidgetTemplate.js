import React from 'react';
import {Button, Form, Input, Label} from 'reactstrap';
import {FlagWidget} from "./FlagWidget";
import {CapitalWidget} from "./CapitalWidget";
import {MiscInfoWidget} from "./MiscInfoWidget";
import {PopulationWidget} from "./Population Widget";

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

        fetch('https://restcountries.eu/rest/v2/name/' + city, {method: 'GET'})
            .then(this.handleErrors)
            .then(res => res.json())
            .then(res => {console.log(res); return res})
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

        fetch('/home/sauv/countries', {
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
                    console.log("home sauv countries");
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
            <Label>Country : </Label>
            <Input type="text" name = "Country" onChange ={this.handleChange}/>
            <Button color="outline-success" onClick={this.submitHandler}>Submit</Button>
        </Form>
    );

    render(){

        if(this.state.showErrorMessage){
            this.element = <div> We haven't found this country</div>;
        }else{
            if(this.state.weatherDataLoaded){
                switch(this.state.type){
                    case "flag":
                        this.element = <FlagWidget country = {this.state.weatherData}/>
                        break;
                    case "capital":
                        this.element = <CapitalWidget country = {this.state.weatherData}/>
                        break;
                    case "miscInfo":
                        this.element = <MiscInfoWidget country = {this.state.weatherData}/>
                        break;
                    case "population":
                        this.element = <PopulationWidget country = {this.state.weatherData}/>
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
