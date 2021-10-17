import React, { Component } from 'react';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Card,
    CardBody,
    CardColumns,
    CardHeader,
    CardText, CardTitle, CardSubtitle
} from 'reactstrap';
import {Divider} from "@material-ui/core";


class WeatherWidget extends Component{

    state = {
        city: undefined,
        weatherData: [],
        showWeatherDate: false
    };

    constructor(props) {
        super(props);
        console.log(this.props) //toutes les infos et celles de l'utilisateur
        //quand on passe en param ex : <WeatherWidget state={this.state}
        this.state = {
            city: this.props.city
        };
    }

    async componentDidMount(){
        //const response = await fetch('/api/user', {credentials: 'include'});
        const response = await fetch("/home/service/weather?city=" + this.state.city);

        const result = await response.text();
        if (result === '') {
            this.setState({
                weatherData: ''
            })
        } else {
            this.setState({
                weatherData: JSON.parse(result),
                showWeatherDate: true
            });
            console.log(this.state.weatherData);
        }
    }

    /*
    getData(city) {
        fetch("/home/service/weather?city=" + city)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: false,
                        weatherData: result
                    });
                    console.log("weatherData:" + this.state.weatherData);
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

     */

    render() {

        return (

            this.state.showWeatherDate ?
                <Card style={{width: '18rem'}}>
                    <CardBody>
                        <CardHeader>
                            <CardTitle><CardText>Température actuelle à {this.state.city} : </CardText> {Math.round(this.state.weatherData.main.temp - 273.15) + "C°."}</CardTitle>
                        </CardHeader>
                        <CardSubtitle style={{height: '21px', marginTop: '6px'}}>
                            Condition : {this.state.weatherData.weather[0].description}
                        </CardSubtitle>
                    </CardBody>
                </Card>
                : null
        );
    }
}

export default WeatherWidget;

/*
pour l'icon de weather
<div>
    <img className="city-icon" src={'../../public/img/${this.state.weatherData.weather[0].icon}.png'}/>
</div>
 */


/*
this.state.showWeatherDate ?
            <div>
                The temperature in {this.state.city} is :
                <div>
                    {Math.round(this.state.weatherData.main.temp - 273.15) + "C°."}
                    <br/>
                    <div>
                        {this.state.weatherData.weather[0].description}
                    </div>
                </div>
            </div>
                : null
 */