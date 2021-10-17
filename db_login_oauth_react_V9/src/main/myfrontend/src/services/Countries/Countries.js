import React from 'react';
import ButtonPlus from "../../ButtonPlus";
import WidgetForm from "../../Forms/WidgetForm";
import WidgetTemplate from "./Widgets/WidgetTemplate";


class Countries extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widgets : [],
            showWidgetForm : false,
            id : 0,
            user: props.user
        }
    }

    componentDidMount() {
        console.log(this.props.user.dataCountries);

        if (this.props.user.dataCountries !== "") {

            console.log("this.props.user.dataCountries");
            console.log(this.props.user.dataCountries);

            let parseDataWeather = JSON.parse(this.props.user.dataCountries);

            if (parseDataWeather.length > 0) {

                //nombre de widget à créer
                let i;
                for (i = 0; i < parseDataWeather.length; i++) {
                    this.state.widgets.push({type: parseDataWeather[i].type,
                        id: parseDataWeather[i].index})


                    console.log("this.props.user.dataDeezer[i]");
                    console.log(parseDataWeather[i]);

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

        let parseDataWeather = JSON.parse(this.props.user.dataCountries);

        let index;
        for(index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];

            if(widget.id === id){

                this.state.widgets.splice(index, 1);

                parseDataWeather.splice(index, 1);



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

        fetch('/home/delete/countries', {
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
        let options = [["flag", "Flag Widget"],["capital", "Capital Widget"],["miscInfo", "Misc Info Widget"],["population","Population Widget"]];

        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];


                shownWidgets.push(<div>
                    <WidgetTemplate type = {widget.type}  id = {widget.id} key = {widget.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)

        }

        return(
            <div>
                <div>
                    Service Countries <ButtonPlus handleClick={this.handleClick}/>
                    { this.state.showWidgetForm ? <WidgetForm options = {options} onSubmitWidget={this.handleNewWidget}/> : null }
                </div>
                {shownWidgets}
            </div>
        )
    }
}

export default Countries
