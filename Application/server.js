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


const {PythonShell} = require('python-shell');
// var pyshell = new PythonShell('D:\\MIU\\Graduation Project\\project\\BreastCancerDetectionUsingPathology\\test.py');

// pyshell.send(JSON.stringify(["D:\\MIU\\Graduation Project\\ICIAR2018_BACH_Challenge\\Photos\\Invasive"]));

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };

//     console.log('finished');
// });

// The path to your python script
var myPythonScript = "D:\\MIU\\Graduation Project\\project\\BreastCancerDetectionUsingPathology\\Application\\test.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "C:\\Users\\DELL\\AppData\\Local\\Programs\\Python\\Python38\\python.exe";
const { spawn } = require('child_process')

const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)

function run() {
  return new Promise((resolve, reject) => {
    const process = spawn(pythonExecutable, [myPythonScript, 'D:\\MIU\\Graduation Project\\invasive-ductal-carcinoma.jpg']);

    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );

    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      if (code !== 0) {
        reject(new Error(err.join('\n')))
        return
      }
      try {
        resolve(JSON.parse(out[0]));
      } catch(e) {
        reject(e);
      }
    });
  });
}

(async () => {
  try {
    const output = await run()
    logOutput('main')(output.message)
    process.exit(0)
  } catch (e) {
    console.error('Error during script execution ', e.stack);
    process.exit(1);
  }
})();
//Function to convert an Uint8Array to a string
// var uint8arrayToString = function(data){
//     return String.fromCharCode.apply(null, data);
// };

// const spawn = require('child_process').spawn;
// const scriptExecution = spawn(pythonExecutable, [myPythonScript]);

// // Handle normal output
// scriptExecution.stdout.on('data', (data) => {
//     console.log(String.fromCharCode.apply(null, data));
// });
// scriptExecution.stderr.on('data', (data) => {
//     // As said before, convert the Uint8Array to a readable string.
//     console.log(uint8arrayToString(data));
// });

// scriptExecution.on('exit', (code) => {
//     console.log("Process quit with code : " + code);
// });
// // Write data (remember to send only strings or numbers, otherwhise python wont understand)
// // var data = JSON.stringify([1,2,3,4,5]);
// // scriptExecution.stdin.write(data);
// // // End data write
// // scriptExecution.stdin.end();

// // const spawn = require('child_process').spawn;
// // const scriptExecution = spawn(pythonExecutable, [myPythonScript]);

// // // Handle normal output
// // scriptExecution.stdout.on('data', (data) => {
// //     console.log(String.fromCharCode.apply(null, data));
// // });

// // // Write data (remember to send only strings or numbers, otherwhise python wont understand)
// // var data = JSON.stringify([1,2,3,4,5]);
// // scriptExecution.stdin.write(data);
// // // End data write
// // scriptExecution.stdin.end();

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