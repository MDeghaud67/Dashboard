import React from 'react';

class PlayWidget extends React.Component{


    render(){
        let songs = this.props.artistData.data
        let elements = [];

        let randomIndex = Math.floor(Math.random() * songs.length);

        return(<div>
            <iframe scrolling="no" frameBorder="0" allowTransparency="true"
                    src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=200&height=80&color=EF5466&layout=&size=medium&type=tracks&id=" + songs[randomIndex].id + "&app_id=1"}
                    width="200" height="80"/>
        </div>)
    }
}

export default PlayWidget
