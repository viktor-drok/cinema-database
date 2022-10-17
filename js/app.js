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

getMovies(NEW_FILMS_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovies(data.results);
    });
};

function showMovies(data) {

    NEW_FILM_LIST.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('new-films-item', 'swiper-slide');
        movieEl.innerHTML += //html
            `
        <div>
            <div class="rating">
                <div class="rating-inner">
                <h3 class="rating-text">${vote_average}</h3>
            </div>

            </div>
                <img src="${POSTER_URL + poster_path}" alt="${title}">
            <div class="overview">
                <h2>${title}</h2>
                <h4>Overview</h4>
                </br>
                <p>${overview}
            </div>
        </div>
                    `;


        NEW_FILM_LIST.append(movieEl);

        changeRatingColor(vote_average);
    });
}

function changeRatingColor(vote_average) {
    const RATING = document.querySelectorAll('.rating');

    RATING.forEach(element => {

        if (vote_average >= 8 && vote_average < 10) {
            element.style.background = `conic-gradient(var(--conic-gradient-green) ${Math.ceil(vote_average * 36)}deg, rgb(183, 186, 205) 0deg)`;
        } else if (vote_average >= 5 && vote_average < 8) {
            element.style.background = `conic-gradient(var(--conic-gradient-yellow) ${vote_average * 36}deg, rgb(183, 186, 205) 0deg)`;
        } else if (vote_average >= 0 && vote_average < 5) {
            element.style.background = `conic-gradient(var(--conic-gradient-red) ${vote_average * 36}deg, rgb(183, 186, 205) 0deg)`;
        }
    });

}