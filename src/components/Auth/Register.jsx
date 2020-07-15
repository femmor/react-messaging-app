import React, { Component } from 'react';

import firebase from "../../firebase"

import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        const {email, password} = this.state
        e.preventDefault()
        
        // firebase
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                console.log(createdUser)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        const { username, email, password, passwordConfirm } = this.state

        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="black" textAlign="center">
                        <Icon name="code" color="violet"/>
                        Register for DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} sixe="large">
                        <Segment stacked>
                            <Form.Input type="text" name="username" icon="user" value={username} iconPosition="left" placeholder="Enter Username" onChange={this.handleChange} />
                            <Form.Input type="text" name="email" icon="mail" value={email} iconPosition="left" placeholder="Enter Email" onChange={this.handleChange}/>
                            <Form.Input type="password" name="password" icon="lock" value={password} iconPosition="left" placeholder="Enter Password" onChange={this.handleChange}/>
                            <Form.Input type="password" name="passwordConfirm" icon="repeat" value={passwordConfirm} iconPosition="left" placeholder="Confirm Password" onChange={this.handleChange}/>
                            <Button color="violet" fluid size="large" >Submit</Button>
                        </Segment>
                    </Form>

                    <Message>Have an account already? <Link to="/login" color="orange">Sign in</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
