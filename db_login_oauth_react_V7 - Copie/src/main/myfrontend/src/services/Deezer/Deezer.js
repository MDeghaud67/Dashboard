import React, { Component } from 'react';
import ButtonPlus from "../../ButtonPlus";
import WidgetForm from "../../Forms/WidgetForm";
import WidgetTemplate from "../Deezer/DeezerWidgets/WidgetTemplate";
import Home from "../../Home";

import {withRouter} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';


class Deezer extends Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            widgets : [],
            showWidgetForm : false,
            id : 0,
            artistSession: [],
            sessionActive: '',
            user: props,
            userDataDeezer: [],
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        console.log(this.state.user);
    }

    componentDidMount() {

        if (this.state.user["user"].dataDeezer.length !== 0) {
            //let convertUserDataDeezer = JSON.parse(this.state.user["user"].dataDeezer);
            this.state.userDataDeezer.push(JSON.parse(this.state.user["user"].dataDeezer))
            this.setState({sessionActive : this.state.userDataDeezer[0]});
            console.log("convert");
            console.log(this.state.userDataDeezer[0]);

            //nombre de widget à créer
            for (let i=0; i < this.state.userDataDeezer[0].length; i++) {
                //this.setState({artistSession: convertUserDataDeezer[i].artist})
                this.state.widgets.push({type: this.state.userDataDeezer[0][i].type,
                    id: this.state.userDataDeezer[0][i].index})

                this.setState({id: this.state.userDataDeezer[0][i].index});
                this.state.artistSession.push(this.state.userDataDeezer[0][i].artist);

                console.log("nombre de widget init");
                console.log(this.state.widgets);
                console.log(this.state.artistSession);
            }
            this.setState({id: this.state.userDataDeezer[0].length});
            console.log("id hors for");
            console.log(this.state.userDataDeezer[0]);
            console.log(this.state.userDataDeezer[0].length);
            console.log(this.state.id);
        }
    }

    handleNewWidget = (widgetType) => {
        console.log("Current id is" + this.state.id)
        this.state.widgets.push({type : widgetType,
            id : this.state.id});
        console.log("creating new widget with id " + this.state.id)
        this.setState({id : this.state.id + 1})
    }

    //Click button plus => affichage "choose a widget"
    handleClick = () => {
        this.setState({showWidgetForm : !this.state.showWidgetForm})
    }

    handleWidgetDelete = (id) =>{

        let reconstructionDataDeezer = this.state.userDataDeezer[0];
        console.log("reconstructionDataDeezer");
        console.log(reconstructionDataDeezer);
        let index;
        for(index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];
            console.log("this.state.widgets[index]");
            console.log(this.state.widgets[index]);
            console.log("this.state.widgets");
            console.log(this.state.widgets);
            console.log("checking id" + widget.id)
            if(widget.id === id){

                this.state.widgets.splice(index, 1);

                //Changement
                reconstructionDataDeezer.splice(index, 1);
                console.log("userDataDeezer delete");
                console.log(this.state.userDataDeezer[0]);

                if (index > 0) {
                    index--;
                    id--;
                }


                break;

            }
        }

        for (let i = 0; i < reconstructionDataDeezer.length; i++) {
            reconstructionDataDeezer[i].index = i;
        }
        console.log("reconstructionDataDeezer");
        console.log(reconstructionDataDeezer);
        //this.state.userDataDeezer.splice(0, this.state.userDataDeezer[0].length, JSON.parse(JSON.stringify(reconstructionDataDeezer)));
        this.state.userDataDeezer = JSON.parse(JSON.stringify(reconstructionDataDeezer));
        console.log("this.state.userDataDeezer");
        console.log(this.state.userDataDeezer[0]);

        /*
        this.state.widgets.push({type: this.state.userDataDeezer[0][index].type,
            id: this.state.userDataDeezer[0][index].index})

         */

        console.log("index");
        console.log(index);

        console.log(this.state.userDataDeezer);

        if (this.state.userDataDeezer.length !== 0) {
            this.state.widgets.id = this.state.userDataDeezer[index].index;
            this.state.widgets.type = this.state.userDataDeezer[index].type;

            this.state.artistSession.push(this.state.userDataDeezer[index].artist);
        } else {
            this.setState({widgets: []});
        }

        console.log("userDataDeezer delete");
        console.log(this.state.userDataDeezer[0]);

        fetch('/home/delete/deezer', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.userDataDeezer),
            credentials: 'include'
        });

        //Changement

        this.forceUpdate();


    }

    render(){

        let widgetOptions = [["artist", "Artist Widget"],["song", "Song Widget"],["picture", "Picture Widget"],["play", "Player Widget"]];

        let shownWidgets = [];
        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];

            let name = this.state.artistSession[index];

            console.log("index render");
            console.log(index);

            console.log("artistSession");
            console.log(this.state.artistSession);

            console.log("name");
            console.log(name);

            if (this.state.artistSession.length !== 0) {

                console.log(name);
                console.log("render if");
                shownWidgets.push(<div>
                    <WidgetTemplate id = {widget.id} type = {widget.type} name = {this.state.artistSession[index]} userId = {this.state.user.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)

                console.log("artistSession avant slice");
                console.log(this.state.artistSession);

                this.setState({
                    artistSession: this.state.artistSession.slice(1)
                });
            } else {
                console.log("render else");
                shownWidgets.push(<div>
                    <WidgetTemplate id = {widget.id} type = {widget.type} userId = {this.state.user.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)
            }
        }

        return(
            <div>
                <div>
                    Service Deezer <ButtonPlus handleClick={this.handleClick}/>
                    { this.state.showWidgetForm ? <WidgetForm options = {widgetOptions} onSubmitWidget={this.handleNewWidget}/> : null}
                </div>
                {shownWidgets}

            </div>
        )
    }
}

export default withCookies(withRouter(Deezer));
