import React from 'react';
import SongWidget from "../../Deezer/DeezerWidgets/SongWidget";
import ArtistWidget from "./ArtistWidget";
import PictureWidget from "./PictureWidget";
import PlayWidget from "./PlayWidget";

class WidgetTemplate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            type : props.type,
            artist : '',
            artistData : '',
            artistDataLoaded : false,
            showErrorMessage : false,
        }
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.setState({formArtistField : event.target.value});
    }

    //Activated when submit button is press ed
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('submitted')
        this.setState({artist : this.state.formArtistField})
        this.getData(this.state.formArtistField)
    }

    handleDeleteButton = (event) =>{
        event.preventDefault();
        console.log("I have id" + this.state.id + ",trying deletion");
        this.props.handleDelete(this.state.id);
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    getData(artist){
        try {
            fetch('http://localhost:8080/service/deezer/artist?value=' + artist, {method: 'GET'})
                .then(this.handleErrors)
                .then(res => res.json())
                .then(res => this.setState({artistData : res,
                    artistDataLoaded : true,
                    showErrorMessage : false,
                    artist : artist}))
                .catch((error) => {console.log(error);
                    this.setState({
                        showErrorMessage : true})})
        }catch (error){
            console.log('Error with HTTP request')
        }

    }

    artistForm = (
        <form >
            <label>Artist : </label>
            <input type="text" name = "Artist" onChange ={this.handleChange}/>
            <button onClick={this.handleSubmit}>Submit</button>
        </form>
    );

    render(){
        let element;

        if(this.state.showErrorMessage){
            element = <div> We haven't found this artist</div>;
        }else{
            if(this.state.artistDataLoaded){
                switch(this.state.type){
                    case("artist"):
                        element = <ArtistWidget artistData = {this.state.artistData} artist = {this.state.artist}/>
                        break;
                    case("song"):
                        element = <SongWidget artistData = {this.state.artistData}/>
                        break;
                    case("picture"):
                        element = <PictureWidget artistData = {this.state.artistData}/>
                        break;
                    case("play"):
                        element = <PlayWidget artistData = {this.state.artistData}/>
                        break;
                    default:
                        break;
                }


            }
        }

        return(<div className="p-1 m-1 border-0 rounded bg-light">
            {this.artistForm}
            {element}
            <button onClick = {this.handleDeleteButton}>Delete</button>
        </div>)
    }
}

export default WidgetTemplate
