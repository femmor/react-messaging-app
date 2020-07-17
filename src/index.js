import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from "./firebase"
import App from './components/App';

// Components
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom"
import { createStore } from "redux"
import { Provider, connect } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from './reducers';
import { setUser } from "./actions"

const store = createStore(rootReducer, composeWithDevTools())

class Root extends Component {

    componentDidMount() {
        // Run cdm to know whether there's a user in the app
        firebase
            .auth()
            .onAuthStateChanged(user => {
                // Check if there's a user then 
                if (user) {
                    this.props.setUser(user)
                    this.props.history.push("/")
                }
            })
    }


    render() {
        return ( 
            <Switch>
                <Route path="/"exact component={App}/>
                <Route path="/login" component={Login}/> 
                <Route path="/register" component={Register}/> 
            </Switch>
        )
    }
}

// connect allows us to connect the redux state and actions with a given react component
const RootWithAuth = withRouter(connect(null, {setUser})(Root)) // mapDispatchToProps = {setUser}

// mapDispatchToProps takes the setUser action and put it on the props object

ReactDOM.render( 
    <Provider store = { store } >
        <Router >
            <RootWithAuth />
        </Router> 
    </Provider > ,
    document.getElementById('root')
);