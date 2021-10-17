import React, { Component } from 'react';
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";


class CalendarWidget extends Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        city: undefined,
        calendarId: 'testmail3693@gmail.com',
        evenement: [],
        showWeatherDate: false
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            calendarId: this.calendarId,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
    }

    async componentDidMount(){
        const {calendarId, csrfToken} = this.state;
        //const response = await fetch('/api/user', {credentials: 'include'});
        const response = await fetch("/home/service/calendar?calendarId=testmail3693@gmail.com", {
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'});


        const result = await response.text();
        if (result === '') {
            this.setState({
                evenement: ''
            })
        } else {
            this.setState({
                evenement: JSON.parse(result),
                showWeatherDate: true
            });
        }
    }

    render() {

        return (
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
        );
    }

}

export default withCookies(withRouter(CalendarWidget));

/*
pour l'icon de weather
<div>
    <img className="city-icon" src={'../../public/img/${this.state.weatherData.weather[0].icon}.png'}/>
</div>
 */