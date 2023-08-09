// import ChatAPI from "./api/ChatAPI";
import Fetch from "./FetchUser";
// import addUserBlock from "./addUserBlock";
import addmessage from "./message";
import addUserBlock from "./addUserBlock";

export default class Chat {
  constructor(root) {
    this.root = root;
    // this.api = new ChatAPI();
    // this.websocket = null;    
    this.request = new Fetch('http://localhost:3000/new-user');
    this.ws = new WebSocket('ws://localhost:3000/ws'); // запрос не корня, а ручку ws
    this.popup = this.root.querySelector('.popup');
    this.forms = this.root.querySelectorAll('form');
    this.input = this.root.querySelector('.input__title');
    this.button =  this.root.querySelector('.btn__send');

    this.container = this.root.querySelector('.container');
    this.connectionUsers = this.container.querySelector('.connection__users');
    this.chatContainer = this.container.querySelector('.chat__container');
    this.chat = this.container.querySelector('.chat');
    this.errorName = this.popup.querySelector('.error__name');
    this.userName = null;

  }

  init() {
    this.forms.forEach((el) => {
      el.addEventListener('submit', (e) => this.onSubmit(e));
    })
    // this.form.addEventListener('submit', (e) => this.onSubmit(e));
    this.input.addEventListener('input', (e) => this.onChange(e));
  }

  onSubmit(e) {
    e.preventDefault();
    const  setMessages = [];
    const message = {};
    if (e.target.classList.contains('popup__form')) {
      let inputTitle = e.target.querySelector('.input__title');
      let name = inputTitle.value.trim();
      this.userName = name;
    
      let inputValueLength = name.length;
      if (inputValueLength > 0) {
        this.request.add({name});
        // this.ws.send(JSON.stringify(name));
      }
    }
    // наши сообщения 
    if (e.target.classList.contains('chat__send')) {
      let chatMessage = e.target.querySelector('.chat__message');
      let text = chatMessage.value.trim();
        if (!text) return;
        message.type = "send";
        message.id = this.request.id;
        message.name = this.request.userName;
        message.text = text;
        // this.userName = this.request.userName;
  
        if (!message) return;
  
        this.ws.send(JSON.stringify(message));
        chatMessage.value = "";
    }

    this.ws.addEventListener('error', (e) => {
      console.log(e);
      console.log('ws error');
    })

    this.ws.addEventListener('open', (e) => {
      const message = {
        name: this.request.userName
      }
      this.ws.send(JSON.stringify(message));

      console.log(e);
      console.log('ws open');
    })

      this.ws.addEventListener('close', (e) => {
      console.log(e);
      console.log('ws close');
    })

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      setMessages.push(data)
      // this.chat.innerHTML = '';

      // this.chat.replaceChildren();
      // setMessages.forEach((el) => {
      //   if (el) {
      //     if (el.name == this.request.userName) {
      //       el.name = "you";
      //     } 

      //       addmessage(el.name, el.text);
      //   } 
      //   console.log('ws message');
      // })

      if (data) {
            if (data.name == this.request.userName) {
              data.name = "you";
            } 
              addmessage(data.name, data.text);
          } 
          console.log('ws message');
    })

      

    //   if (data) {
    //     if (data.name == this.request.userName) {
    //       data.name = "you";
    //     } 
    //       addmessage(data.name, data.text);
    //   } 
    //   console.log('ws message');
    // })
   
  }

  onChange(e) {
    if (!this.errorName.classList.contains('d__none')) {
      this.errorName.classList.add('d__none');
    }
  }

  // removeDisconnectionUser(user) {

  // }





  bindToDOM() {

  }

  registerEvents() {}

  subscribeOnEvents() {}

  onEnterChatHandler() {}

  sendMessage() {}

  renderMessage() {}
}
