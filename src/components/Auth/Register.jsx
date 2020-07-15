import React, { Component } from 'react';
import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"

class Register extends Component {

    state = {}

    handleChange = () => {}

    render() {
        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="black" textAlign="center">
                        <Icon name="code" color="violet"/>
                        Register for DevChat
                    </Header>
                    <Form sixe="large">
                        <Segment stacked>
                            <Form.Input field type="text" name="username" icon="user" iconPosition="left" placeholder="Enter Username" onChange={this.handleChange} />
                            <Form.Input field type="text" name="email" icon="mail" iconPosition="left" placeholder="Enter Email" onChange={this.handleChange}/>
                            <Form.Input field type="password" name="password" icon="lock" iconPosition="left" placeholder="Enter Password" onChange={this.handleChange}/>
                            <Form.Input field type="password" name="passwordConfirm" icon="repeat" iconPosition="left" placeholder="Confirm Password" onChange={this.handleChange}/>
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
