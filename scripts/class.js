class Book {
  constructor(author, title) {
    this.author = author;
    this.title = title;
    this.id = new Date().getTime().toString();
    this.addBtn = document.querySelector('.add-btn');
    this.titleInput = document.querySelector('.title-input');
    this.authorInput = document.querySelector('.author-input');
    this.listOfbooks = document.querySelector('.list-of-books');
    this.arrayOfBooks = JSON.parse(localStorage.getItem('arrayOfBook')) || [];
    this.addBtn.addEventListener('click', this.addBook.bind(this));
  }

  // Remove book function
  removeBook(e) {
    const artcl = e.currentTarget.parentElement;
    //   const articleId = e.currentTarget.parentElement.dataset.id;
    this.listOfbooks.removeChild(artcl);
    this.arrayOfBooks = this.arrayOfBooks.filter((item) => item.id !== artcl.dataset.id);
    localStorage.setItem('arrayOfBook', JSON.stringify(this.arrayOfBooks));
  }

  // display book function
  displayBook() {
    this.arrayOfBooks.forEach((book) => {
      const article = document.createElement('article');
      article.classList.add('book-container');
      const attr = document.createAttribute('data-id');
      attr.value = book.id;
      article.setAttributeNode(attr);
      article.innerHTML = ` <div class="title-author-container">
                                <p class="book-title">"${book.title}" by</p>
                                <pre class="book-author"> "${book.author}"</pre>
                            </div>
                            
                            <button class="remove-btn">Remove</button>
                           
                                `;
      this.listOfbooks.appendChild(article);
      this.listOfbooks.style.display = 'block';
      const removeBtn = article.querySelectorAll('.remove-btn');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', this.removeBook.bind(this));
      });
    });
  }

  // add Book function

}

const booklist = new Book();
window.addEventListener('DOMContentLoaded', booklist.displayBook());