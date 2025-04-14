let myLibrary = []

const container = document.querySelector(".container")
const form = document.querySelector("form")

function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.id = crypto.randomUUID()
    this.toggleRead = function(){
        if(this.status === "Read"){
            this.status = "Unread"
        } else {
            this.status = "Read"
        }
    }
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

function addBookToLocal(book) {
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    library.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(library));
}

function deleteBookLocal(bookTitle){
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    const updatedLibrary = library.filter((book) => book.title !== bookTitle);
    localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary));
}

function loadBooksFromLocal() {
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    library.forEach((bookData) => {
        const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.status);
        book.id = bookData.id; // Preserve the unique ID
        myLibrary.push(book);
        displayBook(book);
    });
}

function toggleReadLocal(bookId) {
    const library = JSON.parse(localStorage.getItem("myLibrary")) || [];
    const updatedLibrary = library.map((book) => {
        if (book.id === bookId) {
            book.status = book.status === "Read" ? "Unread" : "Read";
        }
        return book;
    });
    localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary));
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
        deleteBookLocal(book.title)
    });
    bookDiv.appendChild(deleteButton);

    const readToggleBtn = document.createElement("button")
    readToggleBtn.textContent = "Toggle read"
    readToggleBtn.addEventListener('click', () => {
        book.toggleRead()
        toggleReadLocal(book.id)
        status.textContent = `Status: ${book.status}`;
    })
    bookDiv.appendChild(readToggleBtn);
    container.appendChild(bookDiv);
}

function addNewBook(e){
    e.preventDefault()

    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    const newBook = addBookToLibrary(value.title, value.author, parseInt(value.pages), value.status)
    addBookToLocal(newBook)
    displayBook(newBook)
}

form.addEventListener('submit', addNewBook)

document.addEventListener("DOMContentLoaded", () => {
    loadBooksFromLocal();
});
