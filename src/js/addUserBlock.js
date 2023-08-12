export default function addUserBlock(data, el) {
  const connectionUsers = document.querySelector('.connection__users');

  if (data.name === el) {
    data.name = 'you';
  }

  const boxText = `
            <li class="connection__user" data-id="${data.id}">
                <p class="connection__prewiew"></p>
                <p class="user">${data.name}</p>
            </li>
    `;
  connectionUsers.insertAdjacentHTML('beforeend', boxText);
}
