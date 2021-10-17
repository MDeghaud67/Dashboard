import React, { Component } from 'react';
import {object} from "prop-types";


class GouvWidget extends Component{


    constructor(props) {
        super(props);
        this.state = {
            zone: undefined,
            annee: undefined,
            jourFerie: [],
            showJourFerie: false
        };
    }
    /*

    constructor(props) {
        super(props);
        console.log(this.props) //toutes les infos et celles de l'utilisateur
        //quand on passe en param ex : <WeatherWidget state={this.state}
        this.state = {
            zone: this.props.zone,
            jourFerie: [],
            annee: this.props.annee
        };
    }

     */

    async componentDidMount(){
        //const response = await fetch('/api/user', {credentials: 'include'});
        //const response = await ...fetch
        const response = await fetch("/home/service/gouv?zone=" + "metropole" + "&annee=" + "2020", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })/*.then(response => response.json())
            .then(data => this.setState({
                jourFerie: data,
                showJourFerie: true
            }));
                console.log("jour férié: " + this.state.jourFerie);
                */

        const result = await response.json();
        if (result === '') {
            this.setState({
                jourFerie: ''
            })
        } else {
            this.setState({
                jourFerie: JSON.stringify(result),
                showJourFerie: true
            });
            console.log("jour férié: " + this.state.jourFerie);
        }

    }

    render() {

        return (
            this.state.showJourFerie ?
                <div>
                    Les jours férié en {this.state.zone}, de l'année {this.state.annee} sont :
                    <div>
                        {this.state.jourFerie}
                    </div>
                </div>
                : null
        );
    }

}

export default GouvWidget;

/*
pour l'icon de weather
<div>
    <img className="city-icon" src={'../../public/img/${this.state.weatherData.weather[0].icon}.png'}/>
</div>
 */