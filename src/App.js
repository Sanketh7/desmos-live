import React from 'react';

import Calculator from './components/Calculator';
import Tree from './components/Tree';
import ChangesList from './components/ChangesList';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import './App.css';

import { connect } from 'react-redux';
import { updateUid, updateDisplayTreeCheckMarks, updateMyFiles, updateOtherFiles } from './redux/actions/index';

const authScript = require('./firebase/authScript.js');

const mapDispatchToProps = dispatch => {
    return {
        updateUid: uid => dispatch(updateUid(uid)),
        updateDisplayTreeCheckMarks: () => dispatch(updateDisplayTreeCheckMarks()),
        updateMyFiles: list => dispatch(updateMyFiles(list)),
        updateOtherFiles: list =>  dispatch(updateOtherFiles(list))
    };
};

const mapStateToProps = state => {
    return {
        uid: state.uid
    };
};

class Redux_App extends React.Component {

    constructor(props) {
        super(props);

        //this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    /*
    async handleSignIn() {
        let user = await authScript.signin();
        this.props.updateUid({uid: user.uid});
        let vals = await dbScript.getMyFileNames(user.uid);
        this.props.updateMyFiles({list: vals});
        let vals2 = await dbScript.getOtherFileNames(user.uid);
        this.props.updateOtherFiles({list: vals2});
    }*/

    async handleSignOut() {
        await authScript.signout();
        this.props.updateUid({uid: undefined});
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Desmos Live!</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Editor</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Button variant="primary" onClick={this.handleSignOut}>
                        Sign Out
                    </Button>
                </Navbar>
                <div className="grid-container">
                    <div className="changes">
                        <ChangesList />
                    </div>
                    <div className="editor">
                        <Calculator />
                    </div>
                    <div className="tree">
                        <Tree />
                    </div>
                </div>
            </div>
        );
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Redux_App);

export default App;
