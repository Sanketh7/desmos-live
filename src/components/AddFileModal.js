import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './css/AddFileModal.css';

class AddFileModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {formValidated: false};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            this.props.handleAddFile(form.projectName.value);
        }
        this.setState({validated: true});
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={this.state.formValidated} onSubmit={e => this.handleSubmit(e)}>
                        <h2>If you are not the owner:</h2>
                        <Form.Group>
                            <Form.Label>Owner Email and Project Name</Form.Label>
                            <Form.Control placeholder="Enter Owner Email" name="otherowneremail" />
                            <Form.Control placeholder="Enter Project Name" name="otherownerprojectname" />
                            <Form.Text className="text-muted">
                                Enter this information if you are not the owner.
                            </Form.Text>
                        </Form.Group>
                        <h2>If you are the owner:</h2>
                        <Form.Group>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control placeholder="Enter Project Name" name="projectName" />
                            <Form.Text className="text-muted">
                                Enter the project name.
                            </Form.Text>
                        </Form.Group>
                        <div id="modal-submit-bar">
                            <div className="modal-submit-bar-btn">
                                <Button variant="secondary" onClick={this.props.handleClose}>
                                    Cancel
                                </Button>
                            </div>
                            <div className="modal-submit-bar-btn">
                                <Button variant="primary" type="submit" onClick={this.props.handleClose}>
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

export default AddFileModal;
