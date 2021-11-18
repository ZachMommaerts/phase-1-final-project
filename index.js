//List of variables
const bookTitle = document.querySelector('#book-title');
const bookCover = document.querySelector('#book-cover');
const bookAuthor = document.querySelector('#book-author');
const bookPublisher = document.querySelector('#book-publisher');
const bookPublishingDate = document.querySelector('#book-publishing-date');
const bookISBN = document.querySelector('#ISBN');
const bookReviewForm = document.querySelector('#review-form');
const bookReview = document.querySelector('#review');
const likeButton = document.querySelector('#like-button');
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
    bookPublisher.textContent = book.volumeInfo.publisher;
    bookPublishingDate.textContent = book.volumeInfo.publishedDate;
    if(book.volumeInfo.industryIdentifiers){
        if (book.volumeInfo.industryIdentifiers[0] === 'ISBN_13'){
            bookISBN.textContent = book.volumeInfo.industryIdentifiers[0].identifier;
        } else {
            bookISBN.textContent = book.volumeInfo.industryIdentifiers[1].identifier;
        }
    } else {
        bookISBN.innerHTML = '';
    }
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
    const bookListTitle = createEl('h2');
    const bookListAuthor = createEl('h3');
    const bookListDescription = createEl('h3');

    bookListImage.src = book.volumeInfo.imageLinks.thumbnail;
    bookListTitle.textContent = book.volumeInfo.title;
    bookListAuthor.textContent = book.volumeInfo.authors;
    bookListDescription.textContent = book.volumeInfo.description;
    bookListDescription.style.visibility = 'hidden';
    bookListDescription.style.display = 'none';

    bookListDiv.append(bookListImage, bookListTitle, bookListAuthor, bookListDescription);
    bookListContainer.append(bookListDiv);

    if(bookListTitle.textContent === bookTitle.textContent) {
        bookListDiv.remove();
    }
}

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
