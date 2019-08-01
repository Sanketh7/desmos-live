import React from 'react';
import './css/TreeFolder.css';

import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';
import TreeFile from './TreeFile.js';

import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

const mapStateToProps = state => {
    return {
        myFiles: state.myFiles,
        otherFiles: state.otherFiles
    };
};

class Redux_TreeFolder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {open: false};
    }

    displayCaret() {
        if (this.state.open) {
            return (
                <div className="caret-icon-container">
                    <FaCaretDown />
                </div>
            );
        } else {
            return (
                <div className="caret-icon-container">
                    <FaCaretRight />
                </div>
            );        
        }
    }

    render() {
        let insideContent;
        if (this.props.isMyFiles) {
            if (!this.props.myFiles.length) {
                insideContent = <Alert variant="primary">No files!</Alert>;
            } else {
                insideContent = [];
                for (let i = 0; i < this.props.myFiles.length; i++) {
                    insideContent.push(
                        <TreeFile key={uuidv4()} name={this.props.myFiles[i]} isMyFiles={true} ownerUid={""} />
                    );
                }
            }
        } else {
            insideContent = [];
            if (!this.props.otherFiles.length) {
                insideContent = <Alert variant="primary">No files!</Alert>;
            } else {
                Object.keys(this.props.otherFiles).forEach(userKey => {
                    Object.keys(this.props.otherFiles[userKey]).forEach(fileKey => {
                        insideContent.push(
                            <TreeFile key={uuidv4()} name={fileKey} isMyFiles={false} ownerUid={userKey} />
                        );
                    });
                });
            }
        }
       
        
        return (
            <div>
                <div
                    className="folder-node"
                    onClick={() => this.setState({ open: !this.state.open })}
                    aria-controls="collapse-div"
                    aria-expanded={this.state.open}
                >
                    {this.displayCaret()}
                    {this.props.name}
                </div>
                <Collapse in={this.state.open}>
                    <div id="collapse-div" className="indented">
                        {insideContent}
                    </div>
                </Collapse>
            </div>
        );  
    }
}

const TreeFolder = connect(mapStateToProps)(Redux_TreeFolder);

export default TreeFolder;