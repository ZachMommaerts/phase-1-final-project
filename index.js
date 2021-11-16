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

//Fetch request to API to get data regarding random book
fetch('https://openlibrary.org/works/OL45883W.json')
.then(res => res.json())
.then(book => renderTitle(book))
.catch(error => alert(error))

//Fetch request to API to get book cover
fetch(`https://covers.openlibrary.org/b/isbn/${}-L.jpg`)
.then(res => res.json())
.then(cover => renderCover(cover))
.catch(error => alert(error))

//Fetch request to API to get author name
fetch(`https://openlibrary.org/authors/${}.json`)
.then(res => res.json())
.then(book => renderBook(book))
.catch(error => alert(error))

//Fetch request to API to get publishing date

//Function that renders title on the page
function renderTitle(book) {
    bookTitle.textContent = book.title;
}

//Function that renders image on the page
function renderCover(cover) {
    bookCover.src = 
}

likeButton.addEventListener("click", (e) =>{

})

bookReviewForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let bookReview = document.querySelector("#review").value;
    let li =document.createElement("li");
    li.textContent = bookReview;
    bookReviewForm.appendChild(li);
    e.target.reset()
})