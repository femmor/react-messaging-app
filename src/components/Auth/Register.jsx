import React, { Component } from 'react';

import firebase from "../../firebase"
import md5 from "md5"

import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: [],
        loading:  false,
        usersRef: firebase.database().ref("users")
    }

    isFormValid = () => {
        let errors = []
        let error

        // check if form is empty or not
        if(this.isFormEmpty(this.state)){
            // throw error
            error = { message: "Please fill in all fields" }
            this.setState({ 
                errors: errors.concat(error)
             })

            return false
        } else if(!this.isPasswordValid(this.state)) {
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

    isPasswordValid = ({ password, passwordConfirm }) => {
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm) {
            return false;
        } else {
          return true;
        }
      };

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
        e.preventDefault()

        // check if form is valid
        if (this.isFormValid()) {
            this.setState({
                errors: [],
                loading: true
            })
            const {email, password, username} = this.state
            
            // firebase
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    console.log(createdUser)

                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon` 
                    })
                    .then(() => {
                        this.saveUser(createdUser).then(() => {
                            console.log("user saved")
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({
                            loading: false,
                            errors: this.state.errors.concat(err)
                        })
                    })
                    
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        }
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    handleInputErrors = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
          ? "error"
          : "";
      };
    

    render() {

        const { username, email, password, passwordConfirm, errors, loading } = this.state

        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="black" textAlign="center">
                        <Icon name="code" color="violet"/>
                        Register for DevChat
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input className={this.handleInputErrors(errors, "username")} fluid type="text" name="username" icon="user" value={username} iconPosition="left" placeholder="Enter Username" onChange={this.handleChange} />
                            <Form.Input className={this.handleInputErrors(errors, "email")} fluid type="text" name="email" icon="mail" value={email} iconPosition="left" placeholder="Enter Email" onChange={this.handleChange}/>
                            <Form.Input className={this.handleInputErrors(errors, "password")} fluid type="password" name="password" icon="lock" value={password} iconPosition="left" placeholder="Enter Password" onChange={this.handleChange}/>
                            <Form.Input className={this.handleInputErrors(errors, "passwordConfirm")} fluid type="password" name="passwordConfirm" icon="repeat" value={passwordConfirm} iconPosition="left" placeholder="Confirm Password" onChange={this.handleChange}/>
                            <Button disabled={loading} className={loading ? "loading" : ""} color="violet" fluid size="large">Submit</Button>
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
