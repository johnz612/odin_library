"use strict";

const books = [];

function Books(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "Read" : "Not Read";
}

const btn = document.querySelector(".btn");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const checkboxInput = document.querySelector(".checkbox-button");
const tableBody = document.querySelector("tbody");

const addTable = function (books) {
  let markup = "";
  tableBody.innerHTML = "";
  books.forEach((item) => {
    markup += `<tr>
    <td>${item.title}</td>
        <td>${item.author}</td>
        <td>${item.pages}</td>
        <td>${item.isRead}</td>
        <td><span class="delete">Delete</span> / <span class="edit">Edit</span></td>
    </tr>`;
  });
  tableBody.insertAdjacentHTML("afterbegin", markup);
};

const clearFields = function () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkboxInput.checked = false;
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let book = new Books(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    checkboxInput.checked
  );
  books.push(book);
  console.log(books);
  addTable(books);
  clearFields();
});
