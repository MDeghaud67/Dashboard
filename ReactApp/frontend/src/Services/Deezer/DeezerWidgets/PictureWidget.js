import React from 'react';

class PictureWidget extends React.Component{


    render(){
        let songs = this.props.artistData.data
        let elements = [];
        console.log(songs[0].artist.picture)


        return(<div>
            <img src = {songs[0].artist.picture} />
        </div>)
    }
}

export default PictureWidget
