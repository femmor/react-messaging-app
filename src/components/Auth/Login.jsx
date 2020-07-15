import React, { Component } from 'react';
import { Grid, Form, Button, Segment, Message, Header, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom"


class Login extends Component {

    state = {}

    handleChange = () => {}

    render() {
        return (
            <Grid className="app" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="black" textAlign="center">
                        <Icon name="code" color="violet"/>
                        Login to DevChat
                    </Header>
                    <Form sixe="large">
                        <Segment stacked>
                            <Form.Input field type="email" name="email" icon="user" iconPosition="left" placeholder="Enter email address" onChange={this.handleChange} />
                            <Form.Input field type="password" name="password" icon="lock" iconPosition="left" placeholder="Enter password" onChange={this.handleChange}/>
                            <Button color="violet" fluid size="large" >Submit</Button>
                        </Segment>
                    </Form>

                    <Message>Don't have an account yet? <Link to="/register" color="orange">Sign up</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;
