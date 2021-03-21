// Setup empty JS object to act as endpoint for all routes

const projectData=[];

// Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require('body-parser')

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors= require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('Application'));

// Spin up the server

const port = 8000;
const server = app.listen(port,listening);

// Callback to debug

function listening()
{
    console.log(`Server running on port: ${port}`);
}

// Callback function to complete GET '/all'

app.get('/all', function (req, res) {

    res.send(projectData);

  })

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

    projectData.push(newEntry)
    projectData.unshift(newEntry)
    res.send(projectData)
    console.log(projectData)

// });