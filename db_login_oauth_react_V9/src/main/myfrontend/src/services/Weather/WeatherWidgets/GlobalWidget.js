import React from 'react';

class GlobalWidget extends React.Component{

    render(){
        return(
            <div>
                In {this.props.city} :
                <br />The temperature is : {(Math.round(this.props.weatherData.main.temp -273.15))}ºC
                <br />The humidity is : {this.props.weatherData.main.humidity}%.
                <br />The wind in is moving at {this.props.weatherData.wind.speed} m/s. <br />
                It is going in direction : {this.props.weatherData.wind.deg}°.
            </div>
        )
    }
}

export default GlobalWidget;
