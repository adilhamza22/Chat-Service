const authenticateUser = () => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    var ownId;
    if (authUser) {
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


const showHide = (id) => {
    let x = document.getElementById(id);
    if (x.style.display == "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// const getUserId = (fName, lName, timeStamp, uDetails) => {
//     var userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     console.log("User: " + userDetails);

// }
// console.log(getUserId("Muzammil", "Naeem", "11:48", "a"));


var userDetails = [];
var myOwnId;
var currClickId;
let authUser = JSON.parse(localStorage.getItem("authUser"));
var clickItem;
function getChats(event) {
    // event.preventDefault();
    myOwnId = authenticateUser();
    console.log("My OWN ID:", myOwnId);
    // console.log("OWN USER:",ownUser);
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var firstName = "", lastName = "", id;
    console.log("OBJECT:" + firstName, lastName, userDetails);
    if (userDetails) {
        let getListId = document.getElementById('chats-id');
        //    console.log(getListId);
        let currIdDiv = document.getElementById('curr-id-div');

        let content = document.createElement('div');
        content.innerHTML = "";


        // debugger
        for (let i = 0; i < userDetails.length; i++) {
            const y = userDetails[i];

            if (y.id != myOwnId) {

                // firstName = userDetails.fName;
                // lastName = userDetails.lName;
                content.innerHTML +=
                    `<div class="chat-name" id="chat-name" onclick=saveCurrClickId(${i})>
                            
                            <div id="chat-avatar" class="avatar chat-avatar d-flex justify-content-start ">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                                </svg>
                                <div id ="chat-person" style="margin-left: 5px;">${y.fName} ${y.lName}</div> 

                            </div>
                            <div id="last-seen">${y.timestamp || ""}</div>

                        </div>`;
                // debugger
                getListId.appendChild(content);
                // console.log(firstName + " "+ lastName);
            }
        }

        var chatList = document.querySelectorAll(".chat-name");
        
        chatList.forEach((chatList, index) => {
            // var _avatar = chatList.querySelectorAll(".chat-avatar > .chat-person");

            chatList.addEventListener("click", () => {

                var name = chatList.innerText.split("\n");
                clickItem = chatList.innerText;
                console.log(clickItem, "click");

                console.log("NAME:" + name[0]);
                var lastSeen = name[1] || "";

                clickItem = {id:currClickId, name:name[0], lastSeen:lastSeen};
                localStorage.setItem("clickItem", JSON.stringify(clickItem));
                console.log(clickItem, "click");
                console.log("Last Seen:" + lastSeen + " " + typeof lastSeen);

                var currName = name[0].split(" ");
                var currFname = currName[0];
                var currLname = currName[1];
                // var clickedUser = { fName: currFname, lName: currLname, lastSeen: lastSeen };
                // console.log(clickedUser);
                if(screen.width >425){
                    document.getElementById("chat-current-name").innerHTML = clickItem.name;
                    document.getElementById("profile-last-seen").innerHTML = "Last Seen at:" + clickItem.lastSeen;

                }

            })
        })

    }
}


const displayMessages = (_clickId, _myid) => {
    let recipientCol = document.getElementById("sender-msg-col");
    let myCol = document.getElementById("own-msg-col");
    let chatUser = userDetails[_myid].chatHistory.find((_chatUser) => _chatUser.id == _clickId);
    if (!chatUser) {
        alert("NO chat history with user " + _clickId + " found");
        return;
    }
    if (chatUser) {
        if (!chatUser.messages) {
            alert("NO messages");
            return;
        }
        chatUser.messages.forEach((msgItem, msgIndex) => {
            if (msgItem.sid == _myid) {
                //render own chats

                let chatContent = "";
                let div = document.createElement('div');
                div.setAttribute('id', "chat-screen");
                let nowTime = new Date();
                let _timeStamp;
                if(msgItem.timestamp){
                _timeStamp =  msgItem.timestamp;
                }
                
                chatContent += `
                                    <div class="card">
                                        <div class="card-body d-flex justify-content-between dropstart msg-text-div" id ="msg-text-div">
                                            ${msgItem.text}
                                           <button  type="button" class=" bg-transparent msg-dots" id="msg-dots" data-bs-toggle="dropdown" onclick=msgSettings() aria-expanded="false"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                           <path
                                               d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                       </svg>   
                                       </button>

                                        <ul class="dropdown-menu bg-light">
                                            <li class="d-flex align-items-baseline" id ="del-for-me"  onclick=delForMe()><a class="dropdown-item" href="#">Delete For Me</a> <i class="bi bi-trash me-2 bin"></i> </li>
                                            <li class="d-flex align-items-baseline" id ="del-for-all" onclick=delForEveryone()><a class="dropdown-item" href="#">Delete For Everyone</a><i class="bi bi-trash me-2 bin"></i></li>
                                            <li class="d-flex align-items-baseline" id ="edit-msg"><a class="dropdown-item" onclick=editMsg()>Edit Message</a><i class="bi bi-pencil-square me-2 edit"></i></li>
                                        </ul>
                                       
                                        </div>
                                        <div class="ms-3 mb-3"><sub>${_timeStamp || "13:31" }</sub></div>

                                    </div>  `;
                div.innerHTML = chatContent;
                myCol.appendChild( div);
                // chatScreen.appendChild(myCol);

            }
            if (msgItem.sid == _clickId) {
                
                //render recpient chats
                let chatContent = "";
                let div = document.createElement('div');
                div.setAttribute('id', "chat-screen");
                let nowTime = new Date();
                let _timeStamp;
                if(msgItem.timestamp){
                    _timeStamp =  msgItem.timestamp;
                }
                chatContent += `<div class="card">
                                        <div class="card-body d-flex justify-content-between dropend sender-text-div">
                                            ${msgItem.text}
                                           <button type="button" class="bg-transparent msg-dots" data-bs-toggle="dropdown" aria-expanded="false" id="msg-dots" onclick=msgSettings() >
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                           <path
                                               d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                             </svg>
                                           </button>

                                           <ul class="dropdown-menu bg-light">
                                           <li class="d-flex align-items-baseline"><a class="dropdown-item" onclick=delSenderMsgForMe()>Delete For Me</a><i class="bi bi-trash me-2 bin"></i></li>

                                       </ul>
                                        </div>
                                        <div class="ms-3 mb-3"><sub>${_timeStamp || "13:31" }</sub></div>

                                    </div>
                                    
                                    `;
                div.innerHTML = chatContent;
                recipientCol.appendChild(div);
                // chatScreen.appendChild(recipientCol);
            }
            
        });
    }
}

// function show_hide() {
//     var click = document.getElementById("list-items");
//     if (click.style.display === "none") {
//         click.style.display = "block";
//     } else {
//         click.style.display = "none";
//     }
// }


const checkScreenWidth=(width)=> {
    if (screen.width<=425) {
      console.log('im on mobile!')
      width = "mobile";
      
    } else {
      console.log('on a tablet, laptop, or desktop!')
      width = "not mobile";
    }
}

const msgSettings = (text) => {
    console.log('msgSettingsg',);
};


const clearChatScreen = () => {
    let senderMsg = document.getElementById("sender-msg-col");
    let ownMsg = document.getElementById("own-msg-col");
    senderMsg.innerHTML = "";
    ownMsg.innerHTML = "";
};

var historyFound;

const showUsers = () => {
    
    let rightMainContainer = document.querySelector(".right-main-container");
    let leftMainContainer = document.querySelector(".left-main-container");
    let senderMsgCol = document.querySelector(".sender-msg-col");
    console.log(senderMsgCol.innerHTML+" "+"senderMsgCol");
    let ownMsgCol = document.querySelector(".chats-box .own-msg-col");
    let btnBack = document.querySelector(".btn-back");
    let inputSendMsg = document.querySelector(".input-send-msg");
    let profileBarRight = document.querySelector(".profile-bar-right");

    // console.log(leftMainContainer);
    // console.log("right:",rightMainContainer);
    if(rightMainContainer && leftMainContainer){
        let _userDetails = JSON.parse(localStorage.getItem("userDetails", userDetails));
        document.getElementById("chat-current-name").innerHTML = _userDetails[currClickId].fName+" "+_userDetails[currClickId].lName;
        document.getElementById("profile-last-seen").innerHTML = "Last Seen at:" + _userDetails[currClickId].timestamp;
        leftMainContainer.style.display ="none";
        rightMainContainer.style.display="block";
        rightMainContainer.style.width="100%";
        rightMainContainer.style.margin="0";
        senderMsgCol.style.width="70%";
        ownMsgCol.style.width="70% ";
        inputSendMsg.style.display="block";
        inputSendMsg.style.width="90%";
        inputSendMsg.style.left="5%";
        inputSendMsg.style.bottom="5px";
        profileBarRight.style.height="70px";

        btnBack.addEventListener("click", ()=>{
            rightMainContainer.style.display="none";
            leftMainContainer.style.display="block";
        });

    }

};

function saveCurrClickId(index) {
    
    let encryptionAlert = document.getElementById("encryption-box");
    let encryptionAlertContent;
    encryptionAlertContent = "";

    //clear the alert message 
    encryptionAlertContent = ``;
    encryptionAlert.innerHTML = `Messages you send to this chat are now secured with end-to-end encryption.
                Don't tap for more!`;
    currClickId = index;
    console.log(userDetails[currClickId].fName, userDetails[currClickId].id, "myIndex");
    console.log("_CurrClickId", currClickId);
    
    //clear chat screen 
    clearChatScreen();

    // historyFound = retrieveChatHistory(currClickId);
    // if return from retrieve = -1 then create chathistory and save msg in it
    // displayChatHistory();

    let chat_history = userDetails[currClickId].chatHistory;
    if (chat_history == undefined) {
        alert("No Chat history yet");
        return;
    }
  

    displayMessages(currClickId, myOwnId);
    if(screen.width<=425){
        showUsers();

    }
    console.log("chathistry", chat_history);


    // otherwise save msg in chat history

}
console.log("historyFound", historyFound);

const saveMsg = (sid, myid, msg) => {
    debugger
    let newUserCheck = 0;
    let date = new Date();
    let _timestamp = date.getHours()+":"+date.getMinutes();

    debugger
    let senderHistoryCreated = false;
    if (!authUser.chatHistory || !userDetails[sid].chatHistory || !userDetails[myid].chatHistory) {
        if (!authUser.chatHistory) {
            authUser.chatHistory = [{ id: sid, messages: [{ sid: myid, text: msg, timestamp:_timestamp }] }];
            authUser.chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
            localStorage.setItem('authUser', JSON.stringify(authUser));
            newUserCheck++;
        }
        if (!userDetails[sid].chatHistory) {
            userDetails[sid].chatHistory = [{ id: myid, messages: [{ sid: myid, text: msg,timestamp:_timestamp }] }];
            userDetails[sid].chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            newUserCheck++;
            senderHistoryCreated = true;

        }
        if (!userDetails[myid].chatHistory) {
            userDetails[myid].chatHistory = [{ id: sid, messages: [{ sid: myid, text: msg,timestamp:_timestamp }] }];
            userDetails[myid].chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            newUserCheck++;
        }
        if (newUserCheck == 3) {
            return;
        }
    }
    if (authUser.chatHistory) {
        let recipient = authUser.chatHistory.find((convo) => convo.id == sid);
        if (recipient) {
            recipient.messages.push({ sid: myid, text: msg, timestamp:_timestamp });
        }
        if (!recipient) {
            //if chat history with another user then create a  new conversation in chathistory of auth user;
            authUser.chatHistory.push({ id: sid, messages: [{ sid: myid, text: msg,timestamp:_timestamp }] });

        }
        authUser.chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
        localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    if (userDetails[sid].chatHistory) {
        let recipient = userDetails[sid].chatHistory.find((convo) => {
            if (convo.id == myid ) {
                convo.messages.push({ sid: myid, text: msg, timestamp:_timestamp });
            }
                // userDetails[sid].chatHistory.push({ id: myid, messages: [{ sid: myid, text: msg,timestamp:_timestamp }] }) ;
            // userDetails[myid].chatHistory.sort((a,b)=>a.id > b.id? 1:-1);

        });
        userDetails[sid].chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));       
    }
    if (userDetails[myid].chatHistory) {
        let recipient = userDetails[myid].chatHistory.find((convo) => convo.id == sid);
        if (recipient) {
            recipient.messages.push({ sid: myid, text: msg, timestamp:_timestamp });
        }
        //if chat history with another user then create a  new conversation in chathistory of own user in userDetails
        if (!recipient) {
            userDetails[myid].chatHistory.push({ id: sid, messages: [{ sid: myid, text: msg,timestamp:_timestamp }] });
        }
        userDetails[myid].chatHistory.sort((a,b)=>a.id > b.id? 1:-1);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }

    
};


let sendBtn = document.querySelector(".send-btn");

sendBtn.addEventListener("click", () => {
    let _currClickId = currClickId;
    let _myOwnId = myOwnId;
    console.log("sendbtn clicked");
    let msgTyped = document.querySelector(".input-send-msg input").value;
    console.log("MSG TYPED" + msgTyped);
    console.log("history found:", historyFound);

    saveMsg(_currClickId, _myOwnId, msgTyped);
    displayMessages(_currClickId, _myOwnId);


});

const logOut = () => {
    let _authUser = JSON.parse(localStorage.getItem("authUser"));
    _authUser = {};
    localStorage.setItem("authUser", JSON.stringify(_authUser));
    window.location.href = "./login.html";
};

const delForMe = () => {
    debugger
    let msgTextDiv = document.querySelectorAll(".msg-text-div");
    let senderTextDiv = document.querySelectorAll(".sender-text-div");
    msgTextDiv.forEach((item, index) => {
        item.addEventListener("click", () => {
            let msgText = item.firstChild.textContent.trim();
            console.log(item.firstChild.textContent.trim());

            console.log(msgText);
            let _myid = myOwnId;
            let _clickid = currClickId;
            let sid = _myid;
            let _userDetails = JSON.parse(localStorage.getItem("userDetails"));
            let updatedDetails = _userDetails[_myid].chatHistory.forEach((item, index) => {
                let updatedMessages;
                if (item.id == _clickid) {
                    item.messages.forEach((msgItem, msgIndex) => {
                        let trimMsg = msgItem.text.trim();
                        console.log(msgItem.sid == _myid);
                        console.log(trimMsg == msgText);
                        if (msgItem.sid == _myid && trimMsg == msgText) {
                            console.log(item.messages);
                            updatedMessages = item.messages.splice(msgIndex, 1);

                        }
                    })
                    if (updatedMessages) {
                        // item.messages=updatedMessages;
                        console.log(updatedMessages);
                    }
                }
            });
            console.log(_userDetails);
            localStorage.setItem('userDetails', JSON.stringify(_userDetails));
        });
    });
};

const delSenderMsgForMe =() =>{
    debugger
    let senderTextDiv = document.querySelectorAll(".sender-text-div");
    senderTextDiv.forEach((item,index)=>{
        item.addEventListener("click",()=>{
            let msgText = item.firstChild.text.trim();
            console.log(item.firstChild.textContent.trim());
            console.log(msgText);
        });
    });
    
}



const delForEveryone = ()=>{
    debugger
    let msgTextDiv = document.querySelectorAll(".msg-text-div");
    msgTextDiv.forEach((item, index) => {
        item.addEventListener("click", () => {
            let msgText = item.firstChild.textContent.trim();
            console.log(item.firstChild.textContent.trim());
            console.log(msgText);
            let _myid = myOwnId;
            let _clickid = currClickId;
            let sid = _myid;
            let currTime = new Date();
            let currHr = currTime.getHours();
            let _userDetails = JSON.parse(localStorage.getItem("userDetails"));
            let deleted1=false, deleted2=false;
            let updatedDetails = _userDetails[_myid].chatHistory.forEach((item, index) => {
                
                let updatedMessages;
                if (item.id == _clickid) {
                    item.messages.forEach((msgItem, msgIndex) => {
                        let msgTimeStamp = msgItem.timestamp ||"13:31";
                        let msgTimeArr = msgTimeStamp.split(':');
                        let msgTimeHr = msgTimeArr[0].trim();
                        let hrDiff = currHr - msgTimeHr;
                        let trimMsg = msgItem.text.trim();
                        console.log(msgItem.sid == _myid);
                        console.log(trimMsg == msgText);
                        if (msgItem.sid == _myid && trimMsg == msgText && (hrDiff>=0 && hrDiff<=1) ) {
                            console.log(item.messages);
                            updatedMessages = item.messages.splice(msgIndex, 1);
                            deleted1 =true;

                        }
                        // else{
                        //     alert("Cannot Delete Message");
                            
                        // }
                    })
                    if (updatedMessages) {
                        // item.messages=updatedMessages;
                        console.log(updatedMessages);
                    }
                }
            });
            console.log(_userDetails);
            localStorage.setItem('userDetails', JSON.stringify(_userDetails));
            //remove from other persons history

            _userDetails[_clickid].chatHistory.forEach((item,index)=>{
                if(item.id == _myid){
                    item.messages.forEach((msgItem,msgIndex)=>{
                        let trimMsg = msgItem.text.trim();
                        let msgTimeStamp = msgItem.timestamp ||  "13:31";
                        let msgTimeArr = msgTimeStamp.split(':');
                        let msgTimeHr = msgTimeArr[0].trim();
                        let hrDiff = currHr - msgTimeHr;
                        console.log(msgItem.sid == _myid);
                        console.log(trimMsg == msgText);
                        // add timestamp check in if condition 
                        if(msgItem.sid == _myid && trimMsg == msgText && (hrDiff>=0 && hrDiff<=1)) {
                            item.messages.splice(msgIndex, 1);
                            deleted2 =true;

                        }
                        

                    })
                }
            });
            console.log(_userDetails);
            if(deleted1 == false &&  deleted2 == false) {alert("Cannot delete message after one Hour");}
            localStorage.setItem('userDetails', JSON.stringify(_userDetails));
            // console.log(_userDetails);
        });
    });
       
};

const editMsg = () => {
    debugger
    let msgTextDiv = document.querySelectorAll(".msg-text-div");
    msgTextDiv.forEach((item,index)=>{
        item.addEventListener("click",()=>{
            alert("Enter your message in the input field and press edit button");
            let editBtn = document.querySelector(".edit-btn");
            editBtn.addEventListener("click",()=>{
                let msgEdit = document.querySelector(".input-send-msg input").value;
                console.log("msgEdit:", msgEdit);
                let _myid = myOwnId;
                let _clickId = currClickId;
                let _userDetails = JSON.parse(localStorage.getItem("userDetails"));
                let msgText = item.firstChild.textContent.trim();
                console.log(msgText);
                //edit in my history
                _userDetails[_myid].chatHistory.forEach((userItem,userIndex)=>{
                    if(userItem.id == _clickId){
                        userItem.messages.forEach((msgItem,msgIndex)=>{
                        let msgItemText = msgItem.text.trim(); 
                            if(msgItem.sid == _myid && msgItemText == msgText){
                                let currTime = new Date();
                                currTime = currTime.getHours()+":"+currTime.getMinutes();
                                msgItem.text = msgEdit.trim();
                                msgItem.timestamp = currTime;
                                console.log(msgItem.text);
                                console.log(_userDetails);
                                localStorage.setItem("userDetails", JSON.stringify(_userDetails));

                            }
                        });
                    }
                });
                //edit in click users history as well
                _userDetails[_clickId].chatHistory.forEach((userItem,userIndex)=>{
                    if(userItem.id == _myid){
                        userItem.messages.forEach((msgItem,msgIndex)=>{
                        let msgItemText = msgItem.text.trim(); 
                            if(msgItem.sid == _myid && msgItemText == msgText){
                                let currTime = new Date();
                                currTime = currTime.getHours()+":"+currTime.getMinutes();
                                msgItem.text = msgEdit.trim();
                                msgItem.timestamp = currTime;
                                console.log(msgItem.text);
                                console.log(_userDetails);
                                localStorage.setItem("userDetails", JSON.stringify(_userDetails));
                            }
                        });
                    }
                });
            });
            
        });
    });
};
const clearChat = () => {
    debugger
    let _clickId = currClickId;
    let _myid = myOwnId;
    let _userDetails = JSON.parse(localStorage.getItem('userDetails'));
        _userDetails[_myid].chatHistory.forEach((item,index) => {
        if(item.id == _clickId) {
            _userDetails[_myid].chatHistory.splice(index, 1);
            localStorage.setItem('userDetails',JSON.stringify(_userDetails));
        }
    });
    console.log(_userDetails);
}






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


function getNumber() {
    return 2;
}
// let msgDots =  document.getElementById("msg-dots");
// msgDots.addEventListener("click", ()=>{
//     console.log("msg-dots clicked");
// });