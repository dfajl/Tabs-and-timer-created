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