export function makeSwiperPopular() {
    return new Swiper(".popular-films", {
        spaceBetween: 10,
        slidesPerView: 5,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 4,
            },
            // when window width is >= 960px
            960: {
                slidesPerView: 5,
            }
        }
    });
}