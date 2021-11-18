//List of variables
const bookTitle = document.querySelector('#book-title');
const bookCover = document.querySelector('#book-cover');
const bookAuthor = document.querySelector('#book-author');
const bookReviewForm = document.querySelector('#review-form');
const bookReview = document.querySelector('#review');
const bookContainer = document.querySelector('.book-details');
const bookReviewList = document.querySelector("#book-review");
const bookSubtitle = document.querySelector("#book-subtitle");
const bookDescription = document.querySelector("#book-description");
const bookCategories = document.querySelector("#book-categories");
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const bookListContainer = document.querySelector('#book-container')

//Gets API key from hidden JS file
const googleKey = config.GoogleAPIKey;

//Function for rendering book on website
function renderBook(book) {
    bookTitle.textContent = book.volumeInfo.title;
    bookAuthor.textContent = book.volumeInfo.authors;
    bookCover.src = book.volumeInfo.imageLinks.thumbnail;
    bookSubtitle.textContent = book.volumeInfo.subtitle;
    bookDescription.textContent = book.volumeInfo.description;
    bookCategories.textContent = book.volumeInfo.categories[0];

}

function getBooksFromAPI (e) {
    e.preventDefault();
    const searchInputValue = searchInput.value.replace(' ', '+'); 
    //Fetch request to API to get data regarding searched book
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}&${googleKey}`)
    .then(res => res.json())
    .then(books => {
        renderBook(books.items[0]);
        bookListContainer.innerHTML = '';
        books.items.forEach(renderRelatedBook);
        console.log(books.items)
    })
    .catch(error => alert(error))

    e.target.reset();
}

//Event Listener that will query GoogleBooks API and retrieve queried data
searchForm.addEventListener('submit', e => getBooksFromAPI(e))

function renderRelatedBook (book) {

    const bookListDiv = createEl('div');
    const bookListImage = createEl('img');
    const bookListSubtitle = createEl("h3");
    const bookListTitle = createEl('h2');
    const bookListAuthor = createEl('h3');
    const bookListDescription = createEl('h3');
    const bookListCategories = document.querySelector("h4");

    bookListDiv.className = 'book-list'
    bookListImage.src = book.volumeInfo.imageLinks.thumbnail;
    bookListTitle.textContent = book.volumeInfo.title;
    bookListAuthor.textContent = book.volumeInfo.authors;

    // bookListCategories.textContent = book.volumeInfo.categories[0];
    // bookListCategories.style.visibility = 'hidden';
    // bookListCategories.style.display = 'none';

    bookListSubtitle.textContent = book.volumeInfo.subtitle;
    bookListSubtitle.style.visibility = 'hidden';
    bookListSubtitle.style.display = 'none';

    bookListDescription.textContent = book.volumeInfo.description;
    bookListDescription.style.visibility = 'hidden';
    bookListDescription.style.display = 'none';

    bookListDiv.append(bookListImage, bookListTitle, bookListAuthor, bookListDescription);
    bookListContainer.append(bookListDiv);

    if(bookListTitle.textContent === bookTitle.textContent) {
        bookListDiv.remove();
    }
}

//Function that shows the details of a book in a special window
function getBookDetails(e) {
    const target = e.target;
    if(target && target.className === 'book-list') {
        bookTitle.textContent = target.children[1].textContent;
        bookAuthor.textContent = target.children[2].textContent;
        bookCover.src = target.children[0].src;
        bookSubtitle.textContent = book.children[4].textContent;
        bookDescription.textContent = target.children[3].textContent;
        bookCategories.textContent = book.children[5].textContent;
    }
}
//Event Listener for putting list book into details
bookListContainer.addEventListener('click', e => getBookDetails(e));

//Function for creating elements
function createEl (tag) {
    return document.createElement(tag);
}


bookReviewForm.addEventListener("submit", (e) =>{
    
    e.preventDefault();
    let userBookReview = bookReview.value;
    let li = document.createElement("li");
    li.className = "input-review"
    li.textContent = userBookReview
    bookReviewList.appendChild(li)
    e.target.reset()
})
