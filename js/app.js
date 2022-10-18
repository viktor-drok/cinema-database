import { swiperHero } from "./swiper-hero.js";
import { swiperPopular } from "./swiper-popular.js";
import { topWeekFilms } from "./top-week-films.js";

const API_KEY = 'api_key=bfdccbc25c964210432d186c297791bf';
const BASE_URL = 'https://api.themoviedb.org/3'; ///discover/movie/
const NEW_FILMS_URL = BASE_URL + '/movie/upcoming' + '?' + API_KEY;
const TOP_RAITED_URL = BASE_URL + '/movie/top_rated' + '?' + API_KEY;
const POPULAR_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const NEW_FILM_LIST = document.querySelector('.new-films-list');
const POPULAR_FILM_LIST = document.querySelector('.popular-films-list');

getNewMovies(NEW_FILMS_URL);

function getNewMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log('new', data);
        showNewMovies(data.results);
    });
};

function showNewMovies(data) {

    NEW_FILM_LIST.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('new-films-item', 'swiper-slide');
        movieEl.innerHTML = /*html*/ `
            <div>
                <div class="new-film-rating">
                    <div class="new-film-rating-inner">
                        <h3 class="new-film-rating-text">${vote_average}</h3>
                    </div>

                </div>

                <img src="${POSTER_URL + poster_path}" alt="${title}">

                <div class="new-film-overview">
                    <h2>"${title}"</h2>
                    <h4>Overview</h4>
                    </br>
                    <p>${overview}</p>
                </div>
            </div>
        `;

        NEW_FILM_LIST.append(movieEl);

        setRatingColor();
    });
}

function setRatingColor() {
    const RATING = document.querySelectorAll('.new-film-rating');

    RATING.forEach(e => {
        if (+e.innerText >= 8 && +e.innerText < 10) {
            e.setAttribute('data-conic-green', 'green');
        } else if (+e.innerText >= 5 && +e.innerText < 8) {
            e.setAttribute('data-conic-yellow', 'yellow');
        } else if (+e.innerText >= 0 && +e.innerText < 5) {
            e.setAttribute('data-conic-red', 'red');
        }
    });
}

getPopularMovies(POPULAR_URL);

function getPopularMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log('popular', data);
        showPopularMovies(data.results);
    });
};

function showPopularMovies(data) {
    POPULAR_FILM_LIST.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('popular-films-item', 'swiper-slide');
        movieEl.innerHTML = /*html*/`
            <div>
                <div class="popular-film-rating">
                    <div class="popular-film-rating-inner">
                        <h3 class="popular-film-rating-text">${vote_average}</h3>
                    </div>

                </div>

                <img src="${POSTER_URL + poster_path}" alt="${title}">

                <div class="popular-film-overview">
                    <h2>"${title}"</h2>
                </div>
            </div>
        `;

        // <h4>Overview</h4>
        //             </br >
        //     <p>${ overview }</p>
        POPULAR_FILM_LIST.append(movieEl);
        setColorRaitingPopular();

    });
}

function setColorRaitingPopular() {
    const POPULAR_TITLE = document.querySelectorAll('.popular-film-rating-text');

    POPULAR_TITLE.forEach(e => {
        if (+e.innerText >= 8 && +e.innerText < 10) {
            e.setAttribute('data-green', 'green');
        } else if (+e.innerText >= 5 && +e.innerText < 8) {
            e.setAttribute('data-yellow', 'yellow');
        } else if (+e.innerText > 0 && +e.innerText < 5) {
            e.setAttribute('data-red', 'red');
        } else if (+e.innerText == 0) {
            e.setAttribute('data-red', 'red');
            e.innerText = 'N/R';
        }
    });
}