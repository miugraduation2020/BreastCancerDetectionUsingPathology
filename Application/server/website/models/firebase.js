
var firebase = require('firebase');
var ff = require('firebase-functions');
var firebaseConfig = {
  apiKey: "AIzaSyDJJnR33eTGNQ4i1UqBt5wiMTH-2Nw5Sf0",
  authDomain: "gp-bcbd.firebaseapp.com",
  projectId: "gp-bcbd",
  storageBucket: "gp-bcbd.appspot.com",
  messagingSenderId: "661391592053",
  appId: "1:661391592053:web:143d926411a35b300d063c",
  measurementId: "G-JDTG7ZG60S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var admin = require("firebase-admin");
var serviceAccount = require("./gp-bcbd-firebase-adminsdk-gg7zh-5c305792ac.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
async function testadd(db){
const docRef =  db.collection('users').doc('alovelace');
console.log(`test1`);
await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
console.log(`test2`);

}
function addUser() {

  fullName = document.getElementById("full-name").value;
  email = document.getElementById("new-email").value;
  password = document.getElementById("new-password").value;
  confirmPass = document.getElementById("new-conpassword").value;
  phoneNo = document.getElementById("new-phone").value;
  userRole = document.getElementById("new-userrole").value;

  signUpWithEmailPassword(email, password)
    .then(function (data) {
      console.log(data);
      postData('/add', {
        fullName: fullName,
        email: email,
        password: password,
        phoneNo: phoneNo,
        userRole: userRole
      });
      addtodb();
    });
  console.log('mod');

}

const postData = async (url = '', data = {}) => {

  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },

    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;

  } catch (error) {
    console.log("error", error);
  };
}


const addtodb = async (url = '') => {
  const request = await fetch(url);

  try {
    const alldata = await request.json();
    newUser = db.collection('users').add({
      fullName: alldata[0].fullName,
      email: alldata[0].email,
      password: alldata[0].password,
      phoneNo: alldata[0].phoneNo,
      userRole: alldata[0].userRole,


    })



  } catch (error) {
    console.log("error", error);
  }
}



function signUpWithEmailPassword(email, password) {
  // [START auth_signup_password]
  auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signup_password]
}


