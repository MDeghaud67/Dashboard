import React from 'react';

export class FlagWidget extends React.Component{

    render(){
        return(
            <div>
                <img src = {this.props.country[0].flag} style = {{"height":"150px", "width":"225px"}}/>
            </div>
        )
    }
}


