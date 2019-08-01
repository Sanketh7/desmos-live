//import firebase from './Firebase.js';

import * as firebase from 'firebase/app';

import 'firebase/auth';
const dbScript = require('./dbScript.js');

let provider = new firebase.auth.GoogleAuthProvider();
//firebase.auth().languageCode = 'pt'; // put in local language

export function signin() {
    return firebase.auth().signInWithPopup(provider).then(async (result) => {
        // let token = result.credential.accessToken; // to access Google API
        let user = result.user;
        await dbScript.addUserToList(user.uid, user.email);
        return user;
    }).catch(error => {
        // let errorCode = error.code;
        let errorMessage = error.message;
        // let email = error.email; // email of user's account
        // let credential = error.credential; // firebase.auth.AuthCredential type used

        console.error(errorMessage);

        // TODO: add error handling (say that there was an error, display error code, etc)
    });
}

export function signout() {
    return firebase.auth().signOut().then(() => {
        return true;
    }).catch(error => {
        return false;
    });
}