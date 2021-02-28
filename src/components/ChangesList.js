import React from 'react';
import {connect} from 'react-redux';
import './css/ChangesList.css';
import {Container, Row, Col} from 'react-bootstrap';

const Diff = require('diff');
const uuidv4 = require('uuid/v4');

const mapStatesToProps = state => {
    return {oldText: state.oldExprString, newText: state.newExprString};
};

class Redux_ChangesList extends React.Component {

    createColoredText(oldText, newText) {
        let result = [];

        let diff = this.getDiff(oldText, newText);
        diff.forEach((part) => {
            let textColor = part.added ? 'added' : part.removed ? 'removed' : 'same';
            let eachLine = part.value.split("\n");
            eachLine.forEach((subpart) => {
                if (subpart !== "undefined" && subpart !== "") {
                    result.push(
                        <div key={uuidv4()} className={"changes-item " + textColor}>
                            {subpart}
                        </div>
                    );
                }
            });
        });

        return result;
    }

    getDiff(oldText, newText) {
        return Diff.diffLines(oldText, newText);
    }

    render() {
        return (
            <Container fluid>
                <Row><Col><h3 id="changes-title">Changes Made</h3></Col></Row>
                <Row><Col>
                    <div id="changes-list">
                        {this.createColoredText(this.props.oldText, this.props.newText)}
                    </div>
                </Col></Row >
            </Container >
        );
    }
}

const ChangesList = connect(mapStatesToProps)(Redux_ChangesList);

export default ChangesList;
