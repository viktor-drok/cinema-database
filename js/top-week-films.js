export const topWeekFilms = new Swiper(".top-week-films", {
    spaceBetween: 30,
    slidesPerView: 5,
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});