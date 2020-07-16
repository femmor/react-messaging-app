import React, { Component } from 'react';

import firebase from "../../firebase"

import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: [],
        loading:  false
    }

    // Display errors function
    // take the errors array in the state
    // map over the errors to get individual errors
    displayError = errors => errors.map((error, i) => {
        return (
            // return a set of p tags with the error message
            <p key={i}>{error.message}</p>
        )
    })

    // Handle form change
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Handle form submit
    handleSubmit = (e) => {
        e.preventDefault()

        // check if form is valid
        if (this.isFormValid(this.state)) {
            // before reaching out to firebase, 
            // set the state and clear the errors array and set loading to true
            this.setState({
                errors: [],
                loading: true
            })
            const {email, password, errors} = this.state

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log(signedInUser)
                    this.setState({
                        loading: false,
                    })
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        errors: errors.concat(err)
                    })
                })
        }
    }

    isFormValid = ({ email, password }) => email && password;


    // Handle input errors
    handleInputErrors = (errors, inputName) => {
        // convert the error message to lowercase and check if it includes the input name return the error class or an empty string
        return errors.some(error => error.message.toLowerCase().includes(inputName))
          ? "error"
          : "";
      };
    

    render() {
        // Destructure the state
        const { email, password, errors, loading } = this.state

        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="black" textAlign="center">
                        <Icon name="code branch" color="violet"/>
                        DevChat - Sign In
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input className={this.handleInputErrors(errors, "email")} fluid type="text" name="email" icon="mail" value={email} iconPosition="left" placeholder="Enter Email" onChange={this.handleChange}/>
                            <Form.Input className={this.handleInputErrors(errors, "password")} fluid type="password" name="password" icon="lock" value={password} iconPosition="left" placeholder="Enter Password" onChange={this.handleChange}/>
                            <Button disabled={loading} className={loading ? "loading" : ""} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {/* display any errors */}
                    {/* check if there are errors in the errors array */}
                    {
                        errors.length > 0 && (
                            // show message component to display error
                            <Message error>
                                <h4>Error</h4>
                                {this.displayError(errors)}
                            </Message>
                        ) 
                            
                    }

                    <Message>Don't have an account yet? <Link to="/register" color="orange">Register</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;
