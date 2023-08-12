import creatsDate from './creatDate';

export default function addMessage(name, text) {
  const chat = document.querySelector('.chat');
  const date = creatsDate();
  let elements = 'connection';
  if (name === 'you') {
    elements = 'connection__you';
  }

  // логика на отображении я или не я message__container
  const boxText = `
            <div class="${elements}">
                <div class="message">
                    <span class="message__info ">${name}, ${date}</span>
                    <p class="message__text">${text}</p>
                </div>
            </div>
    `;
  chat.insertAdjacentHTML('beforeend', boxText);
}
