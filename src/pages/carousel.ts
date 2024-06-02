// carousel.ts

    document.addEventListener("DOMContentLoaded", () => {
        const slides = document.querySelectorAll('.carousel-slide') as NodeListOf<HTMLElement>;
        let currentSlide = 0;

        if (slides.length > 0) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                slides[currentSlide].classList.add('left');

                currentSlide = (currentSlide + 1) % slides.length;

                slides[currentSlide].classList.remove('inactive', 'scale-left', 'scale-right');
                slides[currentSlide].classList.add('active');

                const previousSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
                slides[previousSlide].classList.add('inactive');

                const nextSlide = (currentSlide + 1) % slides.length;
                slides[nextSlide].classList.add('inactive');

                const scaleLeftSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
                if (slides[scaleLeftSlide]) {
                    slides[scaleLeftSlide].classList.add('scale-left');
                }

                const scaleRightSlide = (currentSlide + 1) % slides.length;
                slides[scaleRightSlide].classList.add('scale-right');
            }, 3000); // Change slide every 3 seconds
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const slides = document.querySelectorAll('.carousele-slid') as NodeListOf<HTMLElement>;
        let currentSlide = 0;

        if (slides.length > 0) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                slides[currentSlide].classList.add('left');

                currentSlide = (currentSlide + 1) % slides.length;

                slides[currentSlide].classList.remove('inactive', 'scale-left', 'scale-right');
                slides[currentSlide].classList.add('active');

                const previousSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
                slides[previousSlide].classList.add('inactive');

                const nextSlide = (currentSlide + 1) % slides.length;
                slides[nextSlide].classList.add('inactive');

                const scaleLeftSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
                if (slides[scaleLeftSlide]) {
                    slides[scaleLeftSlide].classList.add('scale-left');
                }

                const scaleRightSlide = (currentSlide + 1) % slides.length;
                slides[scaleRightSlide].classList.add('scale-right');
            }, 3000); // Change slide every 3 seconds
        }
    });
