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

// const getUserId = (fName, lName, timeStamp, uDetails) => {
//     var userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     console.log("User: " + userDetails);

// }
// console.log(getUserId("Muzammil", "Naeem", "11:48", "a"));


var userDetails = [];
var myOwnId;
var currClickId;
let authUser = JSON.parse(localStorage.getItem("authUser"));
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

                console.log("NAME:" + name[0]);
                var lastSeen = name[1] || "";
                console.log("Last Seen:" + lastSeen + " " + typeof lastSeen);

                var currName = name[0].split(" ");
                var currFname = currName[0];
                var currLname = currName[1];
                // var clickedUser = { fName: currFname, lName: currLname, lastSeen: lastSeen };
                // console.log(clickedUser);

                document.getElementById("chat-current-name").innerHTML = name[0];

                // if(lastSeen!="") lastSeen = "Last Seen at: " + lastSeen;    

                document.getElementById("profile-last-seen").innerHTML = "Last Seen at:" + lastSeen;



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
            if (msgItem.sid == _clickId) {
                //render recpient chats

                let chatContent = "";
                let div = document.createElement('div');
                div.setAttribute('id', "chat-screen");

                chatContent += `<div class="card">
                                        <div class="card-body d-flex justify-content-between dropend">
                                            ${msgItem.text}
                                           <button type="button" class="bg-transparent msg-dots" data-bs-toggle="dropdown" aria-expanded="false" id="msg-dots" onclick=msgSettings() >
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                           class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                           <path
                                               d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                             </svg>
                                           </button>
                                           <ul class="dropdown-menu bg-light">
                                           <li class="d-flex align-items-baseline"><a class="dropdown-item" href="#">Delete For Me</a><i class="bi bi-trash me-2 bin"></i></li>
                                         
                                       </ul>
                                      
                                        </div>
                                    </div>`;
                div.innerHTML = chatContent;
                recipientCol.insertAdjacentElement('beforeend', div);

            }
            if (msgItem.sid == _myid) {
                //render own chats

                let chatContent = "";
                let div = document.createElement('div');
                div.setAttribute('id', "chat-screen");

                chatContent += `<div class="card">
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
                                            <li class="d-flex align-items-baseline" id ="del-for-all"><a class="dropdown-item" href="#">Delete For Everyone</a><i class="bi bi-trash me-2 bin"></i></li>
                                            <li class="d-flex align-items-baseline" id ="edit-msg"><a class="dropdown-item" href="#">Edit Message</a><i class="bi bi-pencil-square me-2 edit"></i></li>
                                        </ul>
                                       
                                        </div>
                                    </div>  `;
                div.innerHTML = chatContent;
                myCol.insertAdjacentElement('beforeend', div);
            }
        });
    }
}

function show_hide() {
    var click = document.getElementById("list-items");
    if (click.style.display === "none") {
        click.style.display = "block";
    } else {
        click.style.display = "none";
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
    console.log("chathistry", chat_history);


    // otherwise save msg in chat history

}
console.log("historyFound", historyFound);

const saveMsg = (sid, myid, msg) => {
    let newUserCheck = 0;
    debugger
    let senderHistoryCreated = false;
    if (!authUser.chatHistory || !userDetails[sid].chatHistory || !userDetails[myid].chatHistory) {
        if (!authUser.chatHistory) {
            authUser.chatHistory = [{ id: sid, messages: [{ sid: myid, text: msg }] }];
            localStorage.setItem('authUser', JSON.stringify(authUser));
            newUserCheck++;
        }
        if (!userDetails[sid].chatHistory) {
            userDetails[sid].chatHistory = [{ id: myid, messages: [{ sid: myid, text: msg }] }];
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            newUserCheck++;
            senderHistoryCreated = true;

        }
        if (!userDetails[myid].chatHistory) {
            userDetails[myid].chatHistory = [{ id: sid, messages: [{ sid: myid, text: msg }] }];
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
            recipient.messages.push({ sid: myid, text: msg });
        }
        if (!recipient) {
            //if chat history with another user then create a  new conversation in chathistory of auth user;
            authUser.chatHistory.push({ id: sid, messages: [{ sid: myid, text: msg }] });

        }
        localStorage.setItem('authUser', JSON.stringify(authUser));
    }
    if (userDetails[sid].chatHistory) {
        let recipient = userDetails[sid].chatHistory.find((convo) => {
            if (convo.id == myid && senderHistoryCreated != true) {
                convo.messages.push({ sid: myid, text: msg });
            }
        });
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
    if (userDetails[myid].chatHistory) {
        let recipient = userDetails[myid].chatHistory.find((convo) => convo.id == sid);
        if (recipient) {
            recipient.messages.push({ sid: myid, text: msg });
        }
        //if chat history with another user then create a  new conversation in chathistory of own user in userDetails
        if (!recipient) {
            userDetails[myid].chatHistory.push({ id: sid, messages: [{ sid: myid, text: msg }] });
        }
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