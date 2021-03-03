import React from 'react';
import _ from 'underscore';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ShareFileModal from './ShareFileModal';
import { connect } from 'react-redux';

import './css/Calculator.css';

import EE from '../Emitter';

import { updateOldExprString, updateNewExprString } from '../redux/actions/index';

const dbScript = require('../firebase/dbScript.js');
const cloudFunctions = require('../firebase/cloudFunctions.js');

const mapDispatchToProps = dispatch => {
    return {
        updateOldExprString: exprString => dispatch(updateOldExprString(exprString)),
        updateNewExprString: exprString => dispatch(updateNewExprString(exprString))
    }
};

const mapStateToProps = state => {
    return {
        uid: state.uid
    };
};

class Redux_Calculator extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {filename: undefined, showShareFileModal: false, ownerUid: ""};

        this.handleCommit = this.handleCommit.bind(this); // make 'this' accessible in call-back
        this.handleImport = this.handleImport.bind(this);
        this.handleOtherFileImport = this.handleOtherFileImport.bind(this);
        this.handleAddOthers = this.handleAddOthers.bind(this);
        this.handleShowShareFileModal = this.handleShowShareFileModal.bind(this);
        this.handleCloseShareFileModal = this.handleCloseShareFileModal.bind(this);
        this.imageUploadCallback = this.imageUploadCallback.bind(this);

        EE.on("file-open-mine", (fileName) =>{
            this.setState({filename: fileName}, () => {
                this.setState({ownerUid: ""}, () => {
                    this.handleImport();
                });
                //this.handleOtherFileImport("t9lnmszg8oYPNOL3ifX7TLf7I3J2");
            });
        });

        EE.on("file-open-other", (data) => {
            this.setState({filename: data.name}, () => {
                this.setState({ownerUid: data.owner}, () => {
                    this.handleOtherFileImport();
                });
            });
        });
    }

    async handleAddOthers(otherUid) {
        if (typeof this.state.filename != "undefined") {
            await dbScript.linkUserToMyProject(this.props.uid, this.state.filename, otherUid); // adds user under current project data
            cloudFunctions.linkUserToProject({ownerUid: otherUid, projectName: this.state.filename}) // adds project under other user
        }
    }

    handleShowShareFileModal() {
        this.setState({showShareFileModal: true});
    }

    handleCloseShareFileModal() {
        this.setState({showShareFileModal: false});
    }

    getState() {
        return this.calculator.getState();
    }

    getExprList(calcState) {
        return calcState.expressions.list;
    }

    getExprListString(calcState) {
        let result = "";
        let list = this.getExprList(calcState);
        
        for (let i = 0; i < list.length; i++) {
            result += list[i].latex + "\n"; 
        }

        return result;
    }

    imageUploadCallback(file, cb) {
        window.Desmos.imageFileToDataURL(file, (err, dataURL) => {
            if (err) {
                cb(err);
                return;
            } // TODO: delete the image when the image expression is deleted
            cloudFunctions.uploadImage({dataURL: dataURL, uid: this.props.uid, fileName: this.state.filename}).then(
            (result) => {
                if (!result.data) {
                    cb(true);
                    return;
                }
                cb(null, result.data.url);
            }
            );
        });
    }

    throttledSave = _.throttle(
        () => {
            // this.props.updateLocalCalcState(this.calculator.getState());
            this.props.updateNewExprString({exprString: this.getExprListString(this.calculator.getState())});
        },
        1000,
        {leading: false}
    );

    componentDidMount() {
        let calcElem = document.getElementById("calculator");
        this.calculator = window.Desmos.GraphingCalculator(calcElem, { imageUploadCallback: this.imageUploadCallback });

        this.calculator.observeEvent('change', () => {
            this.throttledSave();
        });
    }

    handleCommit() {
        if (this.state.filename) {
            if (this.state.ownerUid !== "") {
                this.handleOtherFileCommit();
                this.props.updateOldExprString({exprString: this.getExprListString(this.getState())});
                return;
            }
            dbScript.updateFile(this.props.uid, this.state.filename, this.getState());
            this.props.updateOldExprString({exprString: this.getExprListString(this.getState())});
        }
    }

    handleOtherFileCommit() {
        cloudFunctions.updateFileFromAnotherUser({ownerUid: this.state.ownerUid, fileName: this.state.filename, content: this.getState()});
    }

    handleImport() {
        if (this.state.ownerUid !== "") {
            this.handleOtherFileImport();
            return;
        }
        if (this.props.uid === undefined) {
            alert("Sign-in first!");
            return;
        }
        if (!this.state.filename) {
            return;
        }
        dbScript.importFile(this.props.uid, this.state.filename).then(content => {
            this.calculator.setState(content);

            // this.props.handleImportData(this.getState());
            this.props.updateOldExprString({exprString: this.getExprListString(this.getState())});
        });
    }

    async handleOtherFileImport() {
        if (this.props.uid === undefined) {
            alert("Sign-in first!");
            return;
        }
        if (!this.state.filename) {
            return;
        }
        let content = await cloudFunctions.importFileFromAnotherUser({ownerUid: this.state.ownerUid, fileName: this.state.filename});
        this.calculator.setState(content.data);
        this.props.updateOldExprString({exprString: this.getExprListString(this.getState())});
    }

    render() {
        let filenameTag;
        if (this.state.filename) {
            filenameTag = <Alert variant="success">Current File: <strong>{this.state.filename}</strong></Alert>
        } else {
            filenameTag = <Alert variant="danger"><strong>No File Selected</strong></Alert>
        }
        
        return (
            <div id="calc-grid">
                <div id="current-file-shower">
                    {filenameTag}
                </div>
                <div id="calculator"></div>
                <ShareFileModal show={this.state.showShareFileModal} handleClose={this.handleCloseShareFileModal} handleAddOthers={this.handleAddOthers} filename={this.state.filename} />
                <div id="calc-buttons">
                    {this.state.filename &&
                    <> 
                    <div>
                        <Button variant="success" className="calc-btn" onClick={this.handleCommit}>
                            Commit Changes
                        </Button>
                        <Button variant="primary" className="calc-btn" onClick={this.handleImport}>
                            Import Again
                        </Button>
                    </div>
                    <div id="add-ppl-btn-container">
                        <Button variant="info" className="calc-btn" onClick={this.handleShowShareFileModal}>
                            Allow Others to Edit
                        </Button>
                    </div>
                    </>
                    }
                </div>
            </div>
        );
    }
}

const Calculator = connect(mapStateToProps, mapDispatchToProps)(Redux_Calculator);

export default Calculator;
