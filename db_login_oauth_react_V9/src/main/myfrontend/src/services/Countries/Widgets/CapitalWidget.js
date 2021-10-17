import React from 'react';

export class CapitalWidget extends React.Component{

    render(){
        return(
            <div>
                The capital of {this.props.country[0].name} is {this.props.country[0].capital}.
            </div>
        )
    }
}


