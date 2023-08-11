// import ChatAPI from "./api/ChatAPI";
import Fetch from './FetchUser';
import addmessage from './message';
import addUserBlock from './addUserBlock';

export default class Chat {
  constructor() {
    this.root = document.getElementById('root');
    // this.api = new ChatAPI();
    // this.websocket = null;
    this.request = new Fetch('http://localhost:3000/new-user');
    // this.ws = new WebSocket('ws://localhost:3000/ws'); // запрос не корня, а ручку ws
    this.popup = this.root.querySelector('.popup');
    this.forms = this.root.querySelectorAll('form');
    this.input = this.root.querySelector('.input__title');
    this.button = this.root.querySelector('.btn__send');

    this.container = this.root.querySelector('.container');
    this.connectionUsers = this.container.querySelector('.connection__users');
    this.chatContainer = this.container.querySelector('.chat__container');
    this.chat = this.container.querySelector('.chat');
    this.errorName = this.popup.querySelector('.error__name');
    this.connectionUsers = document.querySelector('.connection__users');
    this.chatSend = document.querySelector('.chat__send');
    this.popupForm = document.querySelector('.popup__form');
    this.connected = false;
    this.setConnecte = false;
    this.id = null;
    this.userName = null;
  }

  init() {
    this.chatSend.addEventListener('submit', (e) => this.onSubmit(e));

    this.popupForm.addEventListener('submit', (e) => this.onSubmit(e));
  //   this.input.addEventListener('input', (e) => this.onChange(e));
  //   // window.addEventListener('beforeunload', () => {
  //   //   (JSON.stringify({ type: 'exit', name: this.userName })).send(this.ws);
  //   //   // (JSON.stringify({ type: 'exit', name: this.userName, id: this.id })).exit(this.ws);
  //   //   // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
  //   // });
  }

  wsActive() {
    this.ws = new WebSocket('ws://localhost:3000/ws'); // запрос не корня, а ручку ws
    this.ws.addEventListener('open', (e) => {
      console.log(e);
      console.log('ws open');
    });

    this.ws.addEventListener('close', (e) => {
      console.log(1);
      // (JSON.stringify({name: this.userName })).send(this.ws);
      this.ws.send(JSON.stringify({name: this.userName, id: this.id }));
      // this.userName.send(this.ws);
      // this.userName.delete(this.ws);
      // (JSON.stringify({name: this.userName, id: this.id })).delete(this.ws);
      // this.ws.delete(JSON.stringify({name: this.userName, id: this.id }));
      // (JSON.stringify({ type: 'exit', name: this.userName })).send(this.ws);
      // (JSON.stringify({ type: 'exit', name: this.userName })).close(this.ws);

      // (JSON.stringify({ type: 'close', name: this.userName })).send(this.ws);
      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
      // this.ws.exit(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
      // this.userName.exit(this.ws);
      // this.userName.send(this.ws);
      // (JSON.stringify( { type: 'exit', name: this.userName, id: this.id }) ).send(this.ws);
      // ({ type: 'exit', name: this.userName, id: this.id }).send(this.ws);

      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
  
      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));

      console.log(e);
      console.log('ws close');
    });

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      console.log(data);

      if (data instanceof Array) {
        this.connectionUsers.replaceChildren();
        data.forEach((el) => {
          addUserBlock(el, this.userName);
        });
      }

      if (data.text !== null && data.text !== undefined) {
        if (data.name == this.userName) {
          data.name = 'you';
        }
        addmessage(data.name, data.text);

        console.log('ws message');
      }
    });

    this.ws.addEventListener('error', (e) => {
      console.log(e);
      console.log('ws error');
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const message = {};
    
    // if (!this.connected) {
    //   if (this.popup.classList.contains('d__none')) {
    //     this.popup.classList.remove('d__none');
    //   }
    // }
    if (e.target.classList.contains('popup__form')) {
      const inputTitle = e.target.querySelector('.input__title');
      const name = inputTitle.value.trim();
      this.userName = name;

      const inputValueLength = name.length;
      if (inputValueLength > 0) {
        const nameEl = (this.request.add({ name }))
          .then((el) => {
            const { status } = el;
            if (status == 'ok') {
              this.status = el.status;
              this.popup.classList.add('d__none'); // скрываем попап

              this.userName = el.user.name;
              this.id = el.user.id;
              this.data = el;
              this.wsActive();
              //  this.ws.send(JSON.stringify(name));

              this.container.classList.remove('d__none'); // отображаем чат и участников
            }

            if (status == 'error') { // такое имя есть будет от сервера ошибка, показать уведомление
              this.errorName.classList.remove('d__none');
            }
          });
      }
    }
    // наши сообщения
    if (e.target.classList.contains('chat__send')) {
      const chatMessage = e.target.querySelector('.chat__message');
      const text = chatMessage.value.trim();
      if (!text) return;
      message.type = 'send';
      message.id = this.id;
      message.name = this.userName;
      message.text = text;
      // this.userName = this.request.userName;

      if (!message) return;
      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
      //  this.userName.exit(this.ws);
      // this.userName.send(this.ws);
      // (JSON.stringify({ type: 'exit', name: this.userName, id: this.id })).send(this.ws);
      // (JSON.stringify({ type:'exit', name: this.userName })).exit(this.ws);
      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
      // (JSON.stringify({type: 'exit', name: this.userName, id: this.id })).exit(this.ws);
      // this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));

      this.ws.send(JSON.stringify(message));
      chatMessage.value = '';
    }
  }

  onChange(e) {
    if (!this.errorName.classList.contains('d__none')) {
      this.errorName.classList.add('d__none');
    }
  }

  bindToDOM() {

  }

  registerEvents() {}

  subscribeOnEvents() {}

  onEnterChatHandler() {}

  sendMessage() {}

  renderMessage() {}
}
