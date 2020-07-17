import React from 'react';
import { Grid } from "semantic-ui-react"
import "../components/App.css"
import ColorPanel from './ColorPanel';
import SidePanel from './SidePanel';
import Messages from './Messages';
import MetaPanel from './MetaPanel';

import { connect } from "react-redux"

const App = ({ currentUser }) => {
    return (
        <Grid columns="equal" className="app" style={{
            background: "#eee"
        }}>
            <ColorPanel/>
            <SidePanel currentUser={currentUser}/>
            
            <Grid.Column style={{
                marginLeft: 320
            }}>
                <Messages/>
            </Grid.Column>

            <Grid.Column width={4}>
                <MetaPanel/>
            </Grid.Column>
            
        </Grid>
    );
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App);
