/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let listFragment = new DocumentFragment();
const DOCUMENT_ELE = document.documentElement;
const NAVIGATION_MENU = document.getElementById('navbar__list');
const PAGE_SECTIONS = document.querySelectorAll('section');
const BACK_TO_TOP = document.querySelector('.scroll__top');
let scrollingTimer = null;


/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Add margin to main element based on header height
function addMarginToMain() {
    const NAV_HEIGHT = NAVIGATION_MENU.clientHeight;
    const CONTENT_MAIN = document.querySelector('main');
    CONTENT_MAIN.style.marginTop = NAV_HEIGHT + 'px';
}

// Check if section in viewport
function checkIfInViewPort(section) {
    const NAV_HEIGHT = NAVIGATION_MENU.clientHeight;
    let currentBounding = section.getBoundingClientRect();
    if (currentBounding.top >= -NAV_HEIGHT) {
        return true;
    }
}

// Hide nav when user isn't scrolling and user isn't in top of the page
function hideNav(scrollingState) {
    if (scrollingState == 'stoppedScrolling') {
        if (document.body.scrollTop != 0 || DOCUMENT_ELE.scrollTop != 0) {
            NAVIGATION_MENU.style.display = 'none';
        }
    } else if (scrollingState == 'scrolling') {
        NAVIGATION_MENU.style.display = 'flex';
    }

}

// Set active list item once clicked
function activeListItem(listItem) {
    const NAV_ITEM = NAVIGATION_MENU.querySelectorAll('li a');
    for (const ITEM of NAV_ITEM) {
        if (ITEM == listItem) {
            ITEM.classList.add('active');
        } else {
            ITEM.classList.remove('active');
        }
    }
}

// Set active list item while scrolling
function scrollingActiveListItem() {
    const ACTIVE_SECTION = document.querySelector('section.active-section');
    const SECTION_TITLE = ACTIVE_SECTION.getAttribute('data-nav');
    const NAV_ITEM = NAVIGATION_MENU.querySelectorAll('li a');
    for (const ITEM of NAV_ITEM) {
        if (ITEM.textContent == SECTION_TITLE) {
            ITEM.classList.add('active');
        } else {
            ITEM.classList.remove('active');
        }
    }
}

// Scroll to top function for top button
function scrollToTop() {
    DOCUMENT_ELE.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide back to top button when near top
function hideBackToTop() {
    if (document.body.scrollTop > 20 || DOCUMENT_ELE.scrollTop > 20) {
        BACK_TO_TOP.style.display = 'block';
    } else {
        BACK_TO_TOP.style.display = 'none';
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildTheNav() {
    for (const SECTION of PAGE_SECTIONS) {
        const MENU_ITEM = document.createElement('li');
        const ITEM_LINK = document.createElement('a');
        const SECTION_ID = SECTION.id;
        const SECTION_TITLE = SECTION.getAttribute('data-nav');
        const LINK_TEXT = document.createTextNode(SECTION_TITLE);
        ITEM_LINK.appendChild(LINK_TEXT);
        ITEM_LINK.href = '#' + SECTION_ID;
        MENU_ITEM.appendChild(ITEM_LINK);
        listFragment.appendChild(MENU_ITEM);
    }
}

// Add 'active' class to section when near top of viewport
function viewportActiveSection() {
    for (const SECTION of PAGE_SECTIONS) {
        if (checkIfInViewPort(SECTION)) {
            SECTION.classList.add('active-section');
        } else {
            SECTION.classList.remove('active-section');
            SECTION.removeAttribute('class');
        }
    }
}

// Scroll to section using ID with scrollIntoView method
function scrollToSection(element) {
    if (element && element.matches('li a')) {
        let sectionId = element.getAttribute('href');
        let targetSection = document.querySelector(sectionId);
        activeListItem(element);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu, add margins, and check which section is active after page reload
window.addEventListener(
    'DOMContentLoaded',
    function () {
        buildTheNav();
        NAVIGATION_MENU.appendChild(listFragment);
        addMarginToMain();
        scrollingActiveListItem();
    },
    false
)

// Scroll to section on link click
NAVIGATION_MENU.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(e.target);
})

// Set sections as active, hide nav when user stops scrolling and back to top button
window.addEventListener(
    'scroll',
    function (e) {
        e.preventDefault();
        if (scrollingTimer !== null) {
            viewportActiveSection();
            scrollingActiveListItem();
            hideNav('scrolling');
            hideBackToTop();
        }
        scrollingTimer = setTimeout(function () {
            hideNav('stoppedScrolling');
        }, 10000);
    },
    false
)

// Scroll to top when back to top button clicked
BACK_TO_TOP.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToTop();
})
