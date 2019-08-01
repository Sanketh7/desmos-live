import React from 'react';
import './css/TreeFile.css';

import { FaFile } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import EE from '../Emitter';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        displayTreeCheckMarks: state.displayTreeCheckMarks
    };
};

class Redux_TreeFile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {checked: false};

        this.handleClick = this.handleClick.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
    }

    handleClick() {
        if (!this.props.displayTreeCheckMarks) {
            if (this.props.isMyFiles) {
                EE.emit("file-open-mine", this.props.name);
            } else {
                EE.emit("file-open-other", {name: this.props.name, owner: this.props.ownerUid});
            }
        }
    }

    handleCheckClick() {
        this.setState({checked: !this.state.checked});
    }
    
    render() {
        let iconOrCheck;
        if (this.props.displayTreeCheckMarks) {
            if (this.state.checked) {
                iconOrCheck = <MdCheckBox />; // TODO: add hover properties to it and add check change (outline to check)
            } else {
                iconOrCheck = <MdCheckBoxOutlineBlank />;
            }
        } else {
            iconOrCheck = <FaFile />;
        }
        return (
            <div>
                <div className="file-node" onClick={this.handleClick}>
                    <div className="project-icon-container" onClick={this.handleCheckClick}>
                        {iconOrCheck}
                    </div>
                    {this.props.name}
                </div>
            </div>
        ); 
    }
    
}

const TreeFile = connect(mapStateToProps)(Redux_TreeFile);

export default TreeFile; 