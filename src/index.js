import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

const Root = () => (
    <Router>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </Router>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
