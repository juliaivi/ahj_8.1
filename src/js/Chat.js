import Fetch from './FetchUser';
import addMessage from './addMessage';
import addUserBlock from './addUserBlock';

export default class Chat {
  constructor() {
    this.root = document.getElementById('root');
    this.request = new Fetch('https://ahj-8-1-server-v1.onrender.com/new-user');
    // this.request = new Fetch('http://localhost:3000/new-user');
    this.popup = this.root.querySelector('.popup');
    this.input = this.root.querySelector('.input__title');
    this.container = this.root.querySelector('.container');
    this.connectionUsers = this.container.querySelector('.connection__users');
    this.errorName = this.popup.querySelector('.error__name');
    this.chatSend = document.querySelector('.chat__send');
    this.popupForm = document.querySelector('.popup__form');
    this.id = null;
    this.userName = null;
  }

  init() {
    this.chatSend.addEventListener('submit', (e) => this.onSubmit(e));
    this.popupForm.addEventListener('submit', (e) => this.onSubmit(e));

    window.addEventListener('beforeunload', () => {
      this.ws.send(JSON.stringify({ type: 'exit', name: this.userName, id: this.id }));
    });
  }

  wsActive() {
    this.ws = new WebSocket('wss://ahj-8-1-server-v1.onrender.com/');
    // this.ws = new WebSocket('ws://localhost:3000/ws'); // запрос не корня, а ручку ws
    this.ws.addEventListener('open', () => {
      console.log('ws open');
    });

    this.ws.addEventListener('close', () => {
      console.log('ws close');
    });

    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);

      if (data instanceof Array) {
        this.connectionUsers.replaceChildren();
        data.forEach((el) => {
          addUserBlock(el, this.userName);
        });
      }

      if (data.text !== null && data.text !== undefined) {
        if (data.name === this.userName) {
          data.name = 'you';
        }
        addMessage(data.name, data.text);

        console.log('ws message');
      }
    });

    this.ws.addEventListener('error', () => {
      console.log('ws error');
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const message = {};
    if (e.target.classList.contains('popup__form')) {
      const name = this.input.value.trim();

      if (name.length > 0) {
        this.request.add({ name })
          .then((el) => {
            const { status } = el;
            if (status === 'ok') {
              this.status = el.status;
              this.popup.classList.add('d__none'); // скрываем попап

              this.userName = el.user.name;
              this.id = el.user.id;
              this.data = el;
              this.wsActive();

              this.container.classList.remove('d__none'); // отображаем чат и участников
            }

            if (status === 'error') { // такое имя есть
              this.errorName.classList.remove('d__none');
            }
          });
      }
    }
    // сообщения
    if (e.target.classList.contains('chat__send')) {
      const chatMessage = e.target.querySelector('.chat__message');
      const text = chatMessage.value.trim();
      if (!text) return;
      message.type = 'send';
      message.id = this.id;
      message.name = this.userName;
      message.text = text;

      if (!message) return;
      this.ws.send(JSON.stringify(message));
      chatMessage.value = '';
    }
  }
}
