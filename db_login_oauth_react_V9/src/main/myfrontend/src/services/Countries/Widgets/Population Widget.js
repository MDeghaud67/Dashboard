import React from 'react';

export class PopulationWidget extends React.Component{

    render(){
        return(
            <div>
                The population of {this.props.country[0].name} is {this.props.country[0].population}.
            </div>
        )
    }
}


