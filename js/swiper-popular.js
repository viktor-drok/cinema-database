export const swiperPopular = new Swiper(".popular-films", {
    spaceBetween: 10,
    slidesPerView: 5,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});