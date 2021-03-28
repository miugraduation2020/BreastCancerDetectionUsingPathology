
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
        email:email,
        password: password,
        phoneNo:phoneNo,
        userRole: userRole
      });
   addtodb(); 
    });
console.log('mod');

}

const postData = async ( url = '', data = {})=>{

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

  } catch(error) {
      console.log("error", error);
  };
}


const addtodb = async(url='')=>{
    const request = await fetch(url);
    
      try{
          const alldata = await request.json();
          newUser = db.collection('users').add({     
            fullName: alldata[0].fullName,
            email: alldata[0].email,
            password: alldata[0].password,
            phoneNo: alldata[0].phoneNo,
            userRole: alldata[0].userRole,

       
  })

        
  
      } catch(error){
          console.log("error", error);
      }
  }


  
 function signUpWithEmailPassword(email, password) {
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signup_password]
}


