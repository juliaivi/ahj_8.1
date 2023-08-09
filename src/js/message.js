import creatsDate from "./creatDate";

export default function addmessage(name, text) {
    const chat = document.querySelector('.chat');
    const date = creatsDate();

// логика на отображении я или не я message__container
    const boxText = `
            <div class="connection-user">
                <div class="message">
                    <span class="message__info ">${name}, ${date}</span>
                    <p class="message__text">${text}</p>
                </div>
            </div>
    `;
    chat.insertAdjacentHTML('beforeend', boxText);

   
}


