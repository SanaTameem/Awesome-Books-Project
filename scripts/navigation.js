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
    this.mainContainer = document.querySelector('.main-container');
    // containers
    this.container = document.querySelector('.list-container');
    this.formContainer = document.querySelector('.form-container');
    this.contactContainer = document.querySelector('.contact-container');
    // nav items
    this.listShow = document.querySelector('.list-show');
    this.addNew = document.querySelector('.add-new');
    this.contact = document.querySelector('.contact');
    // nav event listeners
    this.listShow.addEventListener('click', this.showList.bind(this));
    this.addNew.addEventListener('click', this.showNew.bind(this));
    this.contact.addEventListener('click', this.showContact.bind(this));
  }

  showList() {
    this.container.classList.add('show');
    this.formContainer.classList.remove('show');
    this.contactContainer.classList.remove('show');
  }

  showNew() {
    this.formContainer.classList.add('show');
    this.container.classList.remove('show');
    this.contactContainer.classList.remove('show');
  }

  showContact() {
    this.contactContainer.classList.add('show');
    this.formContainer.classList.remove('show');
    this.container.classList.remove('show');
  }

  // date and time function
  updateTime() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    let daySuffix;
    switch (day % 10) {
      case 1:
        daySuffix = 'st';
        break;
      case 2:
        daySuffix = 'nd';
        break;
      case 3:
        daySuffix = 'rd';
        break;
      default:
        daySuffix = 'th';
    }
    const year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    const amPm = hour >= 12 ? 'pm' : 'am';
    hour %= 12;
    hour = hour || 12;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    const time = `${month} ${day}${daySuffix} ${year}, ${hour}:${minute}:${second} ${amPm}`;
    const timeElement = document.querySelector('.date');
    timeElement.innerHTML = time;
    setInterval(this.updateTime, 1000);
  }

  // Remove book function
  removeBook(e) {
    const artcl = e.currentTarget.parentElement;
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
                                <p class="book-title">"${book.title} by ${book.author}"</p>
                            </div>
                            
                            <button class="remove-btn">Remove</button>
                           
                                `;
      this.listOfbooks.appendChild(article);
      this.listOfbooks.style.display = 'block';
      const removeBtn = article.querySelectorAll('.remove-btn');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', this.removeBook.bind(this));
      });
      this.container.classList.add('show');
    });
  }

  // add Book function
  addBook() {
    const bookId = new Date().getTime().toString();
    const titleValue = this.titleInput.value;
    const authorValue = this.authorInput.value;
    if (this.listOfbooks.lenght === 0) {
      this.listOfbooks.style.display = 'none';
    }
    if (titleValue && authorValue) {
      const book = {
        id: bookId,
        title: titleValue,
        author: authorValue,
      };
      this.listOfbooks.innerHTML = '';
      this.arrayOfBooks.unshift(book);
      this.displayBook();
      this.titleInput.value = '';
      this.authorInput.value = '';
      localStorage.setItem('arrayOfBook', JSON.stringify(this.arrayOfBooks));
    }
    this.container.classList.remove('show');
  }
}

const booklist = new Book();
window.addEventListener('DOMContentLoaded', booklist.displayBook());
document.body.addEventListener('onload', booklist.updateTime());