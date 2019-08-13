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

//funkcja umożliwiająca przesuwanie kart
function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true
  }); 
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
    this.element = generateTemplate('column-template', {name: this.name, id: this.id});
    this.element.querySelector('.column').addEventListener('click', function (event) {
      console.log(event.target); 
      if (event.target.classList.contains('btn-delete')) {
        self.removeColumn();
      }
      if (event.target.classList.contains ('add-card')) {
        self.addCard( new Card(prompt("Enter the name of the card")));
      }
    });
  };
  //metody dla klasy Column
  Column.prototype = {
    addCard: function(card) {
      this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function () {
      this.element.parentNode.removeChild(this.element);
    }
  };

  //klasa Card
  function Card(description) {
    var self=this;

    this.id = randomString();
    this.description = description;
    this.element = generateTemplate('card-template', { description: this.description }, 'li');
    this.element.querySelector('.card').addEventListener('click', function (event) {
      event.stopPropagation();

      if(event.target.classList.contains('btn-delete')) {
        self.removeCard();
      }
    });
  };
  //metoda dla klasy Card
  Card.prototype = {
    removeCard: function() {
      this.element.parentNode.removeChild(this.element);
    }
  };

  //obiekt board
  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      console.log(column.id);
      initSortable(column.id); 
    },
    element: document.querySelector('#board .column-container')
  };
  //wrzucanie nowej kolumny do tablicy
  document.querySelector('#board .create-column').addEventListener('click', function() {
    var name = prompt('Enter a column name');
    var column = new Column(name);
    board.addColumn(column);
  });

  //TWORZENIE PODSTAWOWYCH ELEMENTÓW

  //kolumny
  var todoColumn = new Column('To do');
  var doingColumn = new Column ('Doing');
  var doneColumn = new Column ('Done');
  //dodawanie do tablicy
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
  
  //karty
  var card1 = new Card('New task');
  var card2 = new Card('Create Kanban boards');
  //dodawanie do kolumn
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);


});
})();