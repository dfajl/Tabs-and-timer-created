function modal () {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btntabs = document.querySelectorAll('.description-btn'); //для кнопки в табах


    btntabs.forEach ( (item)=> {

        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
    }); 
    // внимание: метод querySelectorAll позволяет работать с forEach

    // for (let i = 0; i < btntabs.length; i++) {

    //     btntabs[i].addEventListener('click', function() {
    //         overlay.style.display = 'block';
    //         document.body.style.overflow = 'hidden';
    //     });
    // } 
    // это второй вариант использования цикла для коллекции description-btn. с коллекцией  document.getElementsByClassName('description-btn') он тоже работает

    
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