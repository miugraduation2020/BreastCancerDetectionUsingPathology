// Setup empty JS object to act as endpoint for all routes

const projectData=[];

// Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require('body-parser')

/* Firebase*/
var firebase = require('firebase');
require("firebase/auth");
require("firebase/firestore");

var admin = require("firebase-admin");

var serviceAccount = require("./bcbd-7373d-d4dc5dff0a06.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const db = admin.firestore();

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors= require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Spin up the server

const port = 8000;
const server = app.listen(port,listening);

// Callback to debug

function listening()
{
    console.log(`Server running on port: ${port}`);
}

// Callback function to complete GET '/all'

// app.get('/all', function (req, res) {

//     res.send(projectData);

//   })

// Post Route

  
// app.post('/add',  (req, res)=> {

//     newEntry =
//     {
//         temp: req.body.temp ,
//         date: req.body.date,
//         weather: req.body.weather, 
//         //weathericon: req.body.weathericon, 
//         weatherdesc: req.body.weatherdesc,
//         templike: req.body.templike, 
//         pressure: req.body.pressure, 
//         humidity: req.body.humidity, 
//         windspeed: req.body.windspeed, 
//         winddeg: req.body.winddeg, 
//         cloud: req.body.cloud,
//         sunrise: req.body.sunrise, 
//         sunset: req.body.sunset, 
//         country: req.body.country, 
//        // timezone: req.body.timezone
        
//     }

  

    // projectData.push(newEntry)
    // projectData.unshift(newEntry)
    // res.send(projectData)
    // console.log(projectData)

// });