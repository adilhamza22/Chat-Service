const loginForm = function () {
    var emailPresent = false;
    var passPresent = false;
    let email = document.getElementById("email").value;
    console.log("email", email);
    let password = document.getElementById("password").value;
    console.log("password", password);
    if (email == "") {
        alert("Please enter your email address");
        return 0;
    }
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


    if (password == "") {
        alert("Please enter your password");
        return 0;

    }
    let passRegex = /^[A-Z]+[A-Za-z0-9]+$/;
    let passResult = passRegex.test(password);
    if(!passResult) {
        alert("Enter password in the correct format");
        return 0;
    }


    if (password.length < 8|| password.length >20)  {
        alert("Wrong Password");
        return 0;
    }
    
    const userObject = { email: email, password: password };
    console.log("userObject: ", userObject);
    let userArray = JSON.parse(localStorage.getItem("userDetails")) || [];

    if (userArray.length < 0) {
        alert("Please signup first");
        // window.location.href = "signup.html";
        window.open("signup.html");

        // REDIRECT TO SIGNUP


        // userArray .push(userObject);
    }

    for (let x = 0; x < userArray.length; x++) {
        console.log("userArray at x:" + x + userArray[x].email, typeof userArray[x].email);

        if (userArray[x].email == userObject.email) {
            emailPresent = true;
        }
        if (userArray[x].password == userObject.password) {
            passPresent = true;
        }
        if (emailPresent == true && passPresent == true) { 
            //add id to user object
            userObject.id=userArray[x].id;
            //add timestamp 
            var date = new Date();
            var current_time = date.getHours() + ":" + date.getMinutes();
            
            console.log(current_time);
            userObject.timestamp=current_time;
            //add timestamp to userArray as well
            userArray[x].timestamp=current_time;
            console.log("User Array x: ",userArray[x].timestamp);
            localStorage.setItem("userDetails", JSON.stringify(userArray));
            break; 
        }
    }
    console.log(emailPresent, passPresent);
    if (emailPresent == true && passPresent == true) {
        // var today = new Date();
        // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // userObject[timeStamp] =time;
        var authUser =JSON.stringify(userObject);
        localStorage.setItem('authUser', authUser);
        //also set last timeStamp in userDetails 
        // for(let item=0;item<userArray.length;item++) {
        //     if(userArray[item].email == userObject.email){
        //         userArray[item][timeStamp] = time;

        //     }
        // }
        // console.log("authUser:   ", authUser);
        alert("Successfully logged in!");
        // REDIRECT TO HOMEPAGE
        window.open("home.html");
        
        // location.href = "home.html";
        // console.log("referrer: ", document.referrer);
        // setTimeout(function(){document.location.href = "home.html;"},500);

        // window.location.href = "http://www.w3schools.com";
        // window.location.href='\home.html';
    }
    if (emailPresent == false || passPresent == false) {
        alert("Sign up first!");
    }
    return false;
}