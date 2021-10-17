import React from 'react';
import Button from "./Button";
import WeatherForm from "./Services/Weather/WeatherForms/WeatherForm";
import Weather from "./Services/Weather/Weather";
import Deezer from "./Services/Deezer/Deezer";
import Gouv from "./Services/Gouv/Gouv";

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showDeezerForm : false,
            showWeatherForm : false
        };
    }

    handleDeezerClick = () => {this.setState({showDeezerForm : !this.state.showDeezerForm})
    console.log(this.state.showDeezerForm)}

    handleWeatherClick = () => {this.setState({showWeatherForm : !this.state.showWeatherForm})
        console.log(this.state.showDeezerForm)}


    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 bg-primary">
                        <Deezer/>
                    </div>
                    <div className="col-sm-3 bg-success">
                        <Weather/>
                    </div>
                    <div className="col-sm-3 bg-info">
                        <Gouv/>
                    </div>
                    <div className="col-sm-3">
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
