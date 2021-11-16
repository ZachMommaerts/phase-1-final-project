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
const bookReviewList = document.querySelector("#book-review")
// //Fetch request to API to get data regarding random book
// fetch('https://openlibrary.org/works/OL45883W.json')
// .then(res => res.json())
// .then(book => renderTitle(book))
// .catch(error => alert(error))

//Gets API key from hidden JS file
const googleKey = config.GoogleAPIKey;

//Fetch request to API to get data regarding random book
fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&${googleKey}`)
.then(res => res.json())
.then(book => console.log(book))
.catch(error => alert(error))

//Function for rendering book on website
function renderBook(book) {

}
// //Fetch request to API to get book cover
// fetch(`https://covers.openlibrary.org/b/isbn/${}-L.jpg`)
// .then(res => res.json())
// .then(cover => renderCover(cover))
// .catch(error => alert(error))

// //Fetch request to API to get author name
// fetch(`https://openlibrary.org/authors/${}.json`)
// .then(res => res.json())
// .then(book => renderBook(book))
// .catch(error => alert(error))

// //Fetch request to API to get publishing date

// //Function that renders title on the page
// function renderTitle(book) {
//     bookTitle.textContent = book.title;
// }

// //Function that renders image on the page
// function renderCover(cover) {
//     bookCover.src = 
// }

likeButton.addEventListener("click", (e) =>{
    e.classList.toggle(likeButton)
})

bookReviewForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let bookReview = document.querySelector("#review").value;
    let li = document.createElement("li");
    li.className = "input-review"
    li.textContent = bookReview
    bookReviewList.appendChild(li)
    e.target.reset()
})
