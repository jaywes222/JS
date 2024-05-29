const addMovieModal = document.getElementById('add-modal');
// const addMovieModal1 = document.querySelector('#add-modal');
// const addMovieModal2 = document.body.children[1];

// const startAddMovieButton1 = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

//Opens the Modal button
const toggleMovieModalHandler = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const backdropClickHandler = () => {
    toggleMovieModalHandler();
}

const clearMovieInputs = () => {
    // userInputs[0].value = '';

    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    toggleMovieModalHandler();
    clearMovieInputs();
}

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie_element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert("Please Enter Valid Values (1-5).");
        return;
    }

    const newMovie = {
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModalHandler();
    clearMovieInputs();
    renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

startAddMovieButton.addEventListener('click', toggleMovieModalHandler);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler)
