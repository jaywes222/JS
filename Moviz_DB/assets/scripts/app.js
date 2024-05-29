const addMovieModal = document.getElementById('add-modal');
// const addMovieModal1 = document.querySelector('#add-modal');
// const addMovieModal2 = document.body.children[1];

// const startAddMovieButton1 = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');

const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

//Opens the Modal button
const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const backdropClickHandler = () => {
    toggleMovieModal();
}

const cancelAddMovie = () => {
    toggleMovieModal();
}



startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie)
