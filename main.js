const myLibrary = []

const container = document.querySelector(".container")

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
}
function displayBooks(){
    myLibrary.forEach((book) =>{
        const p = document.createElement("p")
        p.textContent = book.title
        container.append(p)
    })
}
addBookToLibrary('Harry Potter', 'J.K. Rowling', 500, 'Read')
displayBooks()
