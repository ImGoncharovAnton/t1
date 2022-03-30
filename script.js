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


const removeItem = function () {

}


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
    // const divCardsBody = document.createElement('div');
    // divCardsBody.classList.add('todoList__cards');
    // const divInputBlock = document.createElement('div');
    // divInputBlock.classList.add('enter-title-block');
    // const textareaInputBlock = document.createElement('textarea');
    // textareaInputBlock.classList.add('textarea-title');
    // textareaInputBlock.placeholder = "Enter a title for the card...";
    // const divBtnsInputBlock = document.createElement('div');
    // divBtnsInputBlock.classList.add('enter-title-block__buttons');
    // const btnAddInputBlock = document.createElement('button');
    // btnAddInputBlock.classList.add('btn-dark');
    // btnAddInputBlock.textContent = "Add a card";
    // const btnDelInputBlock = document.createElement('button');
    // btnDelInputBlock.classList.add('del-btn');
    // btnDelInputBlock.innerHTML = '<span></span>';
    const btnAddMain = document.createElement('button');
    btnAddMain.id = 'cardBtn';
    btnAddMain.classList.add('btn-add');
    btnAddMain.innerHTML = `
        <div class="btn-add__circle-plus"></div>
        <p>Add a card</p>
    `;

    divList.append(headingListTitle);
    headingListTitle.append(listBtnDots);
    divList.append(divListBody);
    // divListBody.append(divCardsBody);
    // divListBody.append(divInputBlock);
    // divInputBlock.append(textareaInputBlock);
    // divInputBlock.append(divBtnsInputBlock)
    // divBtnsInputBlock.append(btnAddInputBlock);
    // divBtnsInputBlock.append(btnDelInputBlock);
    divListBody.append(btnAddMain);

    return divList;

}

function createCardDom(id, title, column, date, desc, comments) {
    const divCardContainer = document.createElement('div');
    divCardContainer.classList.add('todoList__cards')
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
    const headingCardTitle = document.createElement('h3');
    headingCardTitle.classList.add('card-preview__title');
    headingCardTitle.textContent = title;
    const divCardComments = document.createElement('div');
    divCardComments.classList.add('card-preview__count-comments');
    divCardComments.innerText = '3 comments';

    divCardContainer.append(divCard);
    divCard.append(divCardTop);
    divCardTop.append(divCardDate);
    divCardTop.append(cardBtnDots);
    divCard.append(headingCardTitle);
    divCard.append(divCardComments);

    return divCardContainer;

}

const refreshLocal = () => {
    let columns = listsArr;
    let cards = cardsArr;
    localStorage.removeItem('todoContainer');
    localStorage.removeItem('todoCards');
    localStorage.setItem('todoContainer', JSON.stringify(columns));
    localStorage.setItem('todoCards', JSON.stringify(cards));
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

const clearList = () => {
    listsArr = [];
    localStorage.removeItem('todoContainer');
    todoContainer.innerHTML = "";
}

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

const addCard = () => {
    const main = document.querySelector('.todoContainer');

    const f1 = (e) => {
        const elTarget = e.target;
        const column = e.target.closest('[data-column-id]')
        const idColumn = e.target.closest('[data-column-id]').getAttribute('data-column-id');
        const bodyTarget = e.target.classList.contains('todoList__body');
        console.log(bodyTarget);

        if (elTarget.classList.contains('btn-add')) {
            elTarget.style.display = 'none';
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
            elTarget.before(divInputBlock)
            const addCardF = () => {
                const newCard = new Card();
                newCard.id = new Date().getTime();
                newCard.title = textareaInputBlock.value;
                newCard.column = idColumn;
                newCard.date = new Date().toLocaleTimeString("en");
                cardsArr.push(newCard)
                refreshLocal();
                const item = createCardDom(newCard.id, newCard.title, newCard.column, newCard.date);
                elTarget.before(item);
                console.log(bodyTarget);
                textareaInputBlock.value = "";
                divInputBlock.style.display = 'none';
                elTarget.style.display = 'flex';
            }
            divBtnsInputBlock.addEventListener('click', addCardF)

        }
    }
    main.addEventListener('click', f1)
}

addCard()


// function clearCard () {
//     cardsArr = [];
//     localStorage.removeItem('');
// }




// window.addEventListener('DOMContentLoaded', () => {
//     const list = localStorage.getItem('todoContainer');
//     if (list != null) {
//         columns = JSON.parse(list);

//         listsArr = columns;
//         console.log(listsArr);
//         for (let i = 0; i < listsArr.length; i++) {
//             let id = listsArr[i].id;
//             let title = listsArr[i].title;
//             let item = createListDom(id, title)
//             todoContainer.appendChild(item);
//         }
//     }
// })
window.onload = () => {
    const list = localStorage.getItem('todoContainer');
    if (list != null) {
        columns = JSON.parse(list);

        listsArr = columns;
        console.log(listsArr);
        for (let i = 0; i < listsArr.length; i++) {
            let id = listsArr[i].id;
            let title = listsArr[i].title;
            let item = createListDom(id, title)
            todoContainer.appendChild(item);
        }
    }
}

button.addEventListener('click', showInput);
boardTextareaTitle.addEventListener('input', toggleSaveBtn);
enterBoardBtnExit.addEventListener('click', clearCreateWindow)
enterBoardBtnSave.addEventListener('click', addList)