// // pagination.ts

//     document.addEventListener('DOMContentLoaded', function() {
//         const prevButton = document.querySelector('[aria-label="Précédente"]') as HTMLButtonElement;
//         const nextButton = document.querySelector('[aria-label="Suivante"]') as HTMLButtonElement;
//         const pageInput = document.querySelector('[aria-label="Page actuelle 1"]') as HTMLInputElement;

//         if (!prevButton || !nextButton || !pageInput) {
//             console.error("One or more required elements are missing.");
//             return;
//         }

//         paginate(1);

//         prevButton.addEventListener('click', function() {
//             const currentPage = parseInt(pageInput.value);
//             if (currentPage > 1) {
//                 paginate(currentPage - 1);
//             }
//         });

//         nextButton.addEventListener('click', function() {
//             const currentPage = parseInt(pageInput.value);
//             const totalPages = parseInt(pageInput.getAttribute('max') || '1');
//             if (currentPage < totalPages) {
//                 paginate(currentPage + 1);
//             }
//         });

//         function paginate(page: number): void {
//             const itemsPerPage = 10;
//             const cargaisons = document.querySelectorAll('#cargaisonList tr') as NodeListOf<HTMLTableRowElement>;

//             const startIndex = (page - 1) * itemsPerPage;
//             const endIndex = startIndex + itemsPerPage;

//             cargaisons.forEach((cargaison, index) => {
//                 if (index >= startIndex && index < endIndex) {
//                     cargaison.style.display = 'table-row';
//                 } else {
//                     cargaison.style.display = 'none';
//                 }
//             });

//             pageInput.value = page.toString();

//             updateButtons(page, Math.ceil(cargaisons.length / itemsPerPage));
//         }

//         function updateButtons(currentPage: number, totalPages: number): void {
//             prevButton.disabled = currentPage <= 1;
//             nextButton.disabled = currentPage >= totalPages;
//             pageInput.setAttribute('max', totalPages.toString());
//         }
//     });