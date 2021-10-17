import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            city: '',
            showWeatherService: false,
            weatherData: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        //const response = await fetch('/api/user', {credentials: 'include'});
        const response = await fetch('/home/home', {credentials: 'include'});

        const body = await response.text();
        if (body === '') {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, user: JSON.parse(body)})
        }

    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    /*
    logout() {
        fetch('/home/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

     */


    logout() {
        fetch('/home/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = "/logout";
            });
    }




    handleChange(event) {
        this.setState({
            city: event.target.value,
        });
    }
    handleSubmit(event) {
        //alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();
        //this.setState({city: this.state.value})
        /*
        this.getData(this.state.value).then((response) => {
            this.setState({temp: response.data})
        });

         */
        this.setState({
            showWeatherService: !this.state.showWeatherService
        });



        fetch("/home/service/weather?city=" + this.state.city)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: false,
                        weatherData: result//.weatherData
                    });
                    console.log("test" + this.state.weatherData)
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
        this.setState({
            showWeatherService: !this.state.showWeatherService
        });
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.name}!</h2> :
            <p>Please log in to manage your JUG Tour.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/list_users">Manage JUG Tour</Link></Button>
                <br/>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom :
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Envoyer"/>
                    {this.state.showWeatherService ?
                        <div>
                            The temperature in {this.state.city} is :
                            <div>
                                {
                                    this.state.weatherData.map(
                                        temperature =>
                                            <tr key = {temperature.main}>
                                                <td>{temperature.main.temp}</td>
                                            </tr>
                                    )
                                }
                            </div>
                        </div> : null}
                </form>

                <br/>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {message}
                    {button}
                </Container>
            </div>
        );
    }
}

export default withCookies(Home);


// ligne 59 -> <a href={"/logout"}>Logout</a>
// ligne 128 {(Math.round(this.state.weatherData.main.temp -273.15))}ºC
//ligne 158 -> <Button color="primary" onClick={this.login}>Login</Button>;


/*
<form onSubmit={this.handleSubmit}>
                    <label>
                        Nom :
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Envoyer"/>
                    {this.state.showWeatherService ?
                        <div>
                            The temperature in {this.state.city} is :
                            <div>
                                {
                                    this.state.weatherData.map(
                                        temperature =>
                                            <tr key = {temperature.main}>
                                                <td>{temperature.temp}</td>
                                            </tr>
                                    )
                                }
                            </div>
                            <p>{this.state.weatherData.main.temp}</p>
                        </div> : null}
                </form>
 */