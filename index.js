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

//Gets API key from hidden JS file
const googleKey = config.GoogleAPIKey;

//Fetch request to API to get data regarding random book
fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms&${googleKey}`)
.then(res => res.json())
.then(book => {
    renderBook(book.items[7]);
    console.log(book.items)
})
.catch(error => alert(error))

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

//Event Listener that will query GoogleBooks API and retrieve queried data
searchForm.addEventListener('submit', )


likeButton.addEventListener("click", (e) =>{
    e.classList.toggle(likeButton)
})

bookReviewForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let userBookReview = bookReview.value;
    let li = document.createElement("li");
    li.className = "input-review"
    li.textContent = userBookReview
    bookReviewList.appendChild(li)
    e.target.reset()
})
