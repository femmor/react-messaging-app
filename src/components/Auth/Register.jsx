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
        // errors array // also add initial value to state
        let errors = []
        // error variable
        let error

        // check if form is empty or not
        // Pass state object to the isFormEmpty function
        if(this.isFormEmpty(this.state)){
            // throw an error if form is empty
            // assign error variable to an object to define the message error
            error = { message: "Please fill in all fields" }
            // set the state and concat error to the errors array
            this.setState({ 
                errors: errors.concat(error)
             })

            return false
            // Pass state object to the passwordValid function
            // only password and passwordConfirm parameters should be used
        } else if(!this.isPasswordValid(this.state)) {
            // throw an error if password is invalid
            error = {message: "Password is invalid"}
            // set the state and concat error to the errors array
            this.setState({
                errors: errors.concat(error)
            })

            return false
        } else {
            // Return true if both conditions are met
            return true
        }
    }

    // Is form empty? function
    isFormEmpty = ({ email, username, password, passwordConfirm }) => {
        // if form input length === 0, return true
        // indicating that form is not entirely filled out
        // throw an error if form is empty
        return !email.length || !username.length || !password.length || !passwordConfirm.length
    }

    // is password valid? function
    isPasswordValid = ({ password, passwordConfirm }) => {
        // Check the length of both values and return false if they are less than 6
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm) {
            return false;
        } else {
          return true;
        }
      };

    // Display errors
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
        if (this.isFormValid()) {
            // before reaching out to firebase, 
            // set the state and clear the errors array and set loading to true
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
                    // update createdUser data with display name and avatar from gravatar
                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon` 
                    })
                    .then(() => {
                        this.saveUser(createdUser).then(() => {
                            console.log("user saved!")
                            // Set loading property to false in the state
                            this.setState({
                                loading: false
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

    // Save user to firebase Realtime database 
    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    // Handle input errors
    handleInputErrors = (errors, inputName) => {
        // convert the error message to lowercase and check if it includes the input name return the error class or an empty string
        return errors.some(error => error.message.toLowerCase().includes(inputName))
          ? "error"
          : "";
      };
    

    render() {
        // Destructure the state
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

                    <Message>Have an account already? <Link to="/login" color="orange">Sign in</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;
