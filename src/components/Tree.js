import React from 'react';
import TreeFolder from './TreeFolder';
import {Button, Container, Row, Col} from 'react-bootstrap';
import AddFileModal from './AddFileModal';

import {connect} from 'react-redux';
import {updateDisplayTreeCheckMarks, updateMyFiles, updateOtherFiles} from '../redux/actions/index';


import './css/Tree.css';

const dbScript = require('../firebase/dbScript.js');

const mapStateToProps = state => {
    return {
        uid: state.uid,
        showDoneButton: state.displayTreeCheckMarks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDisplayTreeCheckMarks: () => dispatch(updateDisplayTreeCheckMarks()),
        updateMyFiles: list => dispatch(updateMyFiles(list)),
        updateOtherFiles: list => dispatch(updateOtherFiles(list))
    };
};

class Redux_Tree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {showAddFileModal: false};

        this.handleAddFile = this.handleAddFile.bind(this);
        this.handleShowAddFileModal = this.handleShowAddFileModal.bind(this);
        this.handleCloseAddFileModal = this.handleCloseAddFileModal.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }

    handleDeleteButton() {

    }

    handleShowAddFileModal() {
        this.setState({showAddFileModal: true});
    }

    handleCloseAddFileModal() {
        this.setState({showAddFileModal: false});
    }

    async handleAddFile(filename) {
        await dbScript.addFile(this.props.uid, filename).then(async response => {
            if (response === -1) { // already exists
                alert("File already exists!");
            }

            await this.updateAllFiles();
        });
    }

    async updateAllFiles() {
        await this.updateMyFiles();
        await this.updateOtherFiles();
    }

    async updateMyFiles() {
        let vals = await dbScript.getMyFileNames(this.props.uid);
        this.props.updateMyFiles({list: vals});
    }

    async updateOtherFiles() {
        let data = await dbScript.getOtherFileNames(this.props.uid);
        this.props.updateOtherFiles({list: data});
    }

    async handleEditButton() {
        this.props.updateDisplayTreeCheckMarks();
        await this.updateAllFiles();
    }

    render() {
        let editOrDoneButton;
        if (this.props.showDoneButton) {
            editOrDoneButton = <Button variant="outline-success" onClick={this.handleEditButton}>Done</Button>
        } else {
            editOrDoneButton = <Button variant="outline-danger" id="tree-edit" onClick={this.handleEditButton}>Edit</Button>
        }

        let addOrDeleteButton;
        if (this.props.showDoneButton) {
            addOrDeleteButton = <Button variant="danger" onClick={this.handleDeleteButton}>Delete</Button>
        } else {
            addOrDeleteButton = <Button variant="success" id="tree-add" onClick={this.handleShowAddFileModal}>Add</Button>;
        }
        return (
            <Container>
                <Row><Col><h3 id="tree-title">Projects</h3></Col></Row>
                <AddFileModal show={this.state.showAddFileModal} handleClose={this.handleCloseAddFileModal} handleAddFile={this.handleAddFile} />
                <Row>
                    <Col>
                        <div id="tree-toolbar">
                            {addOrDeleteButton}
                            {editOrDoneButton}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="tree-list">
                            <TreeFolder name="Owner: Me" isMyFiles={true} displayCheckMarks={this.state.displayCheckMarks} />
                            <TreeFolder name="Owner: Others" isMyFiles={false} displayCheckMarks={this.state.displayCheckMarks} />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const Tree = connect(mapStateToProps, mapDispatchToProps)(Redux_Tree);

export default Tree;
