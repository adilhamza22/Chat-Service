// import { fire } from 'sweetalert2';
var myid =0;
const submitForm = function () {
    let fName = document.getElementById("fName").value;
    // console.log(fName);
    let lName = document.getElementById("lName").value;
    // console.log(lName);
    let email = document.getElementById('email').value;
    // console.log(email);
    let password = document.getElementById('password').value;
    //validate user

    if(fName=="") {alert("Please enter your first name"); return 0;}
    if(lName=="") {alert("Please enter your last name"); return 0;}
    if(email=="") {alert("Please enter your email address"); return 0}
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    
    let result = regex.test(email);
    // console.log(result);
    // console.log( typeof email ); 
    // if (result) {
    //     console.log("Email okay!");
    // }
    if(!result) {
        alert("Email not valid!");
        return 0;
    }
    if(password=="") {alert("Please enter your password"); return 0}
    let passRegex = /^[A-Z]+[A-Za-z0-9]+$/;
    let passResult = passRegex.test(password);
    if(!passResult) {
        alert("Enter password in the correct format");
        return 0;
    }
    if(password.length < 8 || password.length>20) {
        alert('Please enter a password with at least 8 characters and at most 20 characters');
        console.log("passowrd: "+password+" length of password: "+password.length);
        return 0;
    }
    // console.log(password);
    const userObject = {fName:fName,lName:lName,email:email,password:password};

    //hardcoded predefiened chat history "values" for testing purposes 
        // const chatHistory = [{ id: 0, fName: "Salman", lName: "Amir", messages: [{ sid: 1, text: "hello" }, { sid: 0, text: "hi" }, { sid: 1, text: "how are you" }, { sid: 0, text: "fine" }] },
        // { id: 2, fName: "Hamza", lName: "Adil", messages: [{ sid: 1, text: "hello" }, { sid: 2, text: "hi" }, { sid: 1, text: "how are you" }, { sid: 2, text: "fine" }] }
        // ];


    // console.log("userobject:", userObject);

    let userArray = JSON.parse(localStorage.getItem("userDetails")) || [];
    let emailTaken = false;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].email == userObject.email) {
            emailTaken = true;
            alert("Email already taken");
            // setTimeout(5);
            return 0;
        }
    }

    if (emailTaken == false) {
        userObject.id=userArray.length; 
        myid=userArray.length;
        console.log("User Array length: " + userArray.length);
        userArray.push(userObject);
        console.log("userArray push:", userArray);
        var userDetails = JSON.stringify(userArray);
        localStorage.setItem("userDetails", userDetails);
        console.log("userobject stringified:", userDetails);
        alert("Successfully registered");
        
        // fire(
        //     'Successfully Registered!!'
        //     // 'You clicked the button!',
        //     // 'success'
        // )
        window.open("login.html");
        return 0;
        // window.location.assign("./login.html");// re-direct to dashboard
    }

}

