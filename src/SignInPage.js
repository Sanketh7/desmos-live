import React from 'react';
import {connect} from 'react-redux';
import {updateUid, updateMyFiles, updateOtherFiles} from './redux/actions/index';

import {Card} from 'react-bootstrap';

import './SignInPage.css';

const authScript = require('./firebase/authScript.js');
const dbScript = require('./firebase/dbScript.js');

const mapDispatchToProps = dispatch => {
    return {
        updateUid: uid => dispatch(updateUid(uid)),
        updateMyFiles: list => dispatch(updateMyFiles(list)),
        updateOtherFiles: list => dispatch(updateOtherFiles(list))
    };
};

class Redux_SignInPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    async handleSignIn() {
        let user = await authScript.signin();
        this.props.updateUid({uid: user.uid});
        let vals = await dbScript.getMyFileNames(user.uid);
        this.props.updateMyFiles({list: vals});
        let vals2 = await dbScript.getOtherFileNames(user.uid);
        console.log(vals2);
        this.props.updateOtherFiles({list: vals2});
    }

    render() {
        return (
            <div id="sign-in-background">
                <Card body id="sign-in-card">
                    <Card.Title>Sign In</Card.Title>
                    <div className="g-sign-in-button" onClick={this.handleSignIn}>
                        <div className="content-wrapper">
                            <div className="logo-wrapper">
                                <img src="https://developers.google.com/identity/images/g-logo.png" alt="google logo" />
                            </div>
                            <span className="text-container">
                                <span>Sign in with Google</span>
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const SignInPage = connect(null, mapDispatchToProps)(Redux_SignInPage);

export default SignInPage;

/*

                <div className="sign-in-grid-container">

                    <div className="sign-in-box">
                        <div id="sign-in-container">
                            <div id="sign-in-main-text">
                                Sign In
                            </div>
                        </div>
                    </div>

                    <div className="show-off-image-box"></div>
                    <div className="header-box">
                        Desmos Live
                    </div>
                </div>
*/
