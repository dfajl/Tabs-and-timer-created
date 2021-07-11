// require('es6-promise').polyfill(); // для перевода промисов в старый формат. сам babel-loader без этой команды не справится. так мы устанавливали полифилы для промисов вручную. есть вариант подключить их через плагин  npm i babel-plugin-es6-promise --save-dev

require('nodelist-foreach-polyfill'); // полифил для forEach
require('formdata-polyfill'); // полифил для formData

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

// браузерифай заработал только тогда, когда в require('parts/form.js') я прописал следующее: form = require('./parts/form.js')
// webpack работал без этого 