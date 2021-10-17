import React from 'react';

class SongWidget extends React.Component{


    render(){
        let songs = this.props.artistData.data
        let elements = [];

        for(let index = 0; index < 15; index ++){
            elements.push(
                songs[index].title
            )
        }

        let element = <ul>
            {elements.map(entry => (
                <li key={entry}>{entry}</li>
            ))}
        </ul>


        return(<div>
            {element}
        </div>)
    }
}

export default SongWidget
