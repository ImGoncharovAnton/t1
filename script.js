let root = document.getElementById("root");
let listsArr = [];
let cardsArr = [];

//-------------main------------

const todoContainer = document.createElement("div");
const containerNewBoard = document.createElement('div');
const boardEnterTitle = document.createElement('div');
const boardTextareaTitle = document.createElement('textarea');
const boardEnterBlockBtns = document.createElement('div');
const enterBoardBtnSave = document.createElement('button');
const enterBoardBtnExit = document.createElement('button');

boardTextareaTitle.placeholder = 'Enter a title list';
enterBoardBtnSave.innerText = 'Add list';

todoContainer.classList.add('todoContainer');
containerNewBoard.classList.add('create-board-container');
boardEnterTitle.classList.add('enter-title-block');
boardTextareaTitle.classList.add('textarea-title');
boardEnterBlockBtns.classList.add('enter-title-block__buttons');
enterBoardBtnSave.classList.add('btn-dark');
enterBoardBtnExit.classList.add('del-btn');


const button = document.createElement('button');
const pButton = document.createElement('p');
const buttonCircleAppend = document.createElement('div');


button.classList.add("btn-add");
buttonCircleAppend.classList.add("btn-add__circle-plus");

pButton.innerText = 'Add a list';
button.id = "to-do-list-button";


root.append(todoContainer);
root.append(containerNewBoard);
containerNewBoard.append(boardEnterTitle);
boardEnterTitle.append(boardTextareaTitle);
boardEnterTitle.append(boardEnterBlockBtns);
boardEnterBlockBtns.append(enterBoardBtnSave);
boardEnterBlockBtns.append(enterBoardBtnExit);
enterBoardBtnExit.insertAdjacentHTML('afterbegin', '<span></span>');
containerNewBoard.append(button);
button.append(buttonCircleAppend);
button.append(pButton);


// ------------------------------------------------------

let uniqueID = new Date().getTime();


class List {
    constructor(id, title, cardsArr = []) {
        this.id = id;
        this.title = title;
        this.cardsArr = cardsArr;
    }
}


class Card {
    constructor(id, title, column, date = "", description = null, comments = null) {
        this.id = id;
        this.title = title;
        this.column = column;
        this.date = date;
        this.description = description;
        this.comments = comments;
        this.domElement
    }
}

// const removeItem = function () {
//     var parent = this.parentElement.parentElement;
//     parent.removeChild(this.parentElement);

//     var data = this.parentElement.firstChild.innerText;
//     for (var i = 0; i < listArray.length; i++) {

//         if (listArray[i].content == data) {
//             listArray.splice(i, 1);
//             refreshLocal();
//             break;
//         }
//     }

// Функция для обновления данных, например, добавление описания, комментов, или изменение заголовка карточки
// -^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^
// var changeListArray = function(data,status){

//     for(var i=0; i < listArray.length; i++){

//         if(listArray[i].content == data){
//             listArray[i].status = status;
//             refreshLocal();
//             break;
//         }
//     }
// }






const createListDom = function (id, title) {
    const divList = document.createElement('div');
    divList.setAttribute('data-column-id', id);
    divList.classList.add('todoList');
    const headingListTitle = document.createElement('h2');
    headingListTitle.textContent = title;
    const listBtnDots = document.createElement('button');
    listBtnDots.classList.add('dots-btn');
    listBtnDots.innerHTML = `
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
    `;
    const divListBody = document.createElement('div');
    divListBody.classList.add('todoList__body');
    const btnAddMain = document.createElement('button');
    btnAddMain.id = 'cardBtn';
    btnAddMain.classList.add('btn-add');
    btnAddMain.innerHTML = `
        <div class="btn-add__circle-plus"></div>
        <p>Add a card</p>
    `;
    // add listener for create new cards
    btnAddMain.addEventListener('click', addToggleCard);

    divList.append(headingListTitle);
    headingListTitle.append(listBtnDots);
    divList.append(divListBody);
    divListBody.append(btnAddMain);


    return divList;

}

function createCardDom(id, title, column, date, desc, comments) {
    const divCard = document.createElement('div');
    divCard.setAttribute('data-note-id', id);
    divCard.classList.add('card-preview');
    const divCardTop = document.createElement('div');
    divCardTop.classList.add('card-preview__top');
    const divCardDate = document.createElement('div');
    divCardDate.classList.add('card-preview__date');
    divCardDate.textContent = date;
    const cardBtnDots = document.createElement('button');
    cardBtnDots.classList.add('dots-btn');
    cardBtnDots.innerHTML = `
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
    `;
    cardBtnDots.addEventListener('click', showModalCard)
    const headingCardTitle = document.createElement('h3');
    headingCardTitle.classList.add('card-preview__title');
    headingCardTitle.textContent = title;
    const divCardComments = document.createElement('div');
    divCardComments.classList.add('card-preview__count-comments');
    divCardComments.innerText = '3 comments';

    divCard.append(divCardTop);
    divCardTop.append(divCardDate);
    divCardTop.append(cardBtnDots);
    divCard.append(headingCardTitle);
    divCard.append(divCardComments);

    return divCard;

}

function showModalCard() {
    const parent = this.parentElement;

    const modalState = document.createElement('div');
    modalState.classList.add('modal-state');
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('modal-state__btn');
    btnEdit.textContent = 'Edit';
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('modal-state__btn');
    btnDelete.textContent = 'Delete';


    btnEdit.addEventListener('click', fullModalEdit);
    btnDelete.addEventListener('click', removeCard);

    modalState.append(btnEdit);
    modalState.append(btnDelete);
    parent.append(modalState)
}

function fullModalEdit() {
    ///
}

// -^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^^_^_^_^_^_^_^_^_^__^^_^_^

// textarea при value !== "" скрывать кнопку показа add block


function removeCard() {



    // Обращаемся к блоку-контейнеру общему для карточек, находим ребенка на уровень ниже и ремувим его
    // Вытаскиваем предварительно айдишник ребенка, запускаем цикл перебора массива карточек, где сравниваем айдишник в массиве, и нынешний, и слайсом по индексу удаляем элемент
    // Обновляем локал сторадж, прерываем цикл.

    const context = this;
    const parent =  context.closest('.todoList__body')
    const cardThis = context.closest('.card-preview');
    const cardThisId = cardThis.getAttribute('data-note-id');
    parent.removeChild(cardThis)

    

    console.log(parent);
    console.log(cardThis);
    console.log(cardThisId);
    

}

const refreshLocal = () => {
    let columns = listsArr;
    let items = cardsArr;
    localStorage.removeItem('todoContainer');
    localStorage.removeItem('todoCards');
    localStorage.setItem('todoContainer', JSON.stringify(columns));
    localStorage.setItem('todoCards', JSON.stringify(items));
}

const clearCreateWindow = () => {
    boardTextareaTitle.value = '';
    value = '';
    boardEnterTitle.style.display = 'none';
    button.style.display = 'flex';
}

const showInput = () => {
    boardEnterTitle.style.display = 'flex';
    button.style.display = 'none';
    enterBoardBtnSave.style.display = 'none';
}

const toggleSaveBtn = (e) => {
    value = e.target.value;
    if (value) {
        enterBoardBtnSave.style.display = 'block';
    } else {
        enterBoardBtnSave.style.display = 'none';
    }
}

// -^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^

// Для полной очистки

const clearAll = () => {
    listsArr = [];
    cardsArr = [];
    localStorage.removeItem('todoContainer');
    localStorage.removeItem('todoCards')
    todoContainer.innerHTML = "";
}

// const clearList = () => {
//     listsArr = [];
//     localStorage.removeItem('todoContainer');
//     todoContainer.innerHTML = "";
// }

// function clearCard () {
//     cardsArr = [];
//     localStorage.removeItem('');
// }

const addList = () => {
    const newList = new List();
    newList.id = new Date().getTime();
    newList.title = boardTextareaTitle.value
    console.log(newList);
    listsArr.push(newList);
    //add to the local storage
    refreshLocal();
    //change the dom
    let listItem = createListDom(newList.id, boardTextareaTitle.value);
    todoContainer.appendChild(listItem);
    boardTextareaTitle.value = '';
    boardEnterTitle.style.display = 'none'
    clearCreateWindow();
}


function addToggleCard() {
    // Вешаем обработчика на кнопку в листе созданном, и вызываем эту функцию
    const btnToggle = this;
    let parentDiv = this.parentElement.parentElement;
    let columnId = parentDiv.getAttribute('data-column-id');
    // btnToggle.style.display = 'none';
    const divInputBlock = document.createElement('div');
    divInputBlock.classList.add('enter-title-block');
    divInputBlock.style.display = 'flex';
    const textareaInputBlock = document.createElement('textarea');
    textareaInputBlock.classList.add('textarea-title');
    textareaInputBlock.placeholder = "Enter a title for the card...";
    const divBtnsInputBlock = document.createElement('div');
    divBtnsInputBlock.classList.add('enter-title-block__buttons');
    const btnAddInputBlock = document.createElement('button');
    btnAddInputBlock.classList.add('btn-dark');
    btnAddInputBlock.textContent = "Add a card";
    const btnDelInputBlock = document.createElement('button');
    btnDelInputBlock.classList.add('del-btn');
    btnDelInputBlock.innerHTML = '<span></span>';
    divInputBlock.append(textareaInputBlock);
    divInputBlock.append(divBtnsInputBlock)
    divBtnsInputBlock.append(btnAddInputBlock);
    divBtnsInputBlock.append(btnDelInputBlock);
    btnToggle.before(divInputBlock);

    // add listener for btns
    btnAddInputBlock.addEventListener('click', addCard);
    btnDelInputBlock.addEventListener('click', removeToggleCard);
    console.log('btnToggle', btnToggle);
    console.log('parentDiv', parentDiv);
    console.log('columnId', columnId);

    // blur криво работает пока что 
    // textareaInputBlock.addEventListener('blur', removeToggleCard)

    function addCard() {
        const newCard = new Card();
        newCard.id = new Date().getTime();
        newCard.title = textareaInputBlock.value;
        newCard.column = columnId;
        newCard.date = new Date().toLocaleTimeString("en");
        console.log(newCard);
        //add to the local storage
        cardsArr.push(newCard)
        //change the dom
        refreshLocal();
        const item = createCardDom(newCard.id, newCard.title, newCard.column, newCard.date);
        divInputBlock.before(item);
        removeToggleCard();
    }

    function removeToggleCard() {
        textareaInputBlock.value = "";
        divInputBlock.style.display = 'none';
        btnToggle.style.display = 'flex';
    }
}





// const addCard = () => {
//     const main = document.querySelector('.todoContainer');

//     const f1 = (e) => {
//         const elTarget = e.target;
//         const column = e.target.closest('[data-column-id]');
//         const idColumn = e.target.closest('[data-column-id]').getAttribute('data-column-id');
//         const bodyTarget = e.target.classList.contains('todoList__body');
//         console.log(bodyTarget);

//         if (elTarget.classList.contains('btn-add')) {
//             console.log(elTarget.children);
//             elTarget.style.display = 'none';
//             const divInputBlock = document.createElement('div');
//             divInputBlock.classList.add('enter-title-block');
//             divInputBlock.style.display = 'flex';
//             const textareaInputBlock = document.createElement('textarea');
//             textareaInputBlock.classList.add('textarea-title');
//             textareaInputBlock.placeholder = "Enter a title for the card...";
//             const divBtnsInputBlock = document.createElement('div');
//             divBtnsInputBlock.classList.add('enter-title-block__buttons');
//             const btnAddInputBlock = document.createElement('button');
//             btnAddInputBlock.classList.add('btn-dark');
//             btnAddInputBlock.textContent = "Add a card";
//             const btnDelInputBlock = document.createElement('button');
//             btnDelInputBlock.classList.add('del-btn');
//             btnDelInputBlock.innerHTML = '<span></span>';
//             divInputBlock.append(textareaInputBlock);
//             divInputBlock.append(divBtnsInputBlock)
//             divBtnsInputBlock.append(btnAddInputBlock);
//             divBtnsInputBlock.append(btnDelInputBlock);
//             elTarget.before(divInputBlock);

//             const toggleInputBlock = () => {
//                 textareaInputBlock.value = "";
//                 divInputBlock.style.display = 'none';
//                 elTarget.style.display = 'flex';
//             }

//             const addCardF = () => {
//                 const newCard = new Card();
//                 newCard.id = new Date().getTime();
//                 newCard.title = textareaInputBlock.value;
//                 newCard.column = idColumn;
//                 newCard.date = new Date().toLocaleTimeString("en");
//                 console.log(newCard);
//                 //add to the local storage
//                 cardsArr.push(newCard)
//                 //change the dom
//                 refreshLocal();
//                 const item = createCardDom(newCard.id, newCard.title, newCard.column, newCard.date);
//                 elTarget.before(item);
//                 console.log(bodyTarget);
//                 toggleInputBlock();
//             }

//             btnAddInputBlock.addEventListener('click', addCardF);
//             btnDelInputBlock.addEventListener('click', toggleInputBlock)

//         }
//     }
//     main.addEventListener('click', f1)
// }

window.onload = () => {
    const list = localStorage.getItem('todoContainer');
    const card = localStorage.getItem('todoCards');
    if (list != null) {
        columns = JSON.parse(list);
        listsArr = columns;
        console.log('listsArr', listsArr);
        for (let i = 0; i < listsArr.length; i++) {
            let id = listsArr[i].id;
            let title = listsArr[i].title;
            let listOne = createListDom(id, title)
            todoContainer.appendChild(listOne);
        }
    }
    if (card != null) {
        items = JSON.parse(card);
        cardsArr = items;
        console.log('cardsArr', cardsArr);
        const parentDiv = document.querySelectorAll('.todoList');
        for (let j = 0; j < cardsArr.length; j++) {
            let id = cardsArr[j].id;
            let title = cardsArr[j].title;
            let column = cardsArr[j].column;
            let date = cardsArr[j].date;
            let cardOne = createCardDom(id, title, column, date);
            parentDiv.forEach(el => {
                if (el.getAttribute('data-column-id') === column) {
                    let item = el.children[1].querySelector('.btn-add');
                    item.insertAdjacentElement('beforebegin', cardOne);
                };
            })
        }
    }

}

// add event buttons for create new lists

button.addEventListener('click', showInput);
boardTextareaTitle.addEventListener('input', toggleSaveBtn);
enterBoardBtnExit.addEventListener('click', clearCreateWindow)
enterBoardBtnSave.addEventListener('click', addList)
// addCard()