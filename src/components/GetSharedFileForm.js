import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class GetSharedFileForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {validated: false};
    }

    handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            this.props.onHandleSubmit(form.userId.value, form.projectName.value);
        }
        this.setState({validated: true});
    }

    render() {
        const {validated} = this.state;
        return (
            <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control required placeholder="Enter User ID" name="userId" />
                    <Form.Text className="text-muted">
                        Enter the user ID of the owner.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control required placeholder="Enter Project Name" name="projectName" />
                    <Form.Text className="text-muted">
                        Enter the project name.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default GetSharedFileForm;
