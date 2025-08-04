const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea =document.querySelector('.message__area')

do {
    name=prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
       sendMessage(e.target.value)
    }

})
function sendMessage(message) {
    let msg= {
        user: name,
        message:message.trim()
    }
    //Message Append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //send to server
    socket.emit('message', {
        user: name,
        message:message
    } )

}
function appendMessage(msg,type) {
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h1>${msg.user}</h1>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

//Recieve Messages
socket.on('message',(msg)=>{
     appendMessage(msg, 'incoming')
     scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop=messageArea.scrollHeight
}