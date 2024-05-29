const addMovieModal = document.getElementById('add-modal');
// const addMovieModal1 = document.querySelector('#add-modal');
// const addMovieModal2 = document.body.children[1];

// const startAddMovieButton1 = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

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
}

startAddMovieButton.addEventListener('click', toggleMovieModalHandler);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler)
