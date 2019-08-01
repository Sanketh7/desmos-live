import * as firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyDnB54sj_MLG4SXdTImb_ggkwXdLdpPUlo",
    authDomain: "desmos-live-23326.firebaseapp.com",
    databaseURL: "https://desmos-live-23326.firebaseio.com",
    projectId: "desmos-live-23326",
    storageBucket: "",
    messagingSenderId: "39438561393",
    appId: "1:39438561393:web:6c4c80b7eba664e8"
};
firebase.initializeApp(config);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();