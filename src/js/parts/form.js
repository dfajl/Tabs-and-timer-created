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
                        // resolve();
                        statusMessage.innerHTML = message.loading;
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
            // .then ( ()=> {statusMessage.innerHTML = message.loading;
            //                 console.log('промис сработал первый раз')
            //             })

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