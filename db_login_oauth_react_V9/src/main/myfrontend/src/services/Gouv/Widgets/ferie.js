import React from 'react';
import {Button, Form, Input, Label} from "reactstrap";

class FerieWidget extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            type : props.type,
            annee : 2020,
            anneeField : '',
            ferieData : '',
            user: props.user,
            anneeGouv: props.annee,
            ferieDataLoaded : false,
            showErrorMessage : false,
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

        console.log("componentDidMount année");
        console.log(this.props.annee);
        if (this.props.annee !== undefined) {
            console.log("componentDidMount get data")
            console.log(this.props.annee)
            this.getData(this.state.anneeGouv);

        }
    }

    handleChange = (event) =>{
        event.preventDefault();
        this.setState({anneeField : event.target.value});
    }

    //Activated when submit button is press ed
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('submitted')
        this.setState({annee : this.state.anneeField})
        this.getData(this.state.anneeField)

        fetch('/home/sauv/gouv', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.parse(JSON.stringify('{"index":'+this.props.id+',"type":"'+this.state.type+'","annee":"'+this.state.anneeField+'"}')),
            credentials: 'include'
        })
            .then(res => res.text())
            .then(
                (result) => {
                    console.log("user sauv gouv");
                    console.log(this.state.user);
                    this.state.user["user"] = JSON.parse(result);
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    handleDeleteButton = (event) =>{
        event.preventDefault();
        console.log("I have id" + this.state.id + ",trying deletion");
        this.props.handleDelete(this.state.id);
        this.setState({delete: true});
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    getData(annee){
        try {
            fetch("/home/service/gouv?annee=" + annee, {method: 'GET'})
                .then(this.handleErrors)
                .then(res => res.json())
                .then(res => this.setState({ferieData : res,
                    ferieDataLoaded : true,
                    showErrorMessage : false,
                    annee : annee}))
                .catch((error) => {console.log(error);
                    this.setState({
                        showErrorMessage : true})})
        }catch (error){
            console.log('Error with HTTP request')
        }

    }

    ferieForm = (
        <Form >
            <Label>Année : </Label>
            <Input type="text" name = "Annee" onChange ={this.handleChange}/>
            <Button color="outline-success" onClick={this.handleSubmit}>Submit</Button>
        </Form>
    );

    render(){
        let element;

        if(this.state.showErrorMessage){
            element = <div> We haven't found this year</div>;
        }else{
            if(this.state.ferieDataLoaded){
                let entries = Object.entries(this.state.ferieData)
                let entriesAsText = [];
                entries.forEach(entry => {
                    entriesAsText.push( entry[1] + " : " + entry[0])
                })

                element = <ul>
                    {entriesAsText.map(entry => (
                        <li key={entry}>{entry}</li>
                    ))}
                </ul>
            }
        }

        return(<div className="p-1 m-1 border-0 rounded bg-light">
            Widget jours férié
            {this.state.anneeGouv ? <div>{this.state.anneeGouv}</div> :
                this.ferieForm}
            {element}
            <Button color="outline-danger" onClick = {this.handleDeleteButton}>Delete</Button>
        </div>)
    }
}

export default FerieWidget
