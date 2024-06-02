// cardPagination.ts


    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;
        let currentPage = 1;
        const itemsPerPage = 10;

        function showPage(page: number): void {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            cards.forEach((card, index) => {
                if (index >= startIndex && index < endIndex) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            currentPage = page;
            updateButtons();
        }

        function updateButtons(): void {
            const prevButton = document.querySelector('[onclick="prevSlide()"]') as HTMLButtonElement;
            const nextButton = document.querySelector('[onclick="nextSlide()"]') as HTMLButtonElement;
            prevButton.disabled = currentPage <= 1;
            nextButton.disabled = currentPage >= Math.ceil(cards.length / itemsPerPage);
        }

        (window as any).prevSlide = function() {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        };

        (window as any).nextSlide = function() {
            if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
                showPage(currentPage + 1);
            }
        };

        showPage(1);
    });