const authenticateUser = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var ownId;
    if(authUser) {
        ownId = authUser.id;
    }
    console.log("OWN ID: " + ownId);
    if (!authUser) {
        console.log("!authusser: " + authUser);
        window.location.assign('login.html');
    }
    console.log("Authenticated user: " + authUser);
    return ownId;
}

const getUserId = (fName,lName,timeStamp,uDetails) => {
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // var currObj = userDetails.filter((item,ind)=>{
    //     return (item.fName==fName && item.lName==lName && item.timestamp == timeStamp);
    // })
    // return currObj.id;
    console.log("User: " + userDetails);

}
console.log(getUserId("Muzammil","Naeem","11:48","a"));

// const getChatHistory = (uID) => {
//     const chatHistory = [{ id: 0, fName: "Salman", lName: "Amir", messages: [{ sid: 1, text: "hello" }, { sid: 0, text: "hi" }, { sid: 1, text: "how are you" }, { sid: 0, text: "fine" }] },
//     { id: 2, fName: "Hamza", lName: "Adil", messages: [{ sid: 1, text: "hello" }, { sid: 2, text: "hi" }, { sid: 1, text: "how are you" }, { sid: 2, text: "fine" }] }
//     ];
//     // let id = 2;
//     let mymsgs;
//     chatHistory.filter((item, index) => {
//         if(item.id == uID){mymsgs=item.messages; return;};

//     // if (index == id) {
//     //     console.log(item.fName, item.lName, item.messages);
//     //     return item;
//     // }
//     });
//     return mymsgs;
//     // console.log("mymsgs",mymsgs);
//     // console.log("chathistory",chatHistory);

//     // return chatHistory;
// };

// let history=getChatHistory(2);
// // console.log(history instanceof Array);
// history.forEach( (item,index,) => {
//     if(item.sid ==1 ){console.log("received: ",item.text);}
//     if(item.sid !=1 ){console.log("sent: ",item.text);}

// });



// // export {chatHistory};

// // const newChat =() => {
// //     let currChat = document.getElementById("chat-current-name");
// //     currChat.innerHTML =``;
// // }


function getNumber(){
    return 2;
}