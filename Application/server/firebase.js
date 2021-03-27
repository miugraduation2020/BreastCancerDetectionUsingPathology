/* Firebase*/

var firebase = require('firebase');

/* Firebase Auth*/
require("firebase/auth");

/* Firebase Firestore*/

require("firebase/firestore");

/* Firebase UI*/

var firebaseui = require('firebaseui');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyACsEPvt6lX5i7Dcji6uK-_vwj7CvV42JA",
    authDomain: "bcbd-7373d.firebaseapp.com",
    projectId: "bcbd-7373d",
    storageBucket: "bcbd-7373d.appspot.com",
    messagingSenderId: "285000361776",
    appId: "1:285000361776:web:f43dd3808d3eca09868af5",
    measurementId: "G-9ZDP3ZR1EP"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var admin = require("firebase-admin");

var serviceAccount = require("./bcbd-7373d-d4dc5dff0a06.json");
async function initializeApp(){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const db = admin.firestore();
  return db;

}
async function initializeAppFunctions() {
  admin.initializeApp();
  const db = admin.firestore();
  return db;
}
app.post('/addUser', async (req, res)=>{
  newUser =await db.collection('users').add
( {
     fullName: req.body.fullName ,
     email: req.body.email,
     password: req.body.password, 
     phoneNo: req.body.phoneNo,
     userRole: req.body.userRole, 
     
 })
 console.log('A new User was added with the ID: ', newUser.id);

 //projectData.push(newEntry)
 projectData.unshift(newUser)
 res.send(projectData)
 console.log(projectData)

});