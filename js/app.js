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
        const { title, poster_path, vote_average } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('new-films-item', 'swiper-slide');
        movieEl.innerHTML = `
            <img src="${POSTER_URL + poster_path}" alt="${title}">
        `;

        NEW_FILM_LIST.append(movieEl);
    });
}