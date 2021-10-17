import React, { Component } from 'react';
import axios from "axios";

class TempWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {city : props.city,
            selectedCity : props.city,
            weatherData : '',
            temperature: [],
            weatherDataLoaded : false};
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        alert("unmounting")
    }

    getData(city) {

        //return axios.get("/service/weather?city=" + city);

        fetch("/service/weather?city=" + city)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
/*
    handleChange = (event) =>{
        // event.preventDefault();
        this.setState({selectedCity : event.target.value});
    }
    submitHandler = (event) =>{
        event.preventDefault();
        console.log('submitted')
        this.setState({city : this.state.selectedCity})
        this.getData(this.state.selectedCity)
    }

 */

    render(){
        if(this.state.weatherDataLoaded){
            return(<div>
                {this.weatherForm}
                <div>
                    The temperature in {this.state.city} is : {(Math.round(this.state.weatherData.main.temp -273.15))}ºC
                </div>
            </div>)
        }else{
            return(<div>
                {this.weatherForm}
            </div>)
        }

    }
}

export default TempWidget;


/*
class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/list_users')
            .then(response => response.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    /*
    async remove(id) {
        await fetch(`/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({groups: updatedGroups});
        });
    }

     */
/*
    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = groups.map(group => {
            const address = `${group.name || ''} ${group.email || ''}`;
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                <td>{address}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                    </div>
                    <h3>My JUG Tour</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Location</th>
                            <th>Events</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default GroupList;
*/