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

// // new keys to formattted into the html 
// const bookSubtitle = document.querySelector();
// const bookDescription = document.querySelector();

//Gets API key from hidden JS file
const googleKey = config.GoogleAPIKey;

//Fetch request to API to get data regarding random book
fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&${googleKey}`)
.then(res => res.json())
.then(book => console.log(book))
.catch(error => alert(error))

//Function for rendering book on website
function renderBook(book) {
    // these might have to be .items?
    bookTitle.textContent = book.bookTitle

    bookAuthor.textContent = book.authors

    bookPublisher.textContent = book.Publisher

    bookPublishingDate.textContent = book.publishedDate
    
    bookISBN.textContent = book.identifier

    bookCover.src = book.thumbnail

    bookSubtitle.textContent = book.subtitle

    boookDescription.textContent = book.description

    

}

likeButton.addEventListener("click", (e) =>{
    e.classList.toggle(likeButton)
    console.log()
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
