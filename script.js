function createClickCircle(event) {
    const circle = document.createElement('div');
    circle.classList.add('click-circle');
    document.body.appendChild(circle);

    const x = event.clientX;
    const y = event.clientY;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    setTimeout(() => circle.remove(), 1500);
}

const interactiveElements = document.querySelectorAll('.btn, .nextprev-btn, .social-media a, .back-profile');
interactiveElements.forEach(el => {
    el.addEventListener('click', (event) => {
        createClickCircle(event);
    });
});

const pageTurnBtn = document.querySelectorAll('.nextprev-btn');
let isAnimating = false;

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        if (isAnimating) return;
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 700);

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

const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

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

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

const backProfileBtn = document.querySelector('.back-profile');

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

// Contact form submission
const contactFormBtn = document.querySelector('.contact-box .btn');
contactFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('.contact-box input[type="text"]').value;
    const email = document.querySelector('.contact-box input[type="email"]').value;
    const message = document.querySelector('.contact-box textarea').value;

    if (name && email && message) {
        alert('Message sent successfully!'); // Placeholder for actual form submission
        document.querySelector('.contact-box input[type="text"]').value = '';
        document.querySelector('.contact-box input[type="email"]').value = '';
        document.querySelector('.contact-box textarea').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});
