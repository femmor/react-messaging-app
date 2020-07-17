import React, { Component } from 'react';
import firebase from "../../firebase"
import { connect } from "react-redux"
import { setCurrentChannel } from "../../actions"
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react"

class Channels extends Component {

    state = {
        activeChannel: "",
        user: this.props.currentUser,
        channels: [],
        channel_name: "",
        channel_details: "",
        channelsRef: firebase.database().ref("channels"),
        modal: false,
        firstLoad: true
    }

    componentDidMount() {
        // Load all channels
        this.addListeners()
    }
    
    // Get all the channels added
    addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on("child_added", snap => {
            loadedChannels.push(snap.val())
            this.setState({
                channels: loadedChannels
            },
            () => this.setFirstChannel())
        })
    }

    // Set first channel, show channel on load
    setFirstChannel = () => {
        const firstChannel = this.state.channels[0]

        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel)
            this.setActiveChannel(firstChannel)
        }
        this.setState({
            firstLoad: false
        })
    }

    // Handle submit method
    handleSubmit = e => {
        e.preventDefault()
        if (this.isFormValid(this.state)) {
            this.addChannel()
        } 
    }

    // ChangeChannel method
    changeChannel = channel => {
        this.setActiveChannel(channel)
        this.props.setCurrentChannel(channel)
    }

    setActiveChannel = channel => {
        this.setState({
            activeChannel: channel.id
        })
    }

    // Display channels
    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                name={channel.name}
                onClick={() => this.changeChannel(channel)}
                style={{ opacity: 0.7 }}
                active={channel.id === this.state.activeChannel}
            >
               # {channel.name} 
            </Menu.Item>
        ))
    )

    // Check if the form has valid inputs
    isFormValid = ({ channel_name, channel_details }) => channel_name && channel_details

    // addChannel method
    addChannel = () => {
        // Destructure the channelsRef from the state 
        const { channelsRef, channel_name, channel_details, user } = this.state

        // Set channel key
        const key = channelsRef.push().key

        // Create new channel
        const newChannel = {
            id: key,
            name: channel_name,
            details: channel_details,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        // Take channels ref and 
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channel_name: "", channel_details: "" })
                this.closeModal()
                console.log("channel added!")
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    // open modal method
    openModal = () => {
        this.setState({
            modal: true
        })
    }

    // close modal method
    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    // handleChange method
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { channels, modal, channel_name, channel_details } = this.state
        return (
            <>
                <Menu.Menu
                    style={{
                        paddingBottom: "2em"
                    }}
                >
                    <Menu.Item>
                        <span>
                            <Icon name="exchange"/>
                            CHANNELS
                        </span> ({ channels.length }) <Icon name="add" onClick={this.openModal}/>
                    </Menu.Item>

                    {/* Show all channels in state */}
                    {
                        this.displayChannels(channels)
                    }

                </Menu.Menu>

                {/* Add Channel Modal */}
                <Modal
                    basic
                    open={modal}
                    onClose={this.closeModal}
                >
                    <Modal.Header>
                        Add a Channel
                    </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="Channel Name"
                                    name="channel_name"
                                    onChange={this.handleChange}
                                    value={channel_name}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="About Channel"
                                    name="channel_details"
                                    onChange={this.handleChange}
                                    value={channel_details}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark"/> Add Channel
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove"/> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default connect(
    null, 
    { setCurrentChannel })(Channels);
