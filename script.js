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
    constructor(title, cards = {}) {
        // this.id = id;
        this.title = title;
    }
}


class Card {
    constructor(id, title, column, desc = null, comments = null, date = "") {
        this.id = id;
        this.title = title;
        this.column = column;
        this.description = description;
        this.comments = comments;
    }
}


const removeItem = function () {

}


const createListDom = function (title) {
    const divToDoList = document.createElement('div');
    divToDoList.setAttribute('data-column-id', 1);
    divToDoList.classList.add('todoList');

    divToDoList.innerHTML = `
        <h2>
        ${title}
        <button class="dots-btn">
            <span class="dots-btn__dot"></span>
            <span class="dots-btn__dot"></span>
            <span class="dots-btn__dot"></span>
        </button>
        </h2>
        <div class="todoList__body">
            <div class="todoList__cards"></div>
            <div class="enter-title-block">
                <textarea placeholder="Enter a title for the card" class="textarea-title"></textarea>
                <div class="enter-title-block__buttons">
                    <button class="btn-dark"">Add a card</button>
                    <button class="del-btn"><span></span></button>
                </div>
            </div>
            <button class="btn-add" id="to-do-list-button">
                <div class="btn-add__circle-plus"></div>
                <p>Add a card</p>
            </button>
        </div>
    `
    return divToDoList;

}

function createItemDom(id, title, column, desc, comments, date) {
    const divCard = document.createElement('div');
    divCard.setAttribute('data-note-id', id);
    divCard.classList.add('card-preview');
    divCard.innerHTML = `
    <div class="card-preview__top">
        <div class="card-preview__date">${date}</div>
        <button class="dots-btn">
            <span class="dots-btn__dot"></span>
            <span class="dots-btn__dot"></span>
            <span class="dots-btn__dot"></span>
        </button>
    </div>
    <h3 class="card-preview__title">${title}</h3>
    <div class="card-preview__count-comments">3 comments</div>
    `
    return divCard;

}



const refreshLocal = function () {
    let columns = listsArr;
    // let cards = cardsArr;
    localStorage.removeItem('todoContainer');
    localStorage.setItem('todoContainer', JSON.stringify(columns));
}

function clearCreateWindow() {
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

button.addEventListener('click', showInput);

const toggleSaveBtn = (e) => {
    value = e.target.value;
    if (value) {
        enterBoardBtnSave.style.display = 'block';
    } else {
        enterBoardBtnSave.style.display = 'none';
    }
}

boardTextareaTitle.addEventListener('input', toggleSaveBtn);

// const hideInput = () => {

// }


const addList = function () {
    const newList = new List();
    newList.title = boardTextareaTitle.value
    listsArr.push(newList);
    //add to the local storage
    refreshLocal();
    //change the dom
    let listItem = createListDom(boardTextareaTitle.value);
    todoContainer.appendChild(listItem);
    boardTextareaTitle.value = '';



    // newList.id = uniqueID;



    // button.addEventListener('click', () => {
    //     boardEnterTitle.style.display = 'flex';
    //     button.style.display = 'none';
    //     enterBoardBtnSave.style.display = 'none';

    //     boardTextareaTitle.addEventListener('input', (e) => {
    //         value = e.target.value;
    //         if (value) {
    //             enterBoardBtnSave.style.display = 'block';
    //         } else {
    //             enterBoardBtnSave.style.display = 'none';
    //         }
    //     })

    // });

    // enterBoardBtnExit.addEventListener('click', clearCreateWindow)

    // enterBoardBtnSave.addEventListener('click', () => {
    //     if (boardTextareaTitle.value.trim() != "") {
    //         newList.title = boardTextareaTitle.value;
    //         const item = createListDom(newList.title);
    //         todoContainer.appendChild(item);
    //         boardTextareaTitle.value = "";
    //     }
    //     console.log(newList, listsArr);
    //     listsArr.push(newList);
    //     refreshLocal();
    //     boardEnterTitle.style.display = 'none'

    //     clearCreateWindow();

    // });

}

enterBoardBtnSave.addEventListener('click', addList)

function clearList() {
    listsArr = [];
    localStorage.removeItem('todoContainer');
    todoContainer.innerHTML = "";
}

// function clearCard () {
//     cardsArr = [];
//     localStorage.removeItem('');
// }


console.log(listsArr);
window.onload = function () {

    const list = localStorage.getItem('todoContainer');
    if (list != null) {
        columns = JSON.parse(list);
        listsArr = columns;
        for (let i = 0; i < listsArr.length; i++) {
            // let id = listsArr[i].id;
            let title = listsArr[i].title;
            let item = createListDom(title)
            todoContainer.appendChild(item);
        }
    }

}


