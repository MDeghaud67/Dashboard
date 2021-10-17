import React from 'react';

export class MiscInfoWidget extends React.Component{

    render(){
        return(
            <div>
                The gini coefficient of {this.props.country[0].name} is {this.props.country[0].gini}.
                <br/>The calling code of {this.props.country[0].name} is {this.props.country[0].callingCodes[0]}
                <br/>The currency of {this.props.country[0].name} is the {this.props.country[0].currencies[0].name}
            </div>
        )
    }
}


