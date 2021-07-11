(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function calculate () {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,   
        total = 0;    // общая сумма

        totalValue.innerHTML = 0;

        persons.addEventListener('input', function () {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (restDays.value == '' || persons.value == '' ) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }


        });

        restDays.addEventListener('input', function () {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }

        });

        place.addEventListener('change', function () {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }

        });

}

module.exports = calculate;
},{}],2:[function(require,module,exports){
function form () {
    let message = {
        loading: 'Загрузка',
        success: 'Thank you! We will get in touch with you later!',
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

        let formData = new FormData(form); 

        function postData (data) {

            return new Promise (function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');

                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                request.send(data);

                request.onreadystatechange =  function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                       resolve();
                    } else {
                        reject();
                    }
                    
                };
        
                
            });

        }

        function clearInput () {
            for (let i = 0; i < input.length; i++) {
            input[i].value = '';
            } 
        }

        postData(formData)
            .then ( ()=> {statusMessage.innerHTML = message.loading;
                            console.log('промис сработал первый раз')
                        })

            .then ( ()=> {statusMessage.innerHTML = message.success;
                console.log('промис сработал второй  раз')})

            .catch ( ()=> statusMessage.innerHTML = message.failure)
            .then (clearInput)
            
        

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


} 

module.exports = form;
},{}],3:[function(require,module,exports){
function modal () {
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
}

module.exports = modal;
},{}],4:[function(require,module,exports){
function slider () {
    let slideIndex = 1, // параметр текущего слайда, т.е тот, который будет показываться
        slides =  document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');


    function showSlides (n) { // эта функция показывает / скрывает слайды

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }
        // сверху написаны две проверки, которые позволяют крутить слайды по кругу вперед или назад


        slides.forEach( (item)=> item.style.display = 'none');

        // for (let i = 0; i < slides.length; i++) {  это просто более старый и громоздкий метод записи стороки выше
        //     slides[i].style.display = 'none';
        // }

        dots.forEach( (item)=> item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');


    }

    showSlides(slideIndex);


    function  plusSlides (n) {      // эта функция переключает слайды, взаимодействуя с параметром slideIndex
       showSlides(slideIndex += n); // slideIndex = slideIndex + n
    }

    function currentSlide (n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
               currentSlide(i) 
            }
            

        }

    });
}

module.exports = slider;
},{}],5:[function(require,module,exports){
function tabs () {
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
}

module.exports = tabs;

},{}],6:[function(require,module,exports){
function timer () {
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
}

module.exports = timer;
},{}],7:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function () {
    "use strict";

    let form = require('./parts/form.js'),
        calculate = require('./parts/calculate.js'),
        modal = require('./parts/modal.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js');

    
    calculate();
    form();
    modal();
    slider();
    tabs();
    timer();
});
},{"./parts/calculate.js":1,"./parts/form.js":2,"./parts/modal.js":3,"./parts/slider.js":4,"./parts/tabs.js":5,"./parts/timer.js":6}]},{},[7]);
