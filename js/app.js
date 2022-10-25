import { swiperHero } from "./swiper-hero.js";
import { makeSwiperPopular } from "./swiper-popular.js";
import { videoSwiper } from './videos-swiper.js';

const API_KEY = 'api_key=bfdccbc25c964210432d186c297791bf';
const BASE_URL = 'https://api.themoviedb.org/3'; ///discover/movie/
const NEW_FILMS_URL = BASE_URL + '/movie/upcoming?' + API_KEY;
const TOP_RAITED_URL = BASE_URL + '/movie/top_rated?' + API_KEY;
const POPULAR_URL = BASE_URL + '/movie/popular?' + API_KEY + '&page=3';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const NEW_FILM_LIST = document.querySelector('.new-films-list');
const POPULAR_FILM_LIST = document.querySelector('.popular-films-list');
const LOOKING_MOVIES_LIST = document.querySelector('.looking-movies-list');
const searchInput = document.querySelector('.search');
const nextPageBtn = document.querySelector('.show-more');
const formMovies = document.getElementById('movies');
const popular = document.getElementById('popular');
const topWeek = document.getElementById('topWeek');
const selectedInput = document.querySelector('.selected-input');
const overlay = document.getElementById('myNav');
const closeModal = document.querySelector('.closebtn');
const overlayContent = document.querySelector('.overlay-content .swiper-wrapper');
const scrollTopBtn = document.querySelector('.scroll-top');

let currentPage = 1;
let searchQuery = '';
let swiperPopular;
let rateValue = { value: 0 };
let movieId;

scrollTopBtn.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});
closeModal.addEventListener('click', closeNav);
searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        currentPage = 1;
        LOOKING_MOVIES_LIST.innerHTML = '';
        searchQuery = searchInput.value;
        await findMovies();

        LOOKING_MOVIES_LIST.scrollIntoView({ behavior: 'smooth' });
    }
});
nextPageBtn.addEventListener('click', () => {
    currentPage++;
    findMovies();
});
formMovies.addEventListener('click', renderCategory);

getNewMovies(NEW_FILMS_URL);
getPopularMovies(POPULAR_URL);

function getNewMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log('new', data);
        showNewMovies(data.results);
    });
};

function showNewMovies(data) {

    NEW_FILM_LIST.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
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
                </br>
                <div class="show-trailer" id="${id}">Watch Trailer</div>
                </div>
            </div>
        `;
        NEW_FILM_LIST.append(movieEl);
        setRatingColor();

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
            movieId = id;
            openNav(movie);
        });
    });
}

function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
        console.log(videoData);
        if (videoData) {
            overlay.style.width = "100%";
            if (videoData.results.length > 0) {
                const embedVideo = [];
                videoData.results.forEach(video => {
                    const { key, name, site } = video;

                    if (site == 'YouTube') {
                        embedVideo.push(`
                        <iframe class="swiper-slide overlay-content-item" width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    `);
                    };

                    if (site == 'Vimeo') {
                        embedVideo.push(`
                        <iframe src="https://player.vimeo.com/video/${key}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    `);
                    };
                });

                overlayContent.innerHTML = embedVideo.join('');
            } else {
                overlay.style.width = "100%";
                overlayContent.innerHTML = 'Video not Found';
                overlayContent.style.fontSize = '60px';
            }
        }
    });
}

function closeNav() {
    overlay.style.width = "0%";
}

function setRatingColor() {
    const RATING = document.querySelectorAll('.new-film-rating');
    const ratingCount = document.querySelector('.new-film-rating-text');

    RATING.forEach((e, i) => {
        if (+e.innerText >= 8 && +e.innerText < 10) {
            e.style.background = `conic-gradient(rgb(0, 128, 0) ${Number(e.innerText * 36)}deg, rgb(183, 186, 205) 0deg)`;
        } else if (+e.innerText >= 5 && +e.innerText < 8) {
            e.style.background = `conic-gradient(rgb(255, 255, 0) ${Number(e.innerText * 36)}deg, rgb(183, 186, 205) 0deg)`;
        } else if (+e.innerText >= 0 && +e.innerText < 5) {
            e.style.background = `conic-gradient(rgb(255, 0, 0) ${Number(e.innerText * 36)}deg, rgb(183, 186, 205) 0deg)`;
        }
    });
}

function getPopularMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log('popular', data);
        showPopularMovies(data.results);
        swiperPopular?.destroy();
        swiperPopular = makeSwiperPopular();
    });
};

function showPopularMovies(data) {
    POPULAR_FILM_LIST.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, id } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('popular-films-item', 'swiper-slide');
        movieEl.innerHTML = /*html*/`
            <div id="${id}">
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
        POPULAR_FILM_LIST.append(movieEl);
        setColorRaitingPopular();
        document.getElementById(id).addEventListener('click', (e) => {
            if (e.target.closest('li')) {
                openNav(movie);
            }
        });
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

function findMovies() {
    const url = `${BASE_URL}/search/movie?${API_KEY}&query=${searchQuery}&page=${currentPage}`;

    return fetch(url).then(res => res.json()).then(data => {
        console.log('find', data);
        showFoundMovies(data.results);
    });
}

function showFoundMovies(data) {
    LOOKING_MOVIES_LIST.innerHTML += '';

    data.forEach(movie => {
        const { title, poster_path, vote_average, id } = movie;
        const movieEl = document.createElement('li');
        movieEl.classList.add('looking-films-item');
        movieEl.innerHTML = /*html*/`
            <div id="${id}">
                <div class="looking-film-rating">
                    <div class="looking-film-rating-inner">
                        <h3 class="looking-film-rating-text">${vote_average}</h3>
                    </div>

                </div>

                <img src="${(poster_path != null) ? POSTER_URL + poster_path : 'https://via.placeholder.com/400x600'}" alt="${title}">

                <div class="looking-film-overview">
                    <h2>"${title}"</h2>
                </div>
            </div>
        `;
        LOOKING_MOVIES_LIST.append(movieEl);
        nextPageBtn.style.visibility = 'visible';

        setColorRaitingLooking();

        document.getElementById(id).addEventListener('click', (e) => {
            if (e.target.closest('li')) {
                openNav(movie);
            }
        });
    });
}

function setColorRaitingLooking() {
    const LOOKING_TITLE = document.querySelectorAll('.looking-film-rating-text');

    LOOKING_TITLE.forEach(e => {
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

function renderCategory(e) {
    try {
        if (e.target == popular) {
            selectedInput.style.transform = 'translateX(100%)';
            getPopularMovies(TOP_RAITED_URL);
        } else if (e.target == topWeek) {
            selectedInput.style.transform = 'translateX(0)';
            getPopularMovies(POPULAR_URL);
        }
    } catch (error) {
        console.log(error.name);
    }
}

// fetch('https://api.themoviedb.org/3/movie/616820/rating?api_key=bfdccbc25c964210432d186c297791bf', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ value: 8 }),
// }).then((response) => response.json())
//     .then((data) => {
//         console.log('Success:', { value: 8 });
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


function rateMovie(movieId) {
    const URL = BASE_URL + '/movie/' + movieId + '/rating?' + API_KEY;

    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rateValue),
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            confirm(`You Want Rate The Movie ${rateValue.value} points`);
            console.log('Success:', rateValue);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const pathColor = document.querySelectorAll('.path');

pathColor.forEach((path, i) => {
    path.addEventListener('click', () => {
        let currentStar = i + 1;
        rateValue.value = currentStar * 2;
        console.log('star', currentStar);
        pathColor.forEach((star, j) => {
            star.style.fill = (currentStar >= j + 1) ? 'red' : 'yellow';
            // if (currentStar >= j + 1) {
            //     star.style.fill = 'red';
            //     star.style.transition = '0.4s';
            // } else {
            //     star.style.fill = 'yellow';
            // }
        });
        rateMovie(movieId);
    });
});

// let token = getToken();

// async function getToken() {
//     return await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=bfdccbc25c964210432d186c297791bf').then((response) => response.json()).then((data) => {
//         token = data.request_token;
//         console.log(data);
//     });
// }

// requestToken(token);

// async function requestToken(token) {
//     let headers = {
//         "content-type": "application/json;charset=utf-8",
//         "authorization": `${token}`
//     };

//     let str = JSON.stringify(headers);
//     return await fetch('https://api.themoviedb.org/4/auth/access_token?api_key=bfdccbc25c964210432d186c297791bf', {
//         method: "POST",
//         headers: str,
//         body: {
//             "request_token": "eyJhbGciOiJsUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE0NzIwNzYxMjAsInZlcnNpb24iOjEsImV4cCI6MTQ3MjA3NzAyMCwiYdRkIjoiM2Y4Nzg1N2JlMjA5ZDM1MTk4MzNiMzAwYTEzZDBlMTIiSqJzY29wZXMiOlsicGVuZGluZ19yZXF1ZXN0X3Rva2VuIl0sImp0USI6MTB9.Rt-xi8wfscw2_P09T4BuxxUJtF7XReqKODh2HW61FIY"
//         }
//     }).then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//         });
// }