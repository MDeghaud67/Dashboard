import React from 'react';
import SongWidget from "../../Deezer/DeezerWidgets/SongWidget";
import ArtistWidget from "./ArtistWidget";
import PictureWidget from "./PictureWidget";
import PlayWidget from "./PlayWidget";
import {Button, Form, Input, Label, NavbarBrand} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class WidgetTemplate extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            idDeezer : props.id,
            typeDeezer : props.type,
            user : props.user,
            artistSession: props.name,
            infoDeezer: [],
            artist : '',
            artistData: '',
            delete: false,
            artistDataLoaded : false,
            showErrorMessage : false,
            csrfToken: cookies.get('XSRF-TOKEN')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.delete) {
            console.log("componentDidUpdate");
            this.setState({delete: false});

            window.location.href = "/";
        }
    }

    componentDidMount() {

        console.log("componentDidMount");
        //this.state.infoDeezer.push();
        this.state.infoDeezer.push({id: this.props.id,
        type: this.props.type,
        artist: this.props.name})
        console.log("infoDeezer");
        console.log(this.state.infoDeezer);

        if (this.props.name !== undefined) {
            console.log("componentDidMount get data")
            console.log(this.props.name)
            this.getData(this.state.artistSession)

        }
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.setState({formArtistField : event.target.value});
    }

    //Activated when submit button is press ed
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted');
        this.setState({artist: this.state.formArtistField});
        this.getData(this.state.formArtistField);

        const {csrfToken} = this.state;
        fetch('/home/sauv/deezer', {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.parse(JSON.stringify('{"index":'+this.props.id+',"type":"'+this.state.typeDeezer+'","artist":"'+this.state.formArtistField+'"}')),
            credentials: 'include'
        })
            .then(res => res.text())
            .then(
                (result) => {
                    this.state.user["user"] = JSON.parse(result);
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );

        //window.location.href = '//' + window.location.hostname + ':8080';
    }

    handleDeleteButton = (event) =>{
        event.preventDefault();
        console.log("I have id" + this.props.id + ",trying deletion");
        this.props.handleDelete(this.props.id);
        this.setState({delete: true});
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    getData(artist){
        try {
            fetch('/home/service/deezer/artist?value=' + artist, {method: 'GET'})
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
        <Form >
            <Label>Artist : </Label>
            <Input type="text" name ="Artist" onChange ={this.handleChange}/>
            <Button color="outline-success" onClick={this.handleSubmit}>Submit</Button>
        </Form>
    );

    render(){
        let element;

        //rajouter un autre else si le user à des widgets de la session dernière

        if(this.state.showErrorMessage){
            element = <div> We haven't found this artist</div>;
        }else{
            if(this.state.artistDataLoaded){
                switch(this.state.typeDeezer){
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
            {this.state.artistSession ? <div>{this.state.artistSession}</div> :
                this.artistForm}
            {element}
            <Button color="outline-danger" onClick = {this.handleDeleteButton}>Delete</Button>
        </div>)
    }
}

export default withCookies(withRouter(WidgetTemplate));