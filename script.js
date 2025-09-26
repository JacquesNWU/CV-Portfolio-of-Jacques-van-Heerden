/****************************************************************/
/* Jacques van Heerden (35317906) - Click Animation Function   */
/****************************************************************/
function createClickCircle(event) {
    const circle = document.createElement('div');
    circle.classList.add('click-circle');
    document.body.appendChild(circle);

    const x = event.clientX;
    const y = event.clientY;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    setTimeout(() => {
        circle.remove();
    }, 2000); // Match 2-second animation duration
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Add Click Animation to Elements */
/****************************************************************/
const interactiveElements = document.querySelectorAll('.btn, .nextprev-btn, .social-media a, .back-profile');
if (interactiveElements.length > 0) {
    interactiveElements.forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default actions if any
            createClickCircle(event);
        });
    });
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Page Turning on Click      */
/****************************************************************/
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
let isAnimating = false; // Prevent rapid clicks

if (pageTurnBtn.length > 0) {
    pageTurnBtn.forEach((el, index) => {
        el.onclick = () => {
            if (isAnimating) return; // Skip if animation is in progress
            isAnimating = true;
            setTimeout(() => { isAnimating = false; }, 600); // Match CSS transition duration

            const pageTurnId = el.getAttribute('data-page');
            const pageTurn = document.getElementById(pageTurnId);

            if (pageTurn.classList.contains('turn')) {
                pageTurn.classList.remove('turn');
                setTimeout(() => {
                    pageTurn.style.zIndex = 20 - index;
                }, 500);
            } else {
                pageTurn.classList.add('turn');
                setTimeout(() => {
                    pageTurn.style.zIndex = 20 + index;
                }, 500);
            }
        };
    });
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Contact Me Button Action   */
/****************************************************************/
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

if (contactMeBtn) {
    contactMeBtn.onclick = () => {
        if (isAnimating) return;
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, pages.length * 300 + 100);

        pages.forEach((page, index) => {
            setTimeout(() => {
                page.classList.add('turn');
                setTimeout(() => {
                    page.style.zIndex = 20 + index;
                }, 500);
            }, (index + 1) * 200 + 100);
        });
    };
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Reverse Index Function      */
/****************************************************************/
let totalPages = document.querySelectorAll('.book-page.page-right').length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Back to Profile Button      */
/****************************************************************/
const backProfileBtn = document.querySelector('.back-profile');

if (backProfileBtn) {
    backProfileBtn.onclick = () => {
        if (isAnimating) return;
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, pages.length * 300 + 100);

        pages.forEach((_, index) => {
            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].classList.remove('turn');
                setTimeout(() => {
                    reverseIndex();
                    pages[pageNumber].style.zIndex = 10 + index;
                }, 500);
            }, (index + 1) * 200 + 100);
        });
    };
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Opening Animations Setup    */
/****************************************************************/
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

/****************************************************************/
/* Jacques van Heerden (35317906) - Animate Cover Right        */
/****************************************************************/
if (coverRight) {
    setTimeout(() => {
        coverRight.classList.add('turn');
    }, 2100);

    setTimeout(() => {
        coverRight.style.zIndex = -1;
    }, 2800);
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Animate Left Profile Page  */
/****************************************************************/
if (pageLeft) {
    setTimeout(() => {
        pageLeft.style.zIndex = 20;
    }, 3200);
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Animate Right Pages Init   */
/****************************************************************/
if (pages.length > 0) {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');
            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500);
        }, (index + 1) * 200 + 2100);
    });
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Contact Form Submission    */
/****************************************************************/
const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default to allow custom handling if needed
        // Formspree will handle the submission due to action attribute
        contactForm.submit(); // Trigger the form submission to Formspree
    });
}
