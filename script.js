/****************************************************************/
/* Jacques van Heerden (35317906) - Responsive Detection       */
/****************************************************************/
const isMobile = () => window.innerWidth <= 768;

/****************************************************************/
/* Jacques van Heerden (35317906) - Prevent Initial Flash      */
/****************************************************************/
// Hide desktop elements immediately on mobile
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', () => {
        const cover = document.querySelectorAll('.cover');
        cover.forEach(el => el.style.display = 'none');
    });
}

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
        // On mobile, do nothing - pages are already visible in scroll view
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
        // On mobile, do nothing - user can scroll naturally
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
    if (isMobile()) {
        // On mobile, ensure everything is visible and properly laid out
        const pages = document.querySelectorAll('.book-page.page-right');
        pages.forEach(page => {
            page.classList.remove('turn');
            page.style.zIndex = 'auto';
        });
        return;
    }

    const coverRight = document.querySelector('.cover.cover-right');
    const pageLeft = document.querySelector('.book-page.page-left');
    const pages = document.querySelectorAll('.book-page.page-right');

    // Open the cover
    setTimeout(() => {
        if (coverRight) coverRight.classList.add('turn');
    }, 2100);

    setTimeout(() => {
        if (coverRight) coverRight.style.zIndex = -1;
    }, 2800);

    setTimeout(() => {
        if (pageLeft) pageLeft.style.zIndex = 20;
    }, 3200);

    // Close all pages one by one (same as back-to-profile animation)
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDesktopAnimations);
} else {
    initDesktopAnimations();
}

/****************************************************************/
/* Jacques van Heerden (35317906) - Handle Window Resize       */
/****************************************************************/
let resizeTimer;
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const currentWidth = window.innerWidth;
        const wasDesktop = lastWidth > 768;
        const isNowDesktop = currentWidth > 768;
        
        // Only reinitialize if switching between mobile and desktop
        if (wasDesktop !== isNowDesktop) {
            if (isNowDesktop) {
                // Switching to desktop - reload to get proper animation
                location.reload();
            } else {
                // Switching to mobile - reset all transforms
                const pages = document.querySelectorAll('.book-page.page-right');
                pages.forEach(page => {
                    page.classList.remove('turn');
                    page.style.zIndex = 'auto';
                });
            }
        }
        lastWidth = currentWidth;
    }, 250);
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
