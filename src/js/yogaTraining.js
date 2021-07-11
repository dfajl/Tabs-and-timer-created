// window.addEventListener('loaded'); одно из событий для глобального объекта. но оно не особо нам подходит, т.к., JS начнет свою работу только тогда, когда загрузится ВЕСЬ DOM (до последней картинки). но это не совсем удобно

//window.addEventListener('DOMContentLoaded');
// этот обработчик намного приоритетнее первого. скрипт начинает работать уже тогда, когда загружена ОСНОВНАЯ структура дом-документа (без картинок и т.д.)

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {                      
        for (let i = a; i < tabContent.length; i++) { 
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }   
    hideTabContent(1);

    function showTabContent (b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show'); 
        }
    };
    	
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
               	if (target == tab[i]) {
				hideTabContent(0);
				showTabContent(i);
				break;
            	}
            }
        }

    });




                                                         // Timer

    let deadline = '2021-12-31'; // конечная дата

    function getTimeRemaining (endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()), 
            //отнимаем время в милисекундах от дэдлайна до текущей даты
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            days = Math.floor((t / (1000 * 60 * 60 * 24)));

        // чтобы получить дни: 
        // hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        // days = Math.floor((t / (1000 * 60 * 60 * 24)));
        // так как из функции взять сразу несколько переменных мы не можем - вернем их в виде объекта и функции return

        return {
            'total': t, //полное количество милисекунд
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'days': days
        };
    }
  
    function setClock (endTime) {  
        let timer = document.getElementById('timer'), // в видеоуроке он передаетсюда аргумент id, я убрал его и все работает
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            days    = timer.querySelector('.days'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining (endTime);

            function addZero (num) {
                if (num <= 9) {
                    return '0' + num; 
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours) + ' часов';
            minutes.textContent = addZero(t.minutes) + ' минут';
            seconds.textContent = addZero(t.seconds) + ' секунд';
            days.textContent = addZero(t.days) + ' дней';

            if (t.total <= 0) {
                clearInterval (timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                days.textContent = '00' ;
            }
        }    
    }

    setClock(deadline); 
    // эта функция выставляет и запускает наши часы






                                                        // modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btntabs = document.getElementsByClassName('description-btn')[0]; //для кнопки в табах

    btntabs.addEventListener('click', function () {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        

    });

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        // this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; //запрет прокрутки страницы во время режима открытого мадального окна
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
         
        document.body.style.overflow = ''; //отмена запрета прокрутки при закрытии модального окна
    });


                                                        // Form
    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы свяжемся с вами позже!',
        failure: 'Что-то пошло не так :('
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'), // это инпуты с поределенной формы, которую я получил выше
        statusMessage = document.createElement('div'), // создал блок, куда помещу сообщения из объекта message
        formContacts = document.getElementById('form'),
        inputContacts = formContacts.getElementsByTagName('input');

        
        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) { 
        // обрати внимание: обработчик события навешиваем не на кнопку "отправить", а на саму ФОРМУ, то есть, событие происходит лишь тогда, когда отправляется форма

        event.preventDefault();
        // так я отменил стандартное поведение браузера. т.е. он при отправке формы всегда перезагружается. даже с использование AJAX

        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        
        let formData = new FormData(form); //таким образом я получил все данные, которые ввел пользователь во все наши инпуты в данной форме

        request.send(formData);


        // let obj = {};
        // formData.forEach(function(value, key) {
        //     obj[key] = value;
        // });
        // let json = JSON.stringify(obj);

        // request.send(json); для передачи данных в формате JSON
        

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
            
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }

    }); 

        formContacts.addEventListener('submit', function(event) { 
            // обрати внимание: обработчик события навешиваем не на кнопку "отправить", а на саму ФОРМУ, то есть, событие происходит лишь тогда, когда отправляется форма
    
            event.preventDefault();
            // так я отменил стандартное поведение браузера. т.е. он при отправке формы всегда перезагружается. даже с использование AJAX
    
            formContacts.appendChild(statusMessage);
    
            let requestContacts = new XMLHttpRequest();
            requestContacts.open('POST', 'server.php');
            requestContacts.setRequestHeader('Content-Type', 'application/json; charset = utf-8');
    
            
            let formContactsData = new FormData(formContacts); 
            // таким образом я получил все данные, которые ввел пользователь во все наши инпуты в данной форме
    
            let obj = {};

            formContactsData.forEach(function(value, key){
                obj[key]=value;
            });

            let json = JSON.stringify(obj);

            requestContacts.send(json);


            requestContacts.addEventListener('readystatechange', function () {
                if (requestContacts.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (requestContacts.readyState === 4 && requestContacts.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
                
            });


        for (let i = 0; i < inputContacts.length; i++) {
            inputContacts[i].value = '';
        }

    });
   
});


