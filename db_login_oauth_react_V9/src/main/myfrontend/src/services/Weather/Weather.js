import React from 'react';
import ButtonPlus from "../../ButtonPlus";
// import WidgetForm from "./WeatherForms/WidgetForm";
import TempWidget from "./WeatherWidgets/TempWidget";
import WidgetForm from "../../Forms/WidgetForm";
import WidgetTemplate from "./WeatherWidgets/WidgetTemplate";


class Weather extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widgets : [],
            showWidgetForm : false,
            id : 0,
            villeWeather: [],
            user: props
        }
    }

    componentDidMount() {
        console.log(this.props.user.dataWeather);

        if (this.props.user.dataWeather !== "") {

            console.log("this.props.user.dataWeather");
            console.log(this.props.user.dataWeather);

            let parseDataWeather = JSON.parse(this.props.user.dataWeather);

            if (parseDataWeather.length > 0) {

                //nombre de widget à créer
                let i;
                for (i = 0; i < parseDataWeather.length; i++) {
                    //this.setState({artistSession: convertUserDataDeezer[i].artist})
                    this.state.widgets.push({type: parseDataWeather[i].type,
                        id: parseDataWeather[i].index})


                    console.log("this.props.user.dataDeezer[i]");
                    console.log(parseDataWeather[i]);

                    this.state.villeWeather.push(parseDataWeather[i].city);
                }
                this.setState({id: i++});
            }
        }
    }

    handleNewWidget = (widgetType) => {
        this.state.widgets.push({type : widgetType,
            id : this.state.id});
        this.setState({id : this.state.id + 1})
    }

    handleClick = () => {
        this.setState({showWidgetForm : !this.state.showWidgetForm})
    }

    handleWidgetDelete = (id) =>{

        let parseDataWeather = JSON.parse(this.props.user.dataWeather);

        let index;
        for(index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];

            if(widget.id === id){

                this.state.widgets.splice(index, 1);

                parseDataWeather.splice(index, 1);

                this.state.villeWeather.splice(index, 1);

                if (index > 0) {
                    index--;
                    id--;
                }
                break;
            }
        }

        //Réindexage des widgets
        for (let j = 0; j < this.state.widgets.length; j++) {
            this.state.widgets[j].id = j;
            parseDataWeather[j].index = j;
            this.state.widgets[j].city = parseDataWeather[j].city;
        }

        fetch('/home/delete/weather', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parseDataWeather),
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

        this.forceUpdate();
    }

    render(){
        let shownWidgets = [];
        let options = [["temp", "Temperature Widget"],["wind", "Wind Widget"],["humid", "Humidity"],["global","Global"]];

        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];

            if (this.state.villeWeather.length > 0) {
                shownWidgets.push(<div>
                    <WidgetTemplate type = {widget.type}  id = {widget.id} ville = {this.state.villeWeather[index]} key = {widget.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)
            } else {
                shownWidgets.push(<div>
                    <WidgetTemplate type = {widget.type}  id = {widget.id} key = {widget.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)
            }
        }

        return(
            <div>
                <div>
                Service Weather <ButtonPlus handleClick={this.handleClick}/>
                { this.state.showWidgetForm ? <WidgetForm options = {options} onSubmitWidget={this.handleNewWidget}/> : null }
                </div>
                {shownWidgets}
            </div>
        )
    }
}

export default Weather
