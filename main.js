function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function() {
        return `${this.title}, ${this.author}, ${this.pages} pages, ${this.status}`
    }
}
const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 500, 'Read')