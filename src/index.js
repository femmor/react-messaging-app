import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from "./firebase"
import App from './components/App';

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom"

// Components
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

class Root extends Component {

  componentDidMount() {
    // Run cdm to know whether there's a user in the app
    firebase
      .auth()
      .onAuthStateChanged(user => {
        // Check if there's a user then 
        if (user) {
          this.props.history.push("/")
        }
      })
  }
  

  render() {
    return (
        <Switch>
          <Route path="/" exact component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
    )
  }
}

const RootWithAuth = withRouter(Root)

ReactDOM.render(
    <Router>
      <RootWithAuth />
    </Router>,
  document.getElementById('root')
);
