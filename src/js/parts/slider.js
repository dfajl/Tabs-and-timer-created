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


    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    function currentSlide (n) {
        showSlides(slideIndex = n);
    }


    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
               currentSlide(i); 
            }
        }
    });

    
}

module.exports = slider;