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
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

//Opens the Modal button
const showMovieModalHandler = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const backdropClickHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    closeMovieDeletionModal();
}

const clearMovieInputs = () => {
    // userInputs[0].value = '';

    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
    // listRoot.removeChild(listRoot.children[movieIndex]);
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);

    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
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
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id))
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
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

startAddMovieButton.addEventListener('click', showMovieModalHandler);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler)

