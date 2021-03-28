
// var el= document.getElementById('submitUser');
// el.addEventListener('click', addUser);

// function addUser() {

//   fullName = document.getElementById("full-name").value;
//   email = document.getElementById("new-email").value;
//   password = document.getElementById("new-password").value;
//   confirmPass = document.getElementById("new-conpassword").value;
//   phoneNo = document.getElementById("new-phone").value;
//   userRole = document.getElementById("new-userrole").value;

//   signUpWithEmailPassword(email, password)
//     .then(function (data) {
//       console.log(data);
//       postData('/add', {
//         fullName: fullName,
//         email:email,
//         password: password,
//         phoneNo:phoneNo,
//         userRole: userRole
//       });
//    addtodb(); 
//     });
// console.log('mod');

// }

// const postData = async ( url = '', data = {})=>{

//   console.log(data)
//   const response = await fetch(url, {
//     method: 'POST', 
//     credentials: 'same-origin', 
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },

//     body: JSON.stringify(data) 
//   });
//   try {
//     const newData = await response.json();
//     return newData;

//   } catch(error) {
//       console.log("error", error);
//   };
// }


// function signInWithEmailPassword(email, password) {
//   var email = this.email;
//   var password = this.password;
//   // [START auth_signin_password]
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in
//       var user = userCredential.user;
//       // ...
// //     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });
//   // [END auth_signin_password]
// }

// function sendPasswordReset() {
//   const email = "sam@example.com";
//   // [START auth_send_password_reset]
//   firebase.auth().sendPasswordResetEmail(email)
//     .then(() => {
//       // Password reset email sent!
//       // ..
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });
//   }

 