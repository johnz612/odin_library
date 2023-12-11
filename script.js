"use strict";

const books = [];
let bookToDelete;
let rowToDelete;
let bookToEdit;
let parent;

function Books(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "Read" : "Not Read";
}

// Query Selectors
const btn = document.querySelector(".btn");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const checkboxInput = document.querySelector(".checkbox-button");
const tableBody = document.querySelector("tbody");
const form = document.querySelector(".form");
const inputFields = document.querySelectorAll(
  ".title, .author, .pages, .title-edit, author-edit, pages-edit"
);
const deleteEntry = document.querySelector(".delete");
const dialog = document.querySelector(".delete-dialog");
const editDialog = document.querySelector(".edit-dialog");
const deleteText = document.querySelector(".delete-text");
const deleteYes = document.querySelector(".yes");
const deleteNo = document.querySelector(".no");
const editTitleInput = document.querySelector(".title-edit");
const editAuthorInput = document.querySelector(".author-edit");
const editPagesInput = document.querySelector(".pages-edit");
const editCheckboxInput = document.querySelector(".checkbox-button-edit");
const editForm = document.querySelector(".form-edit");
const tableEmpty = document.querySelector(".table-empty");

// Add table row andt its data per submitted form
const createTableRow = function (book) {
  const tableRow = document.createElement("tr");
  const dataTitle = document.createElement("td");
  const dataAuthor = document.createElement("td");
  const dataPages = document.createElement("td");
  const dataisRead = document.createElement("td");
  const dataAction = document.createElement("td");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  dataTitle.textContent = book.title;
  dataAuthor.textContent = book.author;
  dataPages.textContent = book.pages;
  dataisRead.textContent = book.isRead;
  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";
  dataAction.classList.add("table-button");
  deleteButton.classList.add("action-button", "delete");
  editButton.classList.add("action-button", "edit");

  tableRow.appendChild(dataTitle);
  tableRow.appendChild(dataAuthor);
  tableRow.appendChild(dataPages);
  tableRow.appendChild(dataisRead);
  dataAction.appendChild(deleteButton);
  dataAction.appendChild(editButton);
  tableRow.appendChild(dataAction);
  tableBody.appendChild(tableRow);

  // Attach a listener to delete button in the current row and passed the delete and tableRow Element
  attachDeleteListener(deleteButton, tableRow);

  // Attach a listener to edit button in the current row
  attachEditListener(editButton);
};

// Submit Event Listner, gather input values and add them to the table using createTable function
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let book = new Books(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    checkboxInput.checked
  );
  books.push(book);
  createTableRow(book);
  clearFields();

  // Remove empty message when there's an entry in the table
  tableEmpty.classList.add("inactive");
});

// Delete button event listener
const attachDeleteListener = function (element, row) {
  element.addEventListener("click", function (e) {
    dialog.showModal();
    const currentElement = e.target.parentNode.parentNode.firstElementChild;
    deleteText.textContent = `Are you sure to delete "${currentElement.textContent}"?`;

    // Change the bookToDelete global variable value
    bookToDelete = books.find((book) => {
      return book.title === currentElement.textContent;
    });

    // Change the rowToDelete global variable value
    rowToDelete = row;
  });
};

// Delete Yes confirmation event listener
deleteYes.addEventListener("click", function () {
  deleteRow();
  deleteBook();
  dialog.close();

  // Show empty message in screen if table is empty
  if (books.length === 0) tableEmpty.classList.remove("inactive");
});

const deleteRow = function () {
  tableBody.removeChild(rowToDelete);
};

const deleteBook = function () {
  if (!bookToDelete) return;
  const bookIndex = books.indexOf(bookToDelete);
  books.splice(bookIndex, 1);
};

// Don't delete button event listener
deleteNo.addEventListener("click", function () {
  dialog.close();
});

// The edit button listner
const attachEditListener = function (element) {
  element.addEventListener("click", function (e) {
    editDialog.showModal();
    parent = e.target.parentNode.parentNode;
    let elementToEdit = e.target.parentNode.parentNode.firstElementChild;

    bookToEdit = books.find((book) => {
      return book.title === elementToEdit.textContent;
    });

    // Show the current value of a row table to the Dialog
    editTitleInput.value = bookToEdit.title;
    editAuthorInput.value = bookToEdit.author;
    editPagesInput.value = bookToEdit.pages;
    if (bookToEdit.isRead === "Read") editCheckboxInput.checked = true;
  });
};

const clearFields = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkboxInput.checked = false;
};

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Change the object values
  bookToEdit.title = editTitleInput.value;
  bookToEdit.author = editAuthorInput.value;
  bookToEdit.pages = editPagesInput.value;
  bookToEdit.isRead = editCheckboxInput.checked;

  // Change the contents of the table
  parent.childNodes[0].textContent = bookToEdit.title;
  parent.childNodes[1].textContent = bookToEdit.author;
  parent.childNodes[2].textContent = bookToEdit.pages;
  parent.childNodes[3].textContent = bookToEdit.isRead ? "Read" : "Not Read";

  // Close the modal
  editDialog.close();
});

// Input field Listener to show error borders if inputs are invalid
inputFields.forEach((input) => {
  input.addEventListener("blur", function () {
    if (input.checkValidity()) {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
    }
  });
});
