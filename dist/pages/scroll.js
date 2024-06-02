"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    let currentPage = 1;
    const itemsPerPage = 10;
    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        cards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            }
            else {
                card.style.display = 'none';
            }
        });
        currentPage = page;
        updateButtons();
    }
    function updateButtons() {
        const prevButton = document.querySelector('[onclick="prevSlide()"]');
        const nextButton = document.querySelector('[onclick="nextSlide()"]');
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= Math.ceil(cards.length / itemsPerPage);
    }
    window.prevSlide = function () {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    };
    window.nextSlide = function () {
        if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
            showPage(currentPage + 1);
        }
    };
    showPage(1);
});
