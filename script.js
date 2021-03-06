let root = document.getElementById("root");
let listsArr = [];
let cardsArr = [];
let commentsArr = [];

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
    constructor(id, title, column, date = "", description = null, comments = []) {
        this.id = id;
        this.title = title;
        this.column = column;
        this.date = date;
        this.description = description;
        this.comments = comments;
        this.domElement
    }
}
class Comment {
    constructor(id, date, title) {
        this.id = id;
        this.date = date;
        this.title = title;
    }
}

const createListDom = function (id, title) {
    const divList = document.createElement('div');
    const headingTopBlock = document.createElement('div');
    const headingListTitle = document.createElement('h2');
    const listBtnDots = document.createElement('button');
    const divListBody = document.createElement('div');
    const btnAddMain = document.createElement('button');

    divList.classList.add('todoList');
    headingTopBlock.classList.add('todoList__top');
    listBtnDots.classList.add('dots-btn');
    divListBody.classList.add('todoList__body');
    btnAddMain.classList.add('btn-add');

    divList.setAttribute('data-column-id', id);
    headingListTitle.textContent = title;
    listBtnDots.innerHTML = `
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
    `;
    btnAddMain.id = 'cardBtn';
    btnAddMain.innerHTML = `
        <div class="btn-add__circle-plus"></div>
        <p>Add a card</p>
    `;

    listBtnDots.addEventListener('click', showModalListState)
    headingListTitle.addEventListener('dblclick', editTitleList)
    btnAddMain.addEventListener('click', addToggleCard);
    // drag and drop 
    divList.addEventListener('dragover', dragOver);
    divList.addEventListener('dragend', dragEnd);

    divList.append(headingTopBlock);
    headingTopBlock.append(headingListTitle);
    headingTopBlock.append(listBtnDots);
    divList.append(divListBody);
    divList.append(btnAddMain);
    return divList;

}

function showModalListState() {
    const parent = this.parentElement;
    const modalState = document.createElement('div');
    const btnNewCard = document.createElement('button');
    const btnDelete = document.createElement('button');
    const btnClearList = document.createElement('button');
    const btnCopyList = document.createElement('button');

    modalState.classList.add('modal-state');
    btnNewCard.classList.add('modal-state__btn');
    btnDelete.classList.add('modal-state__btn');
    btnClearList.classList.add('modal-state__btn');
    btnCopyList.classList.add('modal-state__btn');

    btnNewCard.textContent = 'New card';
    btnDelete.textContent = 'Delete list';
    btnClearList.textContent = 'Clear list';
    btnCopyList.textContent = 'Copy list';

    btnNewCard.addEventListener('click', addNewCardFromModal)
    btnDelete.addEventListener('click', removeList)
    btnClearList.addEventListener('click', clearCardsThisList)
    btnCopyList.addEventListener('click', copyListTo)

    modalState.append(btnNewCard);
    modalState.append(btnDelete);
    modalState.append(btnClearList);
    modalState.append(btnCopyList);
    parent.append(modalState)
    modalState.addEventListener('mouseleave', removeModalState)
    function removeModalState() {
        modalState.remove()
    }
}

function addNewCardFromModal() {
    const parentDiv = this.closest('.todoList');
    const btnCreateCard = parentDiv.lastChild;
    btnCreateCard.addEventListener('focus', addToggleCard)
    btnCreateCard.focus();
}

function clearCardsThisList() {
    const context = this;
    const parent = context.closest('.todoList');
    const parentID = parseInt(parent.getAttribute('data-column-id'));
    const cardsContainer = parent.children[1];
    cardsContainer.innerHTML = '';

    for (let i = cardsArr.length; i--;) {
        if (cardsArr[i].column == parentID) {
            cardsArr.splice(i, 1);
            refreshLocal();
        }
    }
}

function removeList() {
    const thisItem = this;
    const parent = thisItem.closest('.todoContainer');
    const thisList = thisItem.closest('.todoList');
    const thisListId = parseInt(thisList.getAttribute('data-column-id'))
    parent.removeChild(thisList);
    for (let i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].column == thisListId) {
            if (cardsArr[i]) {
                cardsArr.splice(i, 999);
                refreshLocal();
            }
        }
    }
    for (let i = 0; i < listsArr.length; i++) {
        if (listsArr[i].id === thisListId) {
            listsArr.splice(i, 1);
            refreshLocal();
            break;
        }
    }

}

function copyListTo() {
    const thisItem = this;
    const listTopHeader = thisItem.closest('.todoList__top');
    const listDiv = thisItem.closest('.todoList');
    const cardsContainerOld = listDiv.children[1];
    const listID = parseInt(listDiv.getAttribute('data-column-id'));

    const copyListInnerWindow = document.createElement('div');
    const copyListCreateBlock = document.createElement('div');
    const copyListBLockBtnExit = document.createElement('button');
    const copyListInput = document.createElement('input');
    const copyListBtnSave = document.createElement('button');

    copyListInnerWindow.classList.add('copyListInnerWindow');
    copyListCreateBlock.classList.add('edit-preview');
    copyListBLockBtnExit.classList.add('del-btn');
    copyListInput.classList.add('edit-preview__input');
    copyListBtnSave.classList.add('btn-dark');

    copyListBLockBtnExit.innerHTML = '<span></span>';
    copyListInput.placeholder = 'Enter title new list'
    copyListBtnSave.textContent = 'Save';
    copyListBtnSave.style.display = 'none';

    copyListInput.addEventListener('input', showBtnCopySave)
    copyListBtnSave.addEventListener('click', addCopyList)
    copyListBLockBtnExit.addEventListener('click', removeCopyModal)
    copyListInnerWindow.addEventListener('mouseleave', removeCopyModal)

    copyListInnerWindow.append(copyListCreateBlock);
    copyListCreateBlock.append(copyListBLockBtnExit);
    copyListCreateBlock.append(copyListInput);
    copyListCreateBlock.append(copyListBtnSave);
    listTopHeader.append(copyListInnerWindow);
    copyListInput.focus();

    function removeCopyModal() {
        copyListInnerWindow.remove()
    }
    function showBtnCopySave(e) {
        let value = e.target.value;
        if (value) {
            copyListBtnSave.style.display = 'block';
        } else {
            copyListBtnSave.style.display = 'none';
        }
    }

    function addCopyList() {

        // Create new empty list
        const newList = new List();
        newList.id = new Date().getTime() - 10;
        newList.title = copyListInput.value;
        listsArr.push(newList);
        // add to the local storage
        refreshLocal();
        // change the dom
        let listItem = createListDom(newList.id, copyListInput.value);
        todoContainer.appendChild(listItem);

        let someItemId = new Date().getTime();
        const cardsContainerNew = listItem.children[1];

        const thisArrObjFilter = cardsArr.filter(item => item.column == listID);
        const deepCopy = JSON.parse(JSON.stringify(thisArrObjFilter));
        for (let elem of deepCopy) {
            elem.column = newList.id;
            elem.id = someItemId++;
            cardsArr.push(elem);
            refreshLocal();
        }

        // Draws cards one by one from an array of copied cards
        for (let i = 0; i < deepCopy.length; i++) {
            let id = deepCopy[i].id;
            let title = deepCopy[i].title;
            let column = deepCopy[i].column;
            let date = deepCopy[i].date;
            let description = deepCopy[i].description;
            let comments = deepCopy[i].comments;
            let cardOne = createCardDom(id, title, column, date, description, comments);
            cardsContainerNew.appendChild(cardOne);
        }
        copyListInnerWindow.remove()
    }
}

function editTitleList() {
    const titleList = this;
    titleList.setAttribute('contenteditable', 'true');
    titleList.focus();
    titleList.addEventListener('blur', saveTitleList)
}

function saveTitleList() {
    const editableHeader = this;
    editableHeader.removeAttribute('contenteditable');
    const editableParent = editableHeader.closest('.todoList');
    const editableId = parseInt(editableParent.getAttribute('data-column-id'));
    const thisObj = listsArr.find(item => item.id === editableId);
    thisObj.title = editableHeader.textContent;
    const i = listsArr.findIndex(item => item.id === thisObj.id);
    if (listsArr[i]) {
        listsArr[i] = thisObj
    } else {
        listsArr.push(thisObj)
        listsArr.log('thisObj added to listsArr');
    };
    refreshLocal();
}

function createCardDom(id, title, column, date, desc, comments) {
    const divCard = document.createElement('div'),
        divCardTop = document.createElement('div'),
        divCardDate = document.createElement('div'),
        cardBtnDots = document.createElement('button'),
        headingCardTitle = document.createElement('h3'),
        divCardComments = document.createElement('div');

    divCard.classList.add('card-preview');
    divCardTop.classList.add('card-preview__top');
    divCardDate.classList.add('card-preview__date');
    cardBtnDots.classList.add('dots-btn');
    headingCardTitle.classList.add('card-preview__title');
    divCardComments.classList.add('card-preview__count-comments');

    divCard.setAttribute('data-note-id', id);
    divCard.setAttribute('draggable', 'true');
    divCardDate.textContent = date;
    cardBtnDots.innerHTML = `
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
        <span class="dots-btn__dot"></span>
    `;
    headingCardTitle.textContent = title;

    cardBtnDots.addEventListener('click', showModalCardState)
    divCard.addEventListener('dblclick', createModalDom)
    // drag and drop
    divCard.addEventListener('dragstart', dragStart);

    divCard.append(divCardTop);
    divCardTop.append(divCardDate);
    divCardTop.append(cardBtnDots);
    divCard.append(headingCardTitle);
    if (comments && comments.length > 0) {
        divCardComments.remove()
        divCardComments.innerText = `${comments.length} comments`;
        divCard.append(divCardComments);
        refreshLocal();
    }

    return divCard;

}

function showModalCardState() {
    const parent = this.parentElement;
    const modalState = document.createElement('div');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');

    modalState.classList.add('modal-state');
    btnEdit.classList.add('modal-state__btn');
    btnDelete.classList.add('modal-state__btn');

    btnEdit.textContent = 'Edit';
    btnDelete.textContent = 'Delete';

    btnEdit.addEventListener('click', editTitleCard);
    btnDelete.addEventListener('click', removeCard);

    modalState.append(btnEdit);
    modalState.append(btnDelete);
    parent.append(modalState)
    modalState.addEventListener('mouseleave', removeModalState)
    function removeModalState() {
        modalState.remove()
    }
}

function editTitleCard() {
    const element = this;
    const parentEl = element.closest('.card-preview');
    const titleCardEl = parentEl.children[1];
    titleCardEl.setAttribute('contenteditable', 'true');
    titleCardEl.focus();
    titleCardEl.addEventListener('blur', saveTitleCardPrev);
    element.parentElement.remove();
}

function saveTitleCardPrev() {
    const editableHeader = this;
    editableHeader.removeAttribute('contenteditable');
    const editableParent = this.closest('.card-preview');
    const editableId = parseInt(editableParent.getAttribute('data-note-id'));
    const thisObj = cardsArr.find(item => item.id === editableId);
    thisObj.title = editableHeader.textContent;
    const i = cardsArr.findIndex(item => item.id === thisObj.id);
    if (cardsArr[i]) {
        cardsArr[i] = thisObj
    } else {
        cardsArr.push(thisObj)
    };
    refreshLocal();
}

function createModalDom() {
    // create modal blocks
    const cardDiv = this;
    const parent = cardDiv.closest('.todoList');
    const parentID = parseInt(parent.getAttribute('data-column-id'));
    const cardID = parseInt(cardDiv.getAttribute('data-note-id'));

    const cardArrItem = cardsArr.find(item => item.id === cardID);
    const listArrItem = listsArr.find(item => item.id === parentID);

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
        modalCommentsContentBlock = document.createElement('div'),
        modalCommentsInput = document.createElement('textarea'),
        modalCommentsToggleBtns = document.createElement('div'),
        modalCommentsBtnSave = document.createElement('button'),
        modalCommentsBtnExit = document.createElement('button');

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

    modalBtnExit.innerHTML = '<span></span>';
    modalTitle.textContent = cardArrItem.title;
    modalTitle.setAttribute('data-card-id', cardID);
    modalLocation.innerHTML = `in list <span>${listArrItem.title}</span>`;
    modalDateHeading.textContent = 'Created at';
    modalDateValue.textContent = cardArrItem.date;
    modalActionHeading.textContent = 'Actions';
    modalActionArchive.textContent = 'Archive card';
    modalDescrHeading.textContent = 'Description';
    modalDescrInput.placeholder = 'Add a more detailed description';
    modalDescrInput.textContent = cardArrItem.description ? cardArrItem.description : '';
    modalDescrToggleBtns.style.display = 'none';
    modalDescrBtnSave.textContent = 'Save';
    modalDescrBtnExit.innerHTML = '<span></span>';
    modalCommentsInnerHeading.textContent = 'Activity';
    modalCommentsInput.placeholder = 'Write a comment';
    modalCommentsInput.textContent = '';
    modalCommentsToggleBtns.style.display = 'none';
    modalCommentsBtnSave.textContent = 'Save';
    modalCommentsBtnExit.innerHTML = '<span></span>';

    modalInner.addEventListener('click', closeModalFull)
    modalBtnExit.addEventListener('click', closeModalBtn)
    modalTitle.addEventListener('dblclick', changeTitleModal)
    modalActionArchive.addEventListener('click', removeCardModal)
    modalDescrBtnSave.addEventListener('click', descrSave)
    modalDescrBtnExit.addEventListener('click', descrExit)
    modalDescrInput.addEventListener('input', toggleBtnsDescr)
    modalCommentsInput.addEventListener('input', toggleBtnsComment)
    modalCommentsBtnSave.addEventListener('click', addComments)

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
    modalCommentsInner.append(modalCommentsContentBlock);
    modalCommentsInner.append(modalCommentsInput);
    modalCommentsInner.append(modalCommentsToggleBtns);
    modalCommentsToggleBtns.append(modalCommentsBtnSave);
    modalCommentsToggleBtns.append(modalCommentsBtnExit);
    root.append(modalInner);

    function addComments() {
        const context = this;
        const commentInputValue = modalCommentsInput.value;
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        const newComment = new Comment();
        newComment.id = new Date().getTime();
        newComment.date = new Date().toLocaleString("en", options);
        newComment.title = commentInputValue;
        commentsArr.push(newComment);
        refreshLocal();
        modalCommentsInput.value = '';
        modalCommentsToggleBtns.style.display = 'none';

        let comment = createComment(newComment);
        modalCommentsContentBlock.appendChild(comment);
    }

    commentsArr = cardArrItem.comments
    if (commentsArr.length > 0) {
        const commsArray = commentsArr;
        for (let item of commsArray) {
            let comment = createComment(item)
            modalCommentsContentBlock.appendChild(comment);
        }
    }

    const child = parent.children[1].children
    for (let el of child) {
        if (el.getAttribute('data-note-id') == cardID) {
            const commentsDiv = el.querySelector('.card-preview__count-comments');
            const divCardComments = document.createElement('div');
            divCardComments.classList.add('card-preview__count-comments');
            if (commentsDiv) {
                commentsDiv.remove();
                if (commentsArr.length > 0) {
                    divCardComments.innerText = `${commentsArr.length} comments`;
                    el.append(divCardComments);
                }
            } else {
                if (commentsArr.length > 0) {
                    divCardComments.innerText = `${commentsArr.length} comments`;
                    el.append(divCardComments);
                }
            }
        }
    }


    function toggleBtnsDescr() {
        const value = modalDescrInput.value;
        if (value) {
            modalDescrToggleBtns.style.display = 'flex';
        } else {
            modalDescrToggleBtns.style.display = 'none';
        }
    }

    function toggleBtnsComment() {
        const value = modalCommentsInput.value;
        if (value) {
            modalCommentsToggleBtns.style.display = 'flex';
        } else {
            modalCommentsToggleBtns.style.display = 'none';
        }
    }

    function changeTitleModal() {
        modalTitle.setAttribute('contenteditable', 'true');
        modalTitle.focus();
        modalTitle.addEventListener('blur', saveTitleCardModal)
    }

    function saveTitleCardModal() {
        modalTitle.removeAttribute('contenteditable');
        cardArrItem.title = modalTitle.textContent;
        const i = cardsArr.findIndex(item => item.id === cardArrItem.id);
        if (cardsArr[i]) {
            cardsArr[i] = cardArrItem
        } else {
            cardsArr.push(cardArrItem)
        };
        const someVar = document.querySelectorAll('.todoList');
        someVar.forEach(item => {
            if (item.getAttribute('data-column-id') == parentID) {
                const chield = item.children[1].children
                for (let el of chield) {
                    if (el.getAttribute('data-note-id') == cardID) {
                        el.children[1].textContent = cardArrItem.title
                    }
                }
            };
        })
        refreshLocal();
    }


    function descrSave() {
        const text = document.createElement('p');
        text.textContent = modalDescrInput.value;
        text.addEventListener('click', changeDescr)
        cardArrItem.description = text.textContent;
        // Push my object in cardArr
        const i = cardsArr.findIndex(item => item.id === cardArrItem.id);
        if (cardsArr[i]) {
            cardsArr[i] = cardArrItem
        } else {
            cardsArr.push(cardArrItem)
        };
        refreshLocal();
        modalDescrHeading.after(text);
        modalDescrInput.style.display = 'none';
        modalDescrToggleBtns.style.display = 'none';
    }

    function descrExit() {
        modalDescrInput.value == cardArrItem.description ? cardArrItem.description : '';
        modalDescrToggleBtns.style.display = 'none'
    }

    function changeDescr() {
        const paragraph = this;
        const valueParagraph = paragraph.textContent;
        paragraph.style.display = 'none';
        modalDescrInput.textContent = valueParagraph;
        modalDescrInput.style.display = 'block';
        modalDescrToggleBtns.style.display = 'flex';
    }

    function removeCardModal() {
        cardDiv.remove();
        for (let i = 0; i < cardsArr.length; i++) {
            if (cardsArr[i].id === cardID) {
                cardsArr.splice(i, 1);
                refreshLocal();
                break;
            }
        }
        modalInner.remove()
    }
}

function removeComment() {
    const thisItem = this;
    const parentThis = thisItem.closest('.comment');
    const parentThisId = parseInt(parentThis.getAttribute('data-comment-id'));
    const container = thisItem.closest('.modal-card-full__container');
    const containerId = parseInt(container.children[1].getAttribute('data-card-id'))
    parentThis.remove();
    for (let i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].id === containerId) {
            for (let j = 0; j < cardsArr[i].comments.length > 0; j++) {
                if (cardsArr[i].comments[j].id === parentThisId) {
                    cardsArr[i].comments.splice(j, 1);
                    refreshLocal();
                    break;
                }
            }
        }
    }
}

function createComment(commentarr) {
    const modalCommentBlock = document.createElement('div'),
        modalCommentDate = document.createElement('p'),
        modalCommentText = document.createElement('p'),
        modalCommentEditBlock = document.createElement('div'),
        modalCommentEditBtn = document.createElement('button'),
        modalCommentDelBtn = document.createElement('button');

    modalCommentBlock.classList.add('comment');
    modalCommentDate.classList.add('comment-date');
    modalCommentText.classList.add('comment-text');
    modalCommentEditBlock.classList.add('comment-edit-block');
    modalCommentEditBtn.classList.add('btn-edit-block');
    modalCommentDelBtn.classList.add('btn-edit-block');
    modalCommentBlock.setAttribute('data-comment-id', commentarr.id)
    modalCommentDate.textContent = commentarr.date;
    modalCommentText.textContent = commentarr.title;
    modalCommentEditBtn.textContent = 'Edit';
    modalCommentDelBtn.textContent = 'Delete';
    modalCommentDelBtn.addEventListener('click', removeComment)

    modalCommentBlock.append(modalCommentDate);
    modalCommentBlock.append(modalCommentText);
    modalCommentBlock.append(modalCommentEditBlock);
    modalCommentEditBlock.append(modalCommentEditBtn);
    modalCommentEditBlock.append(modalCommentDelBtn);
    return modalCommentBlock;
}

function closeModalFull(e) {
    const thisItm = this;
    if (e.target.classList.contains("modal-card-full")) {
        refreshLocal();
        thisItm.remove();
    }

}

function closeModalBtn() {
    const thisItem = this;
    const modal = thisItem.closest('.modal-card-full');
    if (thisItem) {
        refreshLocal();
        modal.remove();
    }
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

    boardTextareaTitle.focus();
    boardTextareaTitle.addEventListener('blur', () => {
        if (boardTextareaTitle.value == '') {
            clearCreateWindow();
        }
    })

}

const toggleSaveBtn = (e) => {
    value = e.target.value;
    if (value) {
        enterBoardBtnSave.style.display = 'block';
    } else {
        enterBoardBtnSave.style.display = 'none';
    }
}
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
    const btnToggle = this;
    const parentDiv = this.parentElement;
    const cardsContainer = parentDiv.children[1];
    const columnId = parentDiv.getAttribute('data-column-id');
    btnToggle.style.display = 'none';
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
    textareaInputBlock.focus();
    textareaInputBlock.addEventListener('input', btnAddInput);
    textareaInputBlock.addEventListener('blur', () => {
        if (textareaInputBlock.value == '') {
            removeToggleCard();
        }
    })

    function btnAddInput(e) {
        value = e.target.value;
        if (value) {
            btnAddInputBlock.style.display = 'block';
        } else {
            btnAddInputBlock.style.display = 'none';
        }
    }

    function addCard() {
        const newCard = new Card();
        newCard.id = new Date().getTime();
        newCard.title = textareaInputBlock.value;
        newCard.column = columnId;
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        newCard.date = new Date().toLocaleString("en", options);
        //add to the local storage
        cardsArr.push(newCard)
        //change the dom
        refreshLocal();
        const item = createCardDom(newCard.id, newCard.title, newCard.column, newCard.date);
        cardsContainer.appendChild(item);
        removeToggleCard();
    }

    function removeToggleCard() {
        textareaInputBlock.value = "";
        divInputBlock.style.display = 'none';
        btnToggle.style.display = 'flex';
    }
}

// -------------------------------------Drag and Drop ------------------

let movedCard;
let afterElement;
let movedCardID;
let afterElementID;
let listToID;

function dragStart() {
    movedCard = this;
    movedCard.classList.add('dragging');
}

function dragEnd(e) {
    if (afterElement != undefined) {
        afterElementID = parseInt(afterElement.getAttribute('data-note-id'));
    } else {
        afterElementID = undefined;
    }
    movedCardID = parseInt(movedCard.getAttribute('data-note-id'));
    listToID = this.getAttribute('data-column-id');
    movedCard.classList.remove('dragging');
    this.classList.remove('test')
    moveElement(movedCardID, afterElementID, listToID);
}

function dragOver(e) {
    e.preventDefault();
    afterElement = getDragAfterElement(this, e.clientY);
    if (afterElement == null) {
        this.children[1].append(movedCard);
    } else {
        this.children[1].insertBefore(movedCard, afterElement);
    }
};

function getDragAfterElement(container, y) {

    const draggableElements = [
        ...container.querySelectorAll('.card-preview:not(.dragging)'),
    ];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
};

function moveElement(movedElemID, beforeElemID, listID) {
    let movedCard;
    cardsArr = cardsArr.filter(item => {
        if (item.id == movedElemID) {
            item.column = +listID;
            movedCard = item
        } else {
            return item;
        }
    });
    if (beforeElemID === undefined) {
        cardsArr.push(movedCard);
    } else {
        let arrFindIndex = cardsArr.findIndex(item => item.id == beforeElemID);
        if (arrFindIndex != -1) {
            cardsArr.splice(arrFindIndex, 0, movedCard)
        }
    }
    refreshLocal()
}

// ---------------------------Drag and Drop end  ------------------------


window.onload = () => {

    const list = localStorage.getItem('todoContainer');
    const card = localStorage.getItem('todoCards');
    if (list != null) {
        columns = JSON.parse(list);
        listsArr = columns;
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
        const parentDiv = document.querySelectorAll('.todoList');
        for (let j = 0; j < cardsArr.length; j++) {
            let id = cardsArr[j].id;
            let title = cardsArr[j].title;
            let column = parseInt(cardsArr[j].column);
            let date = cardsArr[j].date;
            let description = cardsArr[j].description;
            let comments = cardsArr[j].comments;
            let cardOne = createCardDom(id, title, column, date, description, comments);
            parentDiv.forEach(el => {
                if (parseInt(el.getAttribute('data-column-id')) == column) {
                    let item = el.children[1];
                    item.appendChild(cardOne);
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

