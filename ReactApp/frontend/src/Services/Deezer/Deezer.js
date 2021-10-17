import React from 'react';
import Button from "../../Button";
import WidgetForm from "../../Forms/WidgetForm";
import WidgetTemplate from "../Deezer/DeezerWidgets/WidgetTemplate";
import ArtistWidget from "./DeezerWidgets/ArtistWidget";
import SongWidget from "./DeezerWidgets/SongWidget";
// import TempWidget from "./WeatherWidgets/TempWidget";
// import WidgetTemplate from "./WeatherWidgets/WidgetTemplate";


class Deezer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widgets : [],
            showWidgetForm : false,
            id : 0,
        }
    }


    handleNewWidget = (widgetType) => {
        console.log("Current id is" + this.state.id)
        this.state.widgets.push({type : widgetType,
            id : this.state.id});
        console.log("creating new widget with id " + this.state.id)
        this.setState({id : this.state.id + 1})
    }

    handleClick = () => {
        this.setState({showWidgetForm : !this.state.showWidgetForm})
    }

    handleWidgetDelete = (id) =>{
        for(let index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];
            console.log("checking id" + widget.id)
            if(widget.id === id){

                this.state.widgets.splice(index, 1);
                index--;

            }
        }
        console.log(this.state.widgets)
        this.forceUpdate();
    }

    render(){
        let widgetOptions = [["artist", "Artist Widget"],["song", "Song Widget"],["picture", "Picture Widget"],["play", "Player Widget"]];

        let shownWidgets = [];
        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];

            shownWidgets.push(<div>
                <WidgetTemplate id = {widget.id} type = {widget.type} handleDelete = {this.handleWidgetDelete}/>
            </div>)
        }

        return(
            <div>
                <div>
                    Service Deezer <Button handleClick={this.handleClick}/>
                    { this.state.showWidgetForm ? <WidgetForm options = {widgetOptions} onSubmitWidget={this.handleNewWidget}/> : null }
                </div>
                {shownWidgets}
            </div>
        )
    }
}

export default Deezer
