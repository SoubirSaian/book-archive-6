// toggle spinner function 
const toggleSpinner = displayStyle =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayStyle;
}
 
// call api through search result 
const searchBook = () => {
    const input = document.getElementById('input-field');
    const inputText = input.value;

    // call toggole spinner function 
    toggleSpinner('block');
    
    input.value = '';

    // check out search input 
    if(inputText === ''){
            // call display error messege function and show error 
        displayErrorMessege('invalid input.Please write something valid');
    }

    else{
        const url = `https://openlibrary.org/search.json?q=${inputText}`;

        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data))
        .catch(error => displayErrorMessege(`404 ${error}`));
    }

}


// display error messege 
const displayErrorMessege = error =>{

    // remove previous search result 
    const  totalSearch = document.getElementById('display-book');
    totalSearch.textContent = '';
    const bookDetail = document.getElementById('book-detail');
    bookDetail.textContent = '';

        // now display error messege 
    const displayError = document.getElementById('error');
    displayError.textContent = '';
    const h2 = document.createElement('h2');
    h2.classList.add('display-error');
    h2.innerText=`${error}`;
    displayError.appendChild(h2);

    toggleSpinner('none');
}


// displayTotalSearchResult function 
const displayTotalSearchResult = number =>{
    const  totalSearch = document.getElementById('display-book');
    totalSearch.textContent = '';

    const h3 = document.createElement('h3');
    h3.classList.add('m-5');
    h3.innerText =`Total search result: ${number}`;
 
    totalSearch.appendChild(h3);
}


// display book details through forEach and display total search result 
const displayBooks = books => {
    
    const totalSearchResult = books.numFound;
    const bookListArray = books.docs;

    // display only 10 books details on user interface
    const bookList = bookListArray.slice(0,10);
    
     // call display total search result function
    displayTotalSearchResult(totalSearchResult);

    if(bookListArray.length === 0){
        // call display error messege function 
         displayErrorMessege('No result Found.Please try again!!!!');
    }

    else{
        // remove previous error messege if exists 
        const displayError = document.getElementById('error');
        displayError.textContent = '';

        const bookDetail = document.getElementById('book-detail');
        bookDetail.textContent = '';
          //  get and display book details 
        bookList.forEach(book => {

            const bookImage = book.cover_i;
            const boookName = book.title;
            const bookAuthors = book.author_name;
            const publishYear = book.first_publish_year;
            const publisher = book.publisher;
            
            const div1 = document.createElement('div');
            div1.classList.add('col-6');
            const div2 = document.createElement('div');
            div2.classList.add('col-6');
            const hr = document.createElement('hr');
            hr.classList.add('hr')

            div1.innerHTML = `
                <div class="d-flex justify-content-around">
                    <img src="https://covers.openlibrary.org/b/id/${bookImage}-M.jpg" alt="no image available"></img>
                </div>
            `;
            div2.innerHTML = `
                <h2>${boookName}</h5>
                <h6>By <i class="text-danger">${bookAuthors}</i></h6>
                <p>First publish in: ${publishYear}</p>
                <p>Published By: ${publisher.slice(0,2)}</p>
            `;
            bookDetail.appendChild(div1);
            bookDetail.appendChild(div2);
            bookDetail.appendChild(hr);
            
        }); 
     }
     toggleSpinner('none');

}

 