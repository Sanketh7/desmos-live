//import firebase from './Firebase.js';

import * as firebase from 'firebase/app';

import 'firebase/database';

export function updateFile(_uid, fileName, content) {
    //let _uid = "t9lnmszg8oYPNOL3ifX7TLf7I3J2";
    firebase.database().ref('users/'+_uid+'/files/'+fileName).update({
        data: content
    });
}

export function importFile(_uid, fileName) {
    return new Promise((resolve, reject) => {
        //let _uid = "t9lnmszg8oYPNOL3ifX7TLf7I3J2";
        firebase.database().ref('users/'+_uid+'/files/'+fileName+'/data/').once('value', (data) => {
            resolve(data.val());
        })
    });
}

export function getMyFileNames(uid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/'+uid+'/files/').once('value', (data) => {
            let vals = [];
            data.forEach(child => {
                vals.push(child.key);
            }); 
            resolve(vals);
        });
    }); 
}

export function getOtherFileNames(myUid) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/'+myUid+'/linkedTo/').once('value', (data) => {
            if (data.exists()) {
                resolve(data.val());
            } else {
                resolve({});
            }
        });
    });
}

export function addFile(uid, filename) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/'+uid+'/files/'+filename).once('value', data => {
            if (data.exists()) {
                resolve(-1);
            } else {
                firebase.database().ref('users/'+uid+'/files/').update({ [filename]: {"sample-data": 0} });
                resolve(0);
            }
        });
    });
}

export function addUserToList(uid, email) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('usersToEmail/').update({
            [uid]: btoa(email)
        }, () => {
            firebase.database().ref('emailsToUser/').update({
                [btoa(email)]: uid
            }, () => {
                console.log("done adding");
                resolve(0);
            });
        });
    });
}

export function linkUserToMyProject(ownerUID, projectName, otherUID) {
    console.log("going to the mines lol xd");
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/'+ownerUID+'/files/'+projectName+'/linked/').update({
            [otherUID]: true
        });
        console.log("donezo");
        resolve(true);
    });
}
