'use strict';
(function () {
//funkcja generująca unikalne id 
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
};

//kod zacznie się wykonywać po załadowaniu całego drzewa DOM
document.addEventListener('DOMContentLoaded', function() {


//funkcja, która pobiera templatkę HTML, parsuje, renderuje i zwraca gotowy element
  function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
  };
//klasa Column
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.element = generateTemplate('column-template', {name: this.name});
  }



});

})();