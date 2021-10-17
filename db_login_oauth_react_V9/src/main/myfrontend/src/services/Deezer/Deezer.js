import React, { Component } from 'react';
import ButtonPlus from "../../ButtonPlus";
import WidgetForm from "../../Forms/WidgetForm";
import WidgetTemplate from "../Deezer/DeezerWidgets/WidgetTemplate";

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
            csrfToken: cookies.get('XSRF-TOKEN'),
            shownWidgets: []
        };
        console.log(this.state.user);
    }

    componentDidMount() {

        if (this.props.user.dataDeezer !== "") {

            console.log("this.props.user.dataDeezer");
            console.log(JSON.parse(this.props.user.dataDeezer));

            let parseDataDeezer = JSON.parse(this.props.user.dataDeezer);

            if (parseDataDeezer.length > 0) {

                //nombre de widget à créer
                let i;
                for (i = 0; i < parseDataDeezer.length; i++) {
                    //this.setState({artistSession: convertUserDataDeezer[i].artist})
                    this.state.widgets.push({type: parseDataDeezer[i].type,
                        id: parseDataDeezer[i].index})


                    console.log("this.props.user.dataDeezer[i]");
                    console.log(parseDataDeezer[i]);

                    this.state.artistSession.push(parseDataDeezer[i].artist);
                }
                this.setState({id: i++});
            }
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

        console.log(JSON.parse(this.props.user.dataDeezer));

        let parseDataDeezer = JSON.parse(this.props.user.dataDeezer);

        let index;
        for(index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];

            if(widget.id === id){

                console.log("widget id " + widget.id);
                console.log("id selectionné " + id);

                this.state.widgets.splice(index, 1);

                parseDataDeezer.splice(index, 1);

                this.state.artistSession.splice(index, 1);

                if (index > 0) {
                    index--;
                    id--;
                }
                break;
            }
        }

        //Réindexage des widgets
        for (let i = 0; i < this.state.widgets.length; i++) {
            this.state.widgets[i].id = i;
            parseDataDeezer[i].index = i;
            this.state.widgets[i].artist = parseDataDeezer[i].artist;
        }

        fetch('/home/delete/deezer', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parseDataDeezer),
            credentials: 'include'
        })
            .then(res => res.text())
            .then(
                (result) => {
                    this.props.user = JSON.parse(result);
                    console.log("json");
                    console.log(this.props.user);
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );

        //Changement

        //this.setState({showWidgetForm : !this.state.showWidgetForm})
        this.forceUpdate();

    }

    render(){

        let widgetOptions = [["artist", "Artist Widget"],["song", "Song Widget"],["picture", "Picture Widget"],["play", "Player Widget"]];

        let shownWidgets = [];
        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];

            console.log("widget render : " + this.state.widgets);
            console.log("widget render [index] : ");
            console.log(this.state.widgets);

            let name = this.state.artistSession[index];

            console.log("name render");
            console.log(name);

            if (this.state.artistSession.length > 0) {

                console.log(name);
                console.log("render if");
                shownWidgets.push(<div>
                    <WidgetTemplate id = {widget.id} type = {widget.type} name = {this.state.artistSession[index]} userId = {this.state.user.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)

                console.log("shownWidgets");
                console.log(shownWidgets);
                console.log("artistSession avant slice");
                console.log(this.state.artistSession);

                /*
                this.setState({
                    artistSession: this.state.artistSession.slice(1)
                });

                 */

            } else {
                console.log("render else");
                shownWidgets.push(<div>
                    <WidgetTemplate id = {widget.id} type = {widget.type} name = {this.state.artistSession[index]} userId = {this.state.user.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
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
