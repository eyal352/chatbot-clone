import './style.scss';
import './app.css';
// Write Javascript code!
 
const inputForm = document.querySelector('.controls');
const textInput = document.querySelector('.controls input');
const messageBox = document.querySelector('.message-box');
const currentTyper = document.querySelector('.current-typer');

// const sendLocalMessage = function(message) {
//   console.log(message);
//   messageBox.insertAdjacentHTML('beforeend' `<li id=${message.id} class="message ${message.user === "me"? "me": ''}"> ${message.content} </li> `)
// }

inputForm.onsubmit = event => {
  event.preventDefault();
  //console.log(textInput.value)
  window.Chat.sendMessage(textInput.value);
  window.Chat.onMessage(renderMessage)
  inputForm.reset();
}

  window.Chat.onTyping(typingUser)

function typingUser(user){
    console.log(user)
    currentTyper.innerHTML = `${user === 'Me'? '': user + ' is writing...'}`
  }

let prevUser

  function renderMessage(message){
    console.log(message);
    let sameUser = false;
    if(prevUser === message.user){
      sameUser = true
    } else {
      sameUser = false
      prevUser = message.user
    }

    messageBox.insertAdjacentHTML('beforeend', 
    `<li id=${message.id} class="message ${message.user == "Me" ? "self": ''}"> 
      ${sameUser? '' : `<p class='user-name'> ${message.user}</p>`}
      <p>${message.content}<p> 
      <p class='time'> ${Date(message.timestamp).slice(15, 21)} </p> 
    </li> `)
    messageBox.scrollTop = messageBox.scrollHeight;
  }