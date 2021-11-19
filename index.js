//List of variables
const bookTitle = document.querySelector('#book-title');
const bookCover = document.querySelector('#book-cover');
const bookAuthor = document.querySelector('#book-author');
const bookReviewForm = document.querySelector('#review-form');
const bookReview = document.querySelector('#review');
const bookContainer = document.querySelector('#book-details');
const bookReviewList = document.querySelector("#book-review");
const bookDescription = document.querySelector("#book-description");
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
    bookDescription.textContent = book.volumeInfo.description;

}

function getBooksFromAPI (e) {
    e.preventDefault();
    const searchInputValue = searchInput.value.replace(' ', '+');
    //Fetch request to API to get data regarding searched book
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}&${googleKey}`)
    .then(res => res.json())
    .then(books => {
        renderBook(books.items[0]);
        fetchSavedReviews(books.items[0].volumeInfo.title)
        bookListContainer.innerHTML = '';
        books.items.forEach(renderRelatedBook);
        console.log(books.items)
    })
    .catch(error => alert(error))

    bookContainer.style.visibility = 'visible';

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

    bookListDiv.className = 'book-list'
    bookListImage.src = book.volumeInfo.imageLinks.thumbnail;
    bookListImage.className = 'list-images';
    bookListTitle.textContent = book.volumeInfo.title;
    bookListAuthor.textContent = book.volumeInfo.authors;

    bookListDescription.className = 'hidden';
    bookListDescription.textContent = book.volumeInfo.description;

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
        bookDescription.textContent = target.children[3].textContent;
        fetchSavedReviews(target.children[1].textContent);
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
    fetch("http://localhost:3000/comments",  {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            content : userBookReview,
            title : bookTitle.textContent
        })
        
    }).then(res=> res.json()).then(data=> console.log(data))
    
    let li = document.createElement("li");
    li.className = "input-review"
    li.textContent = userBookReview
    bookReviewList.appendChild(li)
    e.target.reset()
})


function fetchSavedReviews(){

    fetch("http://localhost:3000/comments")
    .then(response => response.json())
    .then(comments =>  {
        comments.forEach(comment => {
            if (bookTitle.textContent === comment.title) {
                let li = document.createElement("li");
                li.className = "input-review"
                li.textContent = comment.content
                bookReviewList.appendChild(li)
        }
        })
    })
}
