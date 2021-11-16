//List of variables
const bookTitle = document.querySelector('#book-title')
const bookCover = document.querySelector('#book-cover')
const bookAuthor = document.querySelector('#book-author')
const bookPublisher = document.querySelector('#book-publisher')
const bookPublishingDate = document.querySelector('#book-publishing-date')
const bookISBN = document.querySelector('#ISBN')
const bookReviewForm = document.querySelector('#review-form')
const bookReview = document.querySelector('#review')
const likeButton = document.querySelector('#like-button')

//Fetch request to server to get data regarding random book
fetch('')
.then(res => res.json())
.then(book => renderBook(book))
.catch(error => alert(error))

//Function that renders book on the page
function renderBook(book) {

}