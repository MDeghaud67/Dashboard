import React from 'react';

class WindWidget extends React.Component{

    render(){
        return(
            <div>
                The wind in {this.props.city} is moving at {this.props.weatherData.wind.speed} m/s. <br />
                It is going in direction : {this.props.weatherData.wind.deg}°.
            </div>
        )
    }
}

export default WindWidget;
