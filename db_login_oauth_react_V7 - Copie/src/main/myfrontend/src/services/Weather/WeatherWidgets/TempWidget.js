import React from 'react';

class TempWidget extends React.Component{

    render(){
        return(
            <div>
                The temperature in {this.props.city} is : {(Math.round(this.props.weatherData.main.temp -273.15))}ºC
            </div>
        )
    }
}

export default TempWidget;
