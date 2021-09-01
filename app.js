
const searchBook = () => {
    const input = document.getElementById('input-field');
    const inputText = input.value;
    // console.log(inputText);
    input.value = '';

    const url = `http://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data));

}

const displayBooks = books => {
    // console.log(books);
    const totalSearchResult = books.numFound;
    const bookList = books.docs;
    // const bookList = bookListArray[5];
    console.log(bookList);

     // get book display container 
    const displayBook = document.getElementById('display-book');
    displayBook.textContent = '';

    const h3 = document.createElement('h3');
    h3.classList.add('m-5');
    h3.innerText =`Total search result: ${totalSearchResult}`;
 
    displayBook.appendChild(h3);

    const bookDetail = document.getElementById('book-detail');
    bookDetail.textContent = '';
    //  get and display all book details 
    for(const book of bookList) {

        const bookImage = book.cover_i;
        const boookName = book.title;
        const bookAuthors = book.author_name;
        const publishYear = book.first_publish_year;
        const publisher = book.publisher;
    
        const div1 = document.createElement('div');
        div1.classList.add('col-6');
        const div2 = document.createElement('div');
        div2.classList.add('col-6');

        div1.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${bookImage}-M.jpg" alt="no image available"></img>
        `;
        div2.innerHTML = `
            <h2>${boookName}</h5>
            <h5>${bookAuthors}</h5>
            <p>First publish in: ${publishYear}</p>
            <p>Published By: ${publisher}</p>
        `;
        bookDetail.appendChild(div1);
        bookDetail.appendChild(div2);
        
    } 

}

 