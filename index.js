const btn = document.getElementById('addBook');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputStatus = document.getElementById('status');
const table = document.getElementById('table')


let book = {
    title: "",
    author: "",
    numberOfPages: 0,
    isRead: false,
}

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const newBook = myLibrary.createBook(book);

    myLibrary.addBookToLibrary(newBook);
    myLibrary.createLibrary();

    book = {
        title: "",
        author: "",
        numberOfPages: 0,
        isRead: false,
    }
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
    inputStatus.value = "";

})

inputTitle.addEventListener('input', (e) => {
    e.preventDefault();
    book.title = e.target.value;
})
inputAuthor.addEventListener('input', (e) => {
    e.preventDefault();
    book.author = e.target.value;
})
inputPages.addEventListener('input', (e) => {
    e.preventDefault();
    book.numberOfPages = e.target.value;
})
inputStatus.addEventListener('change', (e) => {
    e.preventDefault();
    book.isRead = e.target.value === 'true';
})

class Book {

    constructor(title, author, numberOfPages, isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = Boolean(isRead);

        if (this.title.length < 3) {
            alert('Title should have at least 3 characters!');
            throw new Error('Title should have at least 3 characters!');
        }
        if (this.author.length < 3) {
            alert('Author should have at least 4 characters!');
            throw new Error('Author should have at least 4 characters!');
        }
        if (this.numberOfPages < 5) {
            alert('Your book should have at least 5 pages!')
            throw new Error('Put some more pages!!')
        }
    }
}

class MyLibrary {

    myList = []

    createBook(obj) {
        return new Book(obj.title, obj.author, obj.numberOfPages, obj.isRead);
    }

    addBookToLibrary(obj) {
        const find = this.myList.find(obj => obj.title.toUpperCase() === book.title.toUpperCase());
        if (find) {
            alert("You already have this title!")
            throw new Error('Title duplicated!')
        }
        this.myList.push(obj);
        this.saveToLocal();
    }

    generateListOfBooks(arr) {

        table.textContent = "";

        arr.forEach(({title, author, numberOfPages, isRead}, id) => {

            const tbody = document.createElement('tbody');
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', id);

            const tdTitle = document.createElement('td');
            tdTitle.textContent = title;

            const tdAuthor = document.createElement('td');
            tdAuthor.textContent = author;

            const tdPages = document.createElement('td');
            tdPages.textContent = numberOfPages;

            const tdStatus = document.createElement('td');
            tdStatus.classList.add(isRead ? "read" : "notRead")
            tdStatus.addEventListener('click', () => {

                myLibrary.myList[id].isRead = !isRead
                myLibrary.saveToLocal();
                myLibrary.createLibrary();

            })
            tdStatus.textContent = `${isRead ? 'Read it' : 'Havent read it'}`;

            const tdDelete = document.createElement('td');
            const deleteBtn = document.createElement('button');

            deleteBtn.addEventListener('click', () => {
                const id = Number(tr.dataset.id);
                myLibrary.myList.splice(id, 1);
                myLibrary.saveToLocal();
                myLibrary.createLibrary()
            })
            deleteBtn.classList.add('delete');
            deleteBtn.textContent = 'delete'

            tdDelete.appendChild(deleteBtn);

            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdPages);
            tr.appendChild(tdStatus);
            tr.appendChild(tdDelete);
            tr.appendChild(tbody)
            table.appendChild(tr);

        })
    }

    createLibrary() {
        const data = JSON.parse(localStorage.getItem('library'));
        this.myList = data ? data : [];
        this.generateListOfBooks(this.myList);
    }

    saveToLocal() {
        localStorage.setItem('library', JSON.stringify(this.myList));
    }
}

const myLibrary = new MyLibrary();
myLibrary.createLibrary();

