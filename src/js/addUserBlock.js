export default function addUserBlock(data) {
    const connectionUsers = document.querySelector('.connection__users')

    // логика на отображении я или не я
    const boxText = `
            <li class="connection__user" data-id="${data.user.id}">
                <p class="connection__prewiew"></p>
                <p class="user">${data.user.name}</p>
            </li>
    `;  
    connectionUsers.insertAdjacentHTML('beforeend', boxText);
}