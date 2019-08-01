import firebase from './Firebase.js';

// import * as firebase from 'firebase';

import 'firebase/functions';

let functions = firebase.functions();

export let getUIDFromEmail = functions.httpsCallable('getUIDFromEmail');

export let getEmailFromUID = functions.httpsCallable('getEmailFromUID');

export let validateUID = functions.httpsCallable('validateUID');

export let validateEmail = functions.httpsCallable('validateEmail');

export let uploadImage = functions.httpsCallable('uploadImage');

export let linkUserToProject = functions.httpsCallable('linkUserToProject');

export let importFileFromAnotherUser = functions.httpsCallable('importFileFromAnotherUser');

export let updateFileFromAnotherUser = functions.httpsCallable('updateFileFromAnotherUser');