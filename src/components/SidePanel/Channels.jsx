import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react"

class Channels extends Component {

    state = {
        channels: [],
        channel_name: "",
        channel_details: "",
        modal: false
    }

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

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
                        <Form onSubit={this.handleSubmit}>
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
                        <Button color="green" inverted>
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
