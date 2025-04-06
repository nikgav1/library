let myLibrary = []

const container = document.querySelector(".container")
const form = document.querySelector("form")

function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, status){
    const book = new Book(title, author, pages, status)
    myLibrary.push(book)
    return book
}

function deleteBook(bookId){
    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    const bookElement = container.querySelector(`[book-id="${bookId}"]`);
    if (bookElement) {
        bookElement.remove();
    }
}

function displayBook(book){
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("book-id", book.id); // Use the book's unique ID for reference

    const title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;
    bookDiv.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    bookDiv.appendChild(pages);

    const status = document.createElement("p");
    status.textContent = `Status: ${book.status}`;
    bookDiv.appendChild(status);

    // Add a delete button for the book
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteBook(book.id);
    });
    bookDiv.appendChild(deleteButton);

    container.appendChild(bookDiv);
}

function addNewBook(e){
    e.preventDefault()

    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    const newBook = addBookToLibrary(value.title, value.author, parseInt(value.pages), value.status)
    displayBook(newBook)
}
form.addEventListener('submit', addNewBook)
