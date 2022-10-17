export const swiperPopular = new Swiper(".popular-films", {
    spaceBetween: 30,
    slidesPerView: 5,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});