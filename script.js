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

    setTitle(value) {
        this.title = value;
    }

    addDesc(desc) {
        this.description = desc;
    }

    addComment(comment) {
        if (!this.comments) {
            this.comments = {};
        }
        this.comments[comment.id] = comment;
    }

    removeComment(id) {
        delete this.comments[id];
        if (Object.keys(this.comments).length === 0) {
            this.comments = null;
        }

    }
}


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

    cardBtnDots.addEventListener('click', showModalCardState)
    divCard.addEventListener('click', createModalDom)

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

function showModalCardState() {
    const parent = this.parentElement;

    const modalState = document.createElement('div');
    modalState.classList.add('modal-state');
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('modal-state__btn');
    btnEdit.textContent = 'Edit';
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('modal-state__btn');
    btnDelete.textContent = 'Delete';

// -^_^_^_^_-^-^-^-^_^__^_^_^_^_^_^_^_^_^_^_^_^_^___^_^_^_^^__^_^_^6__^-
    btnEdit.addEventListener('click', fullModalEdit);
    btnDelete.addEventListener('click', removeCard);

    modalState.append(btnEdit);
    modalState.append(btnDelete);
    parent.append(modalState)
}

// _^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_^_
// Вешаем клик на всю карточку, либо на титульник, либо на Edit, надо думать, ибо еще drag&drop реализовывать

// this.card.addEventListener('click', (e) => {
//     if (e.target != this.deleteButton) {
//         this.showMenu.call(this);
//     }
// });

function createModalDom() {
    const cardDiv = this;
    const parent = cardDiv.closest('.todoList');
    const parentID = parseInt(parent.getAttribute('data-column-id'));
    const cardID = parseInt(cardDiv.getAttribute('data-note-id'));
    const filterCardsArr = cardsArr.filter(item => item.id === cardID);
    const filterListsArr = listsArr.filter(item => item.id === parentID);
    console.log('filterListsArr', filterListsArr);
    console.log('filterCardsArr' ,filterCardsArr);
    console.log(filterCardsArr[0].title);
    console.log(filterCardsArr[0].date);
    const modalInner = document.createElement('div'),
        modalContainer = document.createElement('div'),
        modalBlockExit = document.createElement('div'),
        modalBtnExit = document.createElement('button'),
        modalTitle = document.createElement('h2'),
        modalLocation = document.createElement('div'),
        modalContent = document.createElement('div'),
        modalContentRow = document.createElement('div'),
        modalContentRow1 = document.createElement('div'),
        modalContentRow2 = document.createElement('div'),
        modalDateBlock = document.createElement('div'),
        modalDateHeading = document.createElement('h3'),
        modalDateValue = document.createElement('p'),
        modalActionBlock = document.createElement('div'),
        modalActionHeading = document.createElement('h3'),
        modalActionArchive = document.createElement('button'),
        modalDescrBlock = document.createElement('div'),
        modalDescrHeading = document.createElement('h3'),
        modalDescrInput = document.createElement('textarea'),
        modalDescrToggleBtns = document.createElement('div'),
        modalDescrBtnSave = document.createElement('button'),
        modalDescrBtnExit = document.createElement('button'),
        modalCommentsInner = document.createElement('div'),
        modalCommentsInnerHeading = document.createElement('h3'),
        modalCommentsInput = document.createElement('textarea'),
        modalCommentsToggleBtns = document.createElement('div'),
        modalCommentsBtnSave = document.createElement('button'),
        modalCommentsBtnExit = document.createElement('button');

    // modal once block 
    const modalCommentBlock = document.createElement('div'),
        modalCommentDate = document.createElement('p'),
        modalCommentText = document.createElement('p'),
        modalCommentEditBlock = document.createElement('div'),
        modalCommentEditBtn = document.createElement('button'),
        modalCommentDelBtn = document.createElement('button');



    modalInner.classList.add('modal-card-full');
    modalContainer.classList.add('modal-card-full__container');
    modalBlockExit.classList.add('modal-card-full__exit');
    modalBtnExit.classList.add('del-btn');
    modalTitle.classList.add('modal-card-full__title');
    modalLocation.classList.add('modal-card-full__location');
    modalContent.classList.add('modal-card-full__content');
    modalContentRow.classList.add('modal-card-full__row');
    modalContentRow1.classList.add('modal-card-full__row');
    modalContentRow2.classList.add('modal-card-full__row');
    modalDateBlock.classList.add('modal-card-full__date-block', 'date-block');
    modalDateHeading.classList.add('block__heading');
    modalDateValue.classList.add('date-block__date');
    modalActionBlock.classList.add('modal-card-full__actions-block', 'actions-block');
    modalActionHeading.classList.add('block__heading');
    modalActionArchive.classList.add('btn-gray');
    modalDescrBlock.classList.add('modal-card-full__descr', 'descr-modal-card')
    modalDescrHeading.classList.add('block__heading');
    modalDescrInput.classList.add('modal-card__textarea');
    modalDescrToggleBtns.classList.add('modal-card-toggle-btns');
    modalDescrBtnSave.classList.add('btn-dark');
    modalDescrBtnExit.classList.add('del-btn');
    modalCommentsInner.classList.add('modal-card-full__comment', 'comment-modal-card');
    modalCommentsInnerHeading.classList.add('block__heading');
    modalCommentsInput.classList.add('modal-card__textarea');
    modalCommentsToggleBtns.classList.add('modal-card-toggle-btns');
    modalCommentsBtnSave.classList.add('btn-dark');
    modalCommentsBtnExit.classList.add('del-btn');
    // comment once block
    modalCommentBlock.classList.add('comment');
    modalCommentDate.classList.add('comment-date');
    modalCommentText.classList.add('comment-text');
    modalCommentEditBlock.classList.add('comment-edit-block');
    modalCommentEditBtn.classList.add('btn-edit-block');
    modalCommentDelBtn.classList.add('btn-edit-block');


    modalBtnExit.innerHTML = '<span></span>';
    modalTitle.textContent = filterCardsArr[0].title;
    modalLocation.innerHTML = `in list <span>${filterListsArr[0].title}</span>`;
    modalDateHeading.textContent = 'Created at';
    modalDateValue.textContent = filterCardsArr[0].date;
    modalActionHeading.textContent = 'Actions';
    modalActionArchive.textContent = 'Archive card';
    modalDescrHeading.textContent = 'Description';
    modalDescrInput.placeholder = 'Add a more detailed description';
    // modalDescrInput.textContent = 'Test description';
    modalDescrToggleBtns.style.display = 'none';
    modalDescrBtnSave.textContent = 'Save';
    modalDescrBtnExit.innerHTML = '<span></span>';
    modalCommentsInnerHeading.textContent = 'Activity';
    modalCommentsInput.placeholder = 'Write a comment';
    modalCommentsBtnSave.textContent = 'Save';
    modalCommentsBtnExit.innerHTML = '<span></span>';
    


    // ^_^_^_^_^_^_^_^_^__^_^_^_^_^_^_^_^_^_^__^_^_^_^_^_
    // Модалка дискрипшн и комменты пушим в массив исходный и сохраняем в локал сторадж


    modalDescrBtnSave.addEventListener('click', descrSave)
    modalDescrInput.addEventListener('input', toggleBtnsDescr)

    // modal once block
    modalCommentDate.textContent = 'Apr 1, 10:00 PM';
    modalCommentText.textContent = 'Test comment 1';
    modalCommentEditBtn.textContent = 'Edit';
    modalCommentDelBtn.textContent = 'Delete';

    modalInner.append(modalContainer);
    modalContainer.append(modalBlockExit);
    modalBlockExit.append(modalBtnExit);
    modalContainer.append(modalTitle);
    modalContainer.append(modalLocation);
    modalContainer.append(modalContent);
    modalContent.append(modalContentRow);
    modalContentRow.append(modalDateBlock);
    modalDateBlock.append(modalDateHeading);
    modalDateBlock.append(modalDateValue);
    modalContentRow.append(modalActionBlock);
    modalActionBlock.append(modalActionHeading);
    modalActionBlock.append(modalActionArchive);
    modalContent.append(modalContentRow1);
    modalContentRow1.append(modalDescrBlock);
    modalDescrBlock.append(modalDescrHeading);
    modalDescrBlock.append(modalDescrInput);
    modalDescrBlock.append(modalDescrToggleBtns);
    modalDescrToggleBtns.append(modalDescrBtnSave);
    modalDescrToggleBtns.append(modalDescrBtnExit);
    modalContent.append(modalContentRow2);
    modalContentRow2.append(modalCommentsInner);
    modalCommentsInner.append(modalCommentsInnerHeading);



    // comment once block
    modalCommentsInner.append(modalCommentBlock);
    modalCommentBlock.append(modalCommentDate);
    modalCommentBlock.append(modalCommentText);
    modalCommentBlock.append(modalCommentEditBlock);
    modalCommentEditBlock.append(modalCommentEditBtn);
    modalCommentEditBlock.append(modalCommentDelBtn);

    modalCommentsInner.append(modalCommentsInput);
    modalCommentsInner.append(modalCommentsToggleBtns);
    modalCommentsToggleBtns.append(modalCommentsBtnSave);
    modalCommentsToggleBtns.append(modalCommentsBtnExit);
    root.append(modalInner);


    function toggleBtnsDescr() {
        const value = modalDescrInput.value;
        console.log(value);
        if (value) {
            modalDescrToggleBtns.style.display = 'flex';
        } else {
            modalDescrToggleBtns.style.display = 'none';
        }
    }

    function descrSave() {
        const text = document.createElement('p');
        text.textContent = modalDescrInput.value;
        text.addEventListener('click', changeDescr)

        modalDescrHeading.after(text);
        modalDescrInput.style.display = 'none';
        modalDescrToggleBtns.style.display = 'none';
    }

    function changeDescr() {
        const paragraph = this;
        const valueParagraph = paragraph.textContent;
// ^_^_^__^_^_^_^_^_^_^_^_^^_^_^_^_^_^_^_
        // Получаем значение параграфа, скрываем его, открываем инпут, в который текстконтентом закидываем валью


        console.log('valueParagraph', paragraph); 
        console.log('valueParagraph', valueParagraph); 
    }

}



// 
// Тест визуала модалки
// 

// const testButton = document.createElement('button');
// testButton.textContent = 'Button';
// testButton.className = 'btn-gray';
// testButton.addEventListener('click', createModalDom)
// containerNewBoard.append(testButton);


// 

function fullModalEdit() {
    ///
}

function removeCard() {
    const context = this;
    const parent = context.closest('.todoList__body')
    const cardThis = context.closest('.card-preview');
    const cardThisId = parseInt(cardThis.getAttribute('data-note-id'));
    parent.removeChild(cardThis)

    for (let i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].id === cardThisId) {
            cardsArr.splice(i, 1);
            refreshLocal();
            break;
        }
    }
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

function refreshLocal() {
    let columns = listsArr;
    let items = cardsArr;
    localStorage.removeItem('todoContainer');
    localStorage.removeItem('todoCards');
    localStorage.setItem('todoContainer', JSON.stringify(columns));
    localStorage.setItem('todoCards', JSON.stringify(items));
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


function addToggleCard() {
    // Вешаем обработчика на кнопку в листе созданном, и вызываем эту функцию
    const btnToggle = this;
    const parentDiv = this.parentElement.parentElement;
    const columnId = parentDiv.getAttribute('data-column-id');
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
    btnAddInputBlock.style.display = 'none';
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
    textareaInputBlock.addEventListener('input', btnAddInput);

    function btnAddInput(e) {
        value = e.target.value;
        if (value) {
            btnAddInputBlock.style.display = 'block';
        } else {
            btnAddInputBlock.style.display = 'none';
        }
    }

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