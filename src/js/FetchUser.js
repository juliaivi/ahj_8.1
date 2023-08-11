import addUserBlock from './addUserBlock';

export default class Fetch {
  constructor(server) {
    this.server = server;
    this.popup = document.querySelector('.popup');
    this.container = document.querySelector('.container');
    this.errorName = document.querySelector('.error__name');
    this.userName = null;
    this.id = null;
    this.status = null;
  }

  async add(name) {
    const request = await fetch(this.server, { // фетч возвращает промис, нужно ждать когда промис развизолвится
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //  чтоб на сервере распарсился объект, а не строка
      },
      body: JSON.stringify(name), // атрибут в который можно передавать различные типы данных (отправляем JSON)
    });

    const result = await request; // полученный результат   получить данные так через async await либо через request.then()
    const json = await result.json();

    // const status = json.status;

    // if (status == 'ok') {
    //     this.status = json.status;
    //     this.popup.classList.add('d__none'); //скрываем попап
    //     addUserBlock(json); //отрисовываем участника
    //     this.userName = json.user.name;
    //     this.id = json.user.id;
    //     this.container.classList.remove('d__none'); // отображаем чат и участников
    // }

    // if (status == 'error') { // такое имя есть будет от сервера ошибка, показать уведомление
    //     this.errorName.classList.remove('d__none');
    // }
    return await json;
  }
}
