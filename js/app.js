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

let toggledMenu = false;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function addClassToElemList(elemList, className) {
    for (let elem of elemList) {
        addClassToElem(elem, className);
    }
}

function addClassToElem(elem, className) {
    if (elem && !elem.classList.contains(className)) {
        elem.classList.add(className);
    }
}

function removeClassFromElemList(elemList, className) {
    for (let elem of elemList) {
        removeClassFromElem(elem, className);
    }
}

function removeClassFromElem(elem, className) {
    if (elem && elem.classList.contains(className)) {
        elem.classList.remove(className);
    }
}

function generateSections(numOfSections) {
    const mainElem = document.getElementById('main');
    let templateElemStr = '';
    for (let i = 0; i < numOfSections; i++) {
        const newSection = `<section id="section${i + 1}" data-nav="Section ${i + 1}">
                                <div class="landing__container">
                                    <h2>Section ${i + 1}</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
                                    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
                                </div>
                            </section>`;
        templateElemStr = `${templateElemStr}${newSection}`;
    }
    mainElem.insertAdjacentHTML("beforeend", templateElemStr);
}

function getAllSectionsFromHtml() {
    return document.getElementsByTagName('section');
}

function toggleMenu() {
    toggledMenu = !toggledMenu;
    const toggleMenuItem = document.getElementById('menu__toggle__btn');
    const menuItems = document.getElementsByClassName('menu__item');
    if (toggledMenu) {
        addClassToElem(toggleMenuItem, 'fa-times');
        removeClassFromElem(toggleMenuItem, 'fa-bars');
        addClassToElemList(menuItems, 'visible');
    } else {
        addClassToElem(toggleMenuItem, 'fa-bars');
        removeClassFromElem(toggleMenuItem, 'fa-times');
        removeClassFromElemList(menuItems, 'visible');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function initNav() {
    const navHtmlItems = [];
    const navHtmlFragment = document.createDocumentFragment();
    const sectionsHtml = getAllSectionsFromHtml();
    for (let sectionHtml of sectionsHtml) {
        // Fill up menu items
        const navHtmlItem = document.createElement('a');
        navHtmlItem.setAttribute('href', '#');
        navHtmlItem.onclick = scrollTo;
        navHtmlItem.innerText = sectionHtml.getAttribute('data-nav');
        navHtmlItem.id = `nav__${sectionHtml.getAttribute('id')}`;
        navHtmlItems.push(navHtmlItem);
        const navHtmlItemWrapper = document.createElement('li');
        navHtmlItemWrapper.classList.add('menu__item');
        navHtmlFragment.appendChild(navHtmlItemWrapper).appendChild(navHtmlItem);
    }
    // Append menu items
    document.getElementById('navbar__list').appendChild(navHtmlFragment);
}

// Add class 'active' to section when near top of viewport
function setSectionActive() {
    const sectionsHtml = getAllSectionsFromHtml();
    for (let sectionHtml of sectionsHtml) {
        const id = sectionHtml.getAttribute('id');
        const navElem = document.getElementById(`nav__${id}`);
        const sectionElem = document.getElementById(id);
        const headerElemHeight = document.getElementById('page__header').getBoundingClientRect().height;
        if (sectionElem.getBoundingClientRect().top <= headerElemHeight && sectionElem.getBoundingClientRect().top > -sectionElem.getBoundingClientRect().height + headerElemHeight) {
            addClassToElem(sectionElem, 'active-section');
            addClassToElem(navElem, 'active-nav');
        } else {
            removeClassFromElem(sectionElem, 'active-section');
            removeClassFromElem(navElem, 'active-nav');
        }
    }
}

// Generate a predefined number of section
generateSections(6);

/**
 * End Main Functions
 * Begin Events
 *
 */

// Use setTimeout to avoid "[Violation] Forced reflow while executing JavaScript" warning in console
setTimeout(function () {
    // Build menu
    initNav();
    // Set section on active on page load
    setSectionActive();
}, 0);

// Scroll to section on click
function scrollTo(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('id').replace('nav__', '');
    const elem = document.getElementById(targetId);
    elem.scrollIntoView({block: 'start', behavior: 'smooth'});
    if (toggledMenu) {
        toggleMenu();
    }
}

// Set section on active on scroll
window.addEventListener('scroll', setSectionActive);
// Set section on active on screen resize
window.addEventListener('resize', setSectionActive);
