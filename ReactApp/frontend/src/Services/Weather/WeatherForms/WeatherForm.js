import React from 'react';

class WeatherForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = { city: 'Strasbourg' };
    }

    handleChange = (event) =>{
        this.setState({city : event.target.value});
    }
    submitHandler = (event) =>{
        event.preventDefault();
    }

    render(){
        return(
            <form >
                <select
                    value={this.state.city}
                    onChange={this.handleChange}
                >
                    <option value="Strasbourg">Strasbourg</option>
                    <option value="Lyon">Lyon</option>
                    <option value="Paris">Paris</option>
                </select>

                <button onClick={this.submitHandler}>Submit</button>
            </form>
        )
    }

}

export default WeatherForm;
