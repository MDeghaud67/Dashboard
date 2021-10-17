import React from 'react';

class HumidWidget extends React.Component{

    render(){
        return(
            <div>
                The humidity in {this.props.city} is : {this.props.weatherData.main.humidity}%.
            </div>
        )
    }
}

export default HumidWidget;
