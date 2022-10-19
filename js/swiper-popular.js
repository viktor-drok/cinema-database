export function makeSwiperPopular() {
    return new Swiper(".popular-films", {
        spaceBetween: 10,
        slidesPerView: 5,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
    });
}