export const swiperPopular = new Swiper(".popular-films", {
    spaceBetween: 30,
    slidesPerView: 5,
    mousewheel: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});