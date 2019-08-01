import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './css/AddFileModal.css';
import Alert from 'react-bootstrap/Alert';

const cloudFunctions = require('../firebase/cloudFunctions.js');

class ShareFileModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {formValidated: false, showAuthorizingText: false, showInvalidText: false};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) { // TODO: add ability to view/delete shared people
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            this.setState({showAuthorizingText: true});
            let validObj = await cloudFunctions.validateEmail({email: btoa(form.shareemail.value) });
            let emailValid = validObj.data;
            if (emailValid) {
                this.setState({formValidated: true, showAuthorizingText: false, showInvalidText: false});
                this.props.handleClose();
                let validUid = await cloudFunctions.getUIDFromEmail({email: btoa(form.shareemail.value)});
                this.props.handleAddOthers(validUid.data);
            } else {
                this.setState({showInvalidText: true, showAuthorizingText: false});
                // alert("The user with the email you provided is invalid.");
            }
        }
    }

    render() {
        let authorizingInvalid;
        if (this.state.showAuthorizingText) {
            authorizingInvalid = <Alert variant="primary">Authorizing....</Alert>;
        } else if (this.state.showInvalidText) {
            authorizingInvalid = <Alert variant="danger">Invalid email!</Alert>;
        } else {
            authorizingInvalid = <div></div>;
        }
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"Share \"" + this.props.filename + "\""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={this.state.formValidated} onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control required placeholder="Enter Email Address" name="shareemail" />
                            <Form.Text className="text-muted">
                                Enter the email address of the user you want to share this project with.
                            </Form.Text>
                        </Form.Group>
                        {authorizingInvalid}
                        <div id="modal-submit-bar">
                            <div className="modal-submit-bar-btn">
                                <Button variant="secondary" onClick={this.props.handleClose}>
                                    Cancel
                                </Button>
                            </div>
                            <div className="modal-submit-bar-btn">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ShareFileModal;