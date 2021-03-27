// Setup empty JS object to act as endpoint for all routes

const projectData = [];

// Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Spin up the server

const port = 8100;
const server = app.listen(port, listening);

// Callback to debug

function listening() {
    console.log(`Server running on port: ${port}`);
}


// Callback function to complete GET '/all'

app.get('/all', function (req, res) {

    res.send(projectData);

})

// firebase
var firebase = require('firebase');

/* Firebase Auth*/

/* Firebase Firestore*/

require("firebase/firestore");

/* Firebase UI*/


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

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

app.post('/addUser', async (req, res) => {
    newUser = await db.collection('users').add
        ({
            fullName: req.body.fullName,
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
// Post Route

/*Add New User*/

// app.post('/submit-user', (req, res) => {
//     newUser =
//     {
//      fullName:req.body.fullName,
//      email:req.body.newEmail,
//      password:req.body.newPassword,
//      userRole:req.body.userRole,
//      phoneNo:req.body.newPhone
//     }

//    // projectData.push(newEntry)
//     projectData.unshift(newUser)
//     res.send(projectData)
//     res.end()
//     console.log(projectData)

//   });


module.exports = { app };



