// All books are stored in this array
const myLibrary = [];

// Object constructor for a book
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID(); // unique id, so we can find the book later
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Method on the prototype, so every book shares one copy of this function
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// Draws all books from the array on the page
function displayBooks() {
  const library = document.querySelector("#library");
  const emptyMessage = document.querySelector("#empty-message");

  library.innerHTML = ""; // clear old cards first, so books are not duplicated
  emptyMessage.style.display = myLibrary.length === 0 ? "block" : "none";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    if (book.read) card.classList.add("read");
    card.dataset.id = book.id; // connects the card on the page with the book object

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement("p");
    status.textContent = book.read ? "Status: Read" : "Status: Not read yet";

    const buttons = document.createElement("div");
    buttons.classList.add("card-buttons");

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.textContent = book.read ? "Mark unread" : "Mark read";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBook(card.dataset.id);
      displayBooks();
    });

    buttons.append(toggleBtn, removeBtn);
    card.append(title, author, pages, status, buttons);
    library.appendChild(card);
  });
}

// Dialog and form
const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");

document.querySelector("#new-book-btn").addEventListener("click", () => {
  dialog.showModal();
});

document.querySelector("#cancel-btn").addEventListener("click", () => {
  form.reset();
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the form from sending data to a server

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();
  displayBooks();
});

// Some books so the page is not empty at the start
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
displayBooks();
