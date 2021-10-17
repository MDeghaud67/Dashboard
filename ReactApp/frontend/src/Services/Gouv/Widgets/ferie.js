import React from 'react';

class FerieWidget extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            type : props.type,
            annee : 2020,
            anneeField : '',
            ferieData : '',
            ferieDataLoaded : false,
            showErrorMessage : false,
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


    getData(annee){
        try {
            fetch('https://calendrier.api.gouv.fr/jours-feries/metropole/' + annee + '.json' , {method: 'GET'})
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
        <form >
            <label>Année : </label>
            <input type="text" name = "Annee" onChange ={this.handleChange}/>
            <button onClick={this.handleSubmit}>Submit</button>
        </form>
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
            {this.ferieForm}
            {element}
            <button onClick = {this.handleDeleteButton}>Delete</button>
        </div>)
    }
}

export default FerieWidget
