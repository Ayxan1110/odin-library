# Library

Project from [The Odin Project – JavaScript course](https://www.theodinproject.com/lessons/node-path-javascript-library).

**Live demo:** https://ayxan1110.github.io/odin-library/

A small library app where you can add books, remove them and change their read status.

## What I used
- An **object constructor** `Book()` with `new`, and a unique id from `crypto.randomUUID()`
- A method on the **prototype** (`Book.prototype.toggleRead`) so all books share one function
- An array `myLibrary` that stores the data, separate from the display function `displayBooks()`
- `<dialog>` with `showModal()` and a form, with `event.preventDefault()` on submit
- `data-id` attributes to connect each card on the page with its book object
