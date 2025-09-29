/****************************************************************/
/* Jacques van Heerden (35317906) - Responsive Detection       */
/****************************************************************/
const isMobile = () => window.innerWidth <= 768;

/****************************************************************/
/* Jacques van Heerden (35317906) - Click/Touch Animation      */
/****************************************************************/
function createClickCircle(event) {
    // Only show on desktop
    if (isMobile()) return;
    
    const circle = document.createElement('div');
    circle.classList.add('click-circle');
    document.body.appendChild(circle);

    const x = event.clientX || (event.touches && event.touches[0].clientX);
    const y = event.clientY || (event.touches && event.touches[0].clientY);

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    setTimeout(() => {
        circle.remove();
    }, 2000);
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Add Animation to Elements  */
/****************************************************************/
const interactiveElements = document.querySelectorAll('.btn, .nextprev-btn, .social-media a, .back-profile');
interactiveElements.forEach(el => {
    // Support both click and touch events
    el.addEventListener('click', (event) => {
        createClickCircle(event);
    });
    
    el.addEventListener('touchstart', (event) => {
        createClickCircle(event);
    }, { passive: true });
});

/****************************************************************/
/* Jacques van Heerden (35317906) - Page Turning on Click      */
/****************************************************************/
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
let isAnimating = false;

pageTurnBtn.forEach((el, index) => {
    const handlePageTurn = () => {
        if (isAnimating || isMobile()) return;
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 600);

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

    el.onclick = handlePageTurn;
    el.ontouchstart = (e) => {
        e.preventDefault();
        handlePageTurn();
    };
});

/****************************************************************/
/* Jacques van Heerden (35317906) - Contact Me Button Action   */
/****************************************************************/
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

const handleContactMe = () => {
    if (isMobile()) {
        // On mobile, just scroll to contact section
        const contactSection = document.getElementById('turn-3');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
    }

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

contactMeBtn.onclick = handleContactMe;
contactMeBtn.ontouchstart = (e) => {
    e.preventDefault();
    handleContactMe();
};

/****************************************************************/
/* Jacques van Heerden (35317906) - Reverse Index Function      */
/****************************************************************/
let totalPages = pages.length;
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

const handleBackProfile = () => {
    if (isMobile()) {
        // On mobile, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

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

if (backProfileBtn) {
    backProfileBtn.onclick = handleBackProfile;
    backProfileBtn.ontouchstart = (e) => {
        e.preventDefault();
        handleBackProfile();
    };
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Desktop Opening Animations */
/****************************************************************/
function initDesktopAnimations() {
    if (isMobile()) return;

    const coverRight = document.querySelector('.cover.cover-right');
    const pageLeft = document.querySelector('.book-page.page-left');

    setTimeout(() => {
        coverRight.classList.add('turn');
    }, 2100);

    setTimeout(() => {
        coverRight.style.zIndex = -1;
    }, 2800);

    setTimeout(() => {
        pageLeft.style.zIndex = 20;
    }, 3200);

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

// Initialize animations on load
initDesktopAnimations();

/****************************************************************/
/* Jacques van Heerden (35317906) - Handle Window Resize       */
/****************************************************************/
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset animations if switching between mobile and desktop
        if (!isMobile()) {
            initDesktopAnimations();
        }
    }, 250);
});

/****************************************************************/
/* Jacques van Heerden (35317906) - Smooth Scroll for Links    */
/****************************************************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#profile' && href.startsWith('#turn')) {
            if (isMobile()) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    });
});

/****************************************************************/
/* Jacques van Heerden (35317906) - Prevent Zoom on iOS        */
/****************************************************************/
document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
