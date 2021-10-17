import React from 'react';
import ButtonPlus from "../../ButtonPlus";
// import WidgetForm from "./WeatherForms/WidgetForm";
import WidgetForm from "../../Forms/WidgetForm";
import FerieWidget from "./Widgets/ferie";


    class Gouv extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            widgets : [],
            showWidgetForm : false,
            id : 0,
            user: props,
            anneeGouv: []
        }
    }

    componentDidMount() {

        if (this.props.user.dataGouv !== "") {

            console.log("this.props.user.dataGouv");
            console.log(this.props.user.dataGouv);

            let parseDataGouv = JSON.parse(this.props.user.dataGouv);

            if (parseDataGouv.length > 0) {

                //nombre de widget à créer
                let i;
                for (i = 0; i < parseDataGouv.length; i++) {
                    //this.setState({artistSession: convertUserDataDeezer[i].artist})
                    this.state.widgets.push({type: parseDataGouv[i].type,
                        id: parseDataGouv[i].index})


                    console.log("this.props.user.dataDeezer[i]");
                    console.log(parseDataGouv[i]);

                    this.state.anneeGouv.push(parseDataGouv[i].annee);
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

        let parseDataGouv = JSON.parse(this.props.user.dataGouv);

        let index;
        for(index = 0; index < this.state.widgets.length; index++){

            let widget = this.state.widgets[index];

            if(widget.id === id){

                this.state.widgets.splice(index, 1)

                parseDataGouv.splice(index, 1);

                this.state.anneeGouv.splice(index, 1);

                if (index > 0) {
                    index--;
                    id--;
                }
                break;
            }
        }

        //Réindexage des widgets
        for (let k = 0; k < this.state.widgets.length; k++) {
            this.state.widgets[k].id = k;
            parseDataGouv[k].index = k;
            this.state.widgets[k].annee = parseDataGouv[k].annee;
        }

        fetch('/home/delete/gouv', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parseDataGouv),
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
        let options = [["ferie", "Jours Ferié"]];

        for(let index = 0; index < this.state.widgets.length; index++){
            let widget = this.state.widgets[index];

            if (this.state.anneeGouv.length > 0) {
                shownWidgets.push(<div>
                    <FerieWidget type = {widget.type}  id = {widget.id} annee = {this.state.anneeGouv[index]} key = {widget.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)
            } else {
                shownWidgets.push(<div>
                    <FerieWidget type = {widget.type}  id = {widget.id} key = {widget.id} user = {this.state.user} handleDelete = {this.handleWidgetDelete}/>
                </div>)
            }

        }

        return(
            <div>
                <div>
                    Service Gouv <ButtonPlus handleClick={this.handleClick}/>
                    { this.state.showWidgetForm ? <WidgetForm options = {options} onSubmitWidget={this.handleNewWidget}/> : null }
                </div>
                {shownWidgets}
            </div>
        )
    }
}

export default Gouv
