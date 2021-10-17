import React,  {Component, createElement} from 'react';
import {Grid, makeStyles, SvgIcon} from '@material-ui/core';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {
    Button, Card,
    CardColumns,
    Col,
    Collapse,
    Container,
    Form,
    Input,
    Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import { withCookies } from 'react-cookie';
import Deezer from "./services/Deezer/Deezer";
import Weather from "./services/Weather/Weather";
import Gouv from "./services/Gouv/Gouv";

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
        this.state = {
            showDeezerForm : false,
            showWeatherForm : false
        }
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
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleDeezerClick = () => {this.setState({showDeezerForm : !this.state.showDeezerForm})
        console.log(this.state.showDeezerForm)}

    handleWeatherClick = () => {this.setState({showWeatherForm : !this.state.showWeatherForm})
        console.log(this.state.showDeezerForm)}



    render() {

        const message = this.state.user ?
            <h2>Bienvenue, {this.state.user.name} !</h2> :
            <p>Connectez-vous ou inscrivez-vous pour accéder à votre Dashboard.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <br/>
                <CardColumns>
                    <Card>
                        <Deezer user={this.state.user}/>
                    </Card>
                    <Card>
                        <Weather user={this.state}/>
                    </Card>
                    <Card>
                        <Gouv user={this.state}/>
                    </Card>
                </CardColumns>
            </div> :
            null



        //NavBar
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