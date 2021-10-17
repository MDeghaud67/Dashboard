import React,  {Component, createElement} from 'react';
import {Grid, makeStyles, SvgIcon} from '@material-ui/core';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {
    Button,
    CardColumns,
    Collapse,
    Container, Form, Input, Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import { withCookies } from 'react-cookie';
import WeatherWidget from './services/WeatherWidget';
import CalendarWidget from "./services/CalendarWidget";
import GouvWidget from "./services/GouvWidget";

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined,
        city: undefined,
        showWeatherService: false,
        csrfToken: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
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

    logout() {
        fetch('/home/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = "/logout";
            });
    }

    register() {
        fetch("/home/register")
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

    handleChange(event) {
        this.setState({
            city: event.target.value,
        });
    }


    handleSubmit(event) {
        //alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();
        this.setState({
            //city: event.target.value,
            showWeatherService: true
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

                <Form onSubmit={this.handleSubmit}>
                    <Label>
                        Nom :
                        <Input type="text" value={this.state.value} onChange={this.handleChange} />
                    </Label><Input style={{width: '90px'}} type="submit" value="Envoyer"/><br/>
                    {this.state.showWeatherService ?
                        <CardColumns>
                                <WeatherWidget city={this.state.city}/>
                                <GouvWidget/>
                        </CardColumns> : null}
                </Form>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {this.state.isAuthenticated ?
                                    <Button color="link" onClick={this.logout}>Se déconnecter</Button>
                                    : <div>
                                        <Button color="link" onClick={this.login}>Se connecter</Button>
                                        <Button color="link"><Link to="/register">S'inscrire</Link></Button>
                                    </div>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
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
// ligne 131 {Math.round(this.state.weatherData.main.temp - 273.15) + "C°."}
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