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
const sections = [];
let offsetTopStart = 0;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function addClassToElem(elem, className) {
    if (!elem.classList.contains(className)) {
        elem.classList.add(className);
    }
}

function removeClassFromElem(elem, className) {
    if (elem.classList.contains(className)) {
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


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function initNav() {
    const navHtmlItems = [];
    const sectionsHtml = document.getElementsByTagName('section');
    const navHtml = document.getElementById('navbar__list');
    const navHtmlFragment = document.createDocumentFragment();
    for (let sectionHtml of sectionsHtml) {
        // Create section list with all params
        const section = {
            id: sectionHtml.getAttribute('id'),
            title: sectionHtml.getAttribute('data-nav'),
            position: sectionHtml.getBoundingClientRect()
        };
        sections.push(section);

        // Create menu
        const navHtmlItem = document.createElement('span');
        navHtmlItem.onclick = scrollTo;
        navHtmlItem.innerText = section.title;
        navHtmlItem.id = `nav__${section.id}`;
        navHtmlItems.push(navHtmlItem);
        navHtmlFragment.appendChild(document.createElement('li')).appendChild(navHtmlItem);
    }
    navHtml.appendChild(navHtmlFragment);
}

// Add class 'active' to section when near top of viewport
function setSectionActive() {
    // Get current scroll position of the page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add hysteresis for different screens sizes to make the selection of the active section smoother
    let hysteresis = 0;
    if (window.innerWidth >= 800) {
        hysteresis = 500;
    } else {
        hysteresis = 100;
    }

    // Check which section is hit by current scrollTop
    for (let section of sections) {
        const navElem = document.getElementById(`nav__${section.id}`);
        const sectionElem = document.getElementById(section.id);
        const sectionOffset = offsetTopStart + section.position.top;
        if (scrollTop + hysteresis >= sectionOffset && scrollTop + hysteresis < sectionOffset + section.position.height) {
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
// Build menu
initNav();

// Set section on active on page load
setTimeout(function () {
    offsetTopStart = window.pageYOffset || document.documentElement.scrollTop;
    setSectionActive();
}, 0);

// Scroll to section on click
function scrollTo(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('id').replace('nav__', '');
    const elem = document.getElementById(targetId);
    elem.scrollIntoView({left: 0, block: 'start', behavior: 'smooth'});
}

// Set section on active
window.addEventListener('scroll', setSectionActive);


