import addUserBlock from "./addUserBlock";
import Chat from "./Chat";

export default class Fetch{
    constructor(server) {
        this.server = server;
        this.chat = 
        this.popup = document.querySelector('.popup');
        this.container = document.querySelector('.container');
        this.errorName = document.querySelector('.error__name');
        this.userName = null;
        this.id = null;
    }

    async add(name) {
        const request = await fetch(this.server, { //фетч возвращает промис, нужно ждать когда промис развизолвится
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //  чтоб на сервере распарсился объект, а не строка
            },
            body: JSON.stringify(name), // атрибут в который можно передавать различные типы данных (отправляем JSON)
        });
        

        const result = await request; //полученный результат   получить данные так через async await либо через request.then()

        // if (!result.ok) { // отсеиваем все ответы которые не ок
        //     console.error('Ошибка');
        //     return;
        // }

        const json = await result.json();

        const status = json.status;


        if (status == 'ok') {
            this.popup.classList.add('d__none'); //скрываем попап
            addUserBlock(json); //отрисовываем участника 
            this.userName = json.user.name;
            this.id = json.user.id;
            this.container.classList.remove('d__none'); // отображаем чат и участников
            console.log(json);
        }

        if (status == 'error') { // такое имя есть будет от сервера ошибка, показать уведомление
            this.errorName.classList.remove('d__none');
        }
        // console.log(status);
       
    }
}