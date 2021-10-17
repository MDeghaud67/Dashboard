import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class Register extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        infoUser: []
    }

    infoUser = {
        name: '',
        lastName: '',
        email:'',
        password:''
    }


    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            badName: false,
            infoUser: this.infoUser,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    };

    handleChange(event) {
        const target = event.target;
        console.log("target:" + target);
        const value = target.value;
        console.log("value:" + value);
        const name = target.name;
        console.log("name:" + name);
        let infoUser = {...this.state.infoUser};
        infoUser[name] = value;
        this.setState({infoUser});
        console.log("infoUSer: " + infoUser);

    }

    async handleSubmit(event) {
        event.preventDefault();
        const {infoUser, csrfToken} = this.state;

        const response = await fetch('/home/register', {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoUser),
            credentials: 'include'
        }).then(res => res.json())
            .then(
                (result) => {
                    window.location.href = '//' + window.location.hostname + ':8080' + '/private';
                },
                (error) => {
                    this.setState({
                        badName: true
                    });
                }
            );
        /*
        const result = await response.json();
        console.log("response.json register:" + result);
        if (result !== null) {
            this.props.history.push('/');
        } else {
            this.setState({
                badName: true
            });
        }

         */
    }

    render() {
        return(
            <Container>
                <h1>Inscrivez-vous</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Prenom</Label>
                        {this.state.badName ? <span style={{color: 'red'}}> Prénom déjà utilisé !</span> : null}
                        <Input type="text" name="name" value={this.state.value}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="lastName">Nom</Label>
                        <Input type="text" name="lastName" value={this.state.value}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="email" name="email" value={this.state.value}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Mot de passe</Label>
                        <Input type="text" name="password" value={this.state.value}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">S'enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default withCookies(withRouter(Register));


/*
<div class="alert alert-success" role="alert" id="success_message">Success <i class="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>
 */

/*
<div className="row">

                <div className="col-lg-5 col-md-5 col-sm-5 col-xl-5">
                </div>

                <div class="container col-lg-6 col-md-6 col-sm-6 col-xl-6">

                    <form class="well form-horizontal" action=" " method="post"  id="contact_form">
                        <fieldset>

                            <legend>Inscrivez-vous</legend>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Prénom</label>
                                <div class="col-md-4 inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input  name="first_name" placeholder="First Name" class="form-control"  type="text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label" >Nom</label>
                                <div class="col-md-4 inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input name="last_name" placeholder="Last Name" class="form-control"  type="text"/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">E-Mail</label>
                                <div class="col-md-4 inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                        <input name="email" placeholder="E-Mail Address" class="form-control"  type="email"/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Mot de passe</label>
                                <div class="col-md-4 inputGroupContainer">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                                        <input name="password" placeholder="password" class="form-control" type="password"/>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label"/>
                                <div class="col-md-4">
                                    <button type="submit" color="primary" class="btn btn-outline-success" onClick={this.register.bind(this)}>Send <span class="glyphicon glyphicon-send"></span></button>
                                    <Button color="primary" className="float-lg-right" tag={Link} to="/">Home</Button>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                </div>

                <div className="col-lg-1 col-md-1 col-sm-1 col-xl-1">
                </div>

            </div>
 */