import React from 'react';
import App from './App';
import SignInPage from './SignInPage';

import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        uid: state.uid
    };
};

class Redux_Main extends React.Component {

    render() {
        return (
            <>
                {
                    this.props.uid &&
                    <App />
                }
                {
                    !this.props.uid &&
                    <SignInPage />
                }
            </>
        );
    }
}

const Main = connect(mapStateToProps)(Redux_Main);

export default Main;
