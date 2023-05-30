const addBtn = document.querySelector('.add-btn');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const listOfbooks = document.querySelector('.list-of-books');
let arrayOfBooks = JSON.parse(localStorage.getItem('arrayOfBook')) || [];

// Remove book function
function removeBook(e) {
  const artcl = e.currentTarget.parentElement;
  listOfbooks.removeChild(artcl);
  arrayOfBooks = arrayOfBooks.filter((item) => item.id !== artcl.dataset.id);
  localStorage.setItem('arrayOfBook', JSON.stringify(arrayOfBooks));
}

// display book function
function displayBook() {
  arrayOfBooks.forEach((book) => {
    const article = document.createElement('article');
    article.classList.add('book-container');
    const attr = document.createAttribute('data-id');
    attr.value = book.id;
    article.setAttributeNode(attr);
    article.innerHTML = `
                            <p class="book-title">${book.title}</p>
                            <p class="book-author">${book.author}</p>
                            <button class="remove-btn">Remove</button>
                            <hr class="line">
                                `;
    listOfbooks.appendChild(article);
    listOfbooks.style.display = 'block';
    const removeBtn = article.querySelectorAll('.remove-btn');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', removeBook);
    });
  });
}
// add Book function
function addBook() {
  const bookId = new Date().getTime().toString();
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  if (listOfbooks.lenght === 0) {
    listOfbooks.style.display = 'none';
  }
  if (titleValue && authorValue) {
    const book = {
      id: bookId,
      title: titleValue,
      author: authorValue,
    };
    listOfbooks.innerHTML = '';
    arrayOfBooks.push(book);
    displayBook();
    titleInput.value = '';
    authorInput.value = '';
    localStorage.setItem('arrayOfBook', JSON.stringify(arrayOfBooks));
  }
}
// event listeners
window.addEventListener('DOMContentLoaded', displayBook);
addBtn.addEventListener('click', addBook);
