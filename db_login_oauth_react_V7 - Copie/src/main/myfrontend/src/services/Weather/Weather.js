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
        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];
            if(widget.id === id){
                this.state.widgets.splice(index, 1)
                index--;
            }
        }
        this.forceUpdate();
    }

    render(){
        let shownWidgets = [];
        let options = [["temp", "Temperature Widget"],["wind", "Wind Widget"],["humid", "Humidity"],["global","Global"]];

        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];
            shownWidgets.push(<div>
                <WidgetTemplate type = {widget.type}  id = {widget.id} key = {widget.id} handleDelete = {this.handleWidgetDelete}/>
                    </div>)
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
