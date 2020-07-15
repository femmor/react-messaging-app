import React, { Component } from 'react';

import firebase from "../../firebase"

import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: []
    }

    isFormValid = () => {

        let errors = []
        let error

        // check if form is empty or not
        if(this.isFormEmpty(this.state)){
            // throw error
            error = { message: "Fill in all fields" }
            this.setState({ 
                errors: errors.concat(error)
             })
            
            return false
        } else if(this.isPasswordValid(this.state)) {
            // throw error
            error = {message: "Password is invalid"}
            this.setState({
                errors: errors.concat(error)
            })

            return false
        } else {
            // form is valid
            return true
        }
    }

    isFormEmpty = ({ email, username, password, passwordConfirm }) => {
        return !email.length || !username.length || !password.length || !passwordConfirm.length
    }

    isPasswordValid = ({password, passwordConfirm }) => {
        // Check if both parameters are less than 6
        if(password.length < 6 || passwordConfirm.length < 6){
            return false
        } else if (password !== passwordConfirm) {
            return false
        } else {
            return true
        }
    }

    displayError = errors => errors.map((error, i) => {
        return (
            <p key={i}>{error.message}</p>
        )
    })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // check if form is valid
        if (this.isFormValid()) {
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
    }

    render() {

        const { username, email, password, passwordConfirm, errors } = this.state

        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="black" textAlign="center">
                        <Icon name="code" color="violet"/>
                        Register for DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input type="text" name="username" icon="user" value={username} iconPosition="left" placeholder="Enter Username" onChange={this.handleChange} />
                            <Form.Input type="text" name="email" icon="mail" value={email} iconPosition="left" placeholder="Enter Email" onChange={this.handleChange}/>
                            <Form.Input type="password" name="password" icon="lock" value={password} iconPosition="left" placeholder="Enter Password" onChange={this.handleChange}/>
                            <Form.Input type="password" name="passwordConfirm" icon="repeat" value={passwordConfirm} iconPosition="left" placeholder="Confirm Password" onChange={this.handleChange}/>
                            <Button color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>

                    {
                        errors.length > 0 && (
                            <Message error>
                                <h4>Error</h4>
                                {this.displayError(errors)}
                            </Message>
                        ) 
                            
                    }

                    <Message>Have an account already? <Link to="/login" color="orange">Sign in</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
