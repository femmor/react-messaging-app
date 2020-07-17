import React, { Component } from 'react';
import firebase from "../../firebase"
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react"

class Channels extends Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        channel_name: "",
        channel_details: "",
        channelsRef: firebase.database().ref("channels"),
        modal: false
    }

    // Handle submit method
    handleSubmit = e => {
        e.preventDefault()
        if (this.isFormValid(this.state)) {
            this.addChannel()
        } 
    }

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

export default Channels;
