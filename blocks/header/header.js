import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.innerHTML = '';
  block.classList.add('vida-header-wrapper');
  block.classList.add('header-nav-page');

  const headerWrapper =  block;

  const headerContainer = document.createElement('div');
  headerContainer.className = 'vida-header-container';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'vida-logo-container';

  const logoLink = document.createElement('a');
  logoLink.href = '/';

  const logoImg = document.createElement('img');
  logoImg.src = '../../icons/vida_white_logo_croped.png';
  logoImg.alt = 'vida logo';

  const headerTitleContainer = document.createElement('div');
  headerTitleContainer.className = 'vida-header-title-container';

  const headerTitleFlexContainer = document.createElement('div');
  headerTitleFlexContainer.className = 'vida-header-title-flex-container';

  const backIconContainer = document.createElement('div');
  backIconContainer.className = 'vida-header-back-icon';

  const backIconLink = document.createElement('a');
  backIconLink.href = '#';
  backIconLink.target = '_self';
  backIconLink.rel = 'noreferrer';

  const backIconImg = document.createElement('img');
  backIconImg.src = '/content/dam/vida2-0/global/icons/desktop/left_arrow_icon.svg';
  backIconImg.alt = 'vida_header_back_icon';

  const headerTitle = document.createElement('div');
  headerTitle.className = 'vida-header-title';

  const headerH1 = document.createElement('h1');
  headerH1.textContent = 'Locate a Fast Charger';

  const navbarContainer = document.createElement('div');
  navbarContainer.className = 'vida-navbar-container';

  // Helper function to create navbar options
  function createNavbarOption(href, imgSrc, imgAlt, text) {
    const navbarOption = document.createElement('div');
    navbarOption.className = 'vida-navbar-option';

    const navbarOptionIcon = document.createElement('div');
    navbarOptionIcon.className = 'vida-navbar-option-icon';

    const navbarOptionLink = document.createElement('a');
    navbarOptionLink.className = 'vida-navbar-option-link';
    navbarOptionLink.href = href;
    navbarOptionLink.target = '_self';
    navbarOptionLink.rel = 'noreferrer';

    const navbarOptionImg = document.createElement('img');
    navbarOptionImg.className = 'vida-navbar-option-img';
    navbarOptionImg.src = imgSrc;
    navbarOptionImg.alt = imgAlt;

    const navbarOptionText = document.createElement('p');
    const navbarOptionTextLink = document.createElement('a');
    navbarOptionTextLink.href = href;
    navbarOptionTextLink.target = '_self';
    navbarOptionTextLink.rel = 'noreferrer';
    navbarOptionTextLink.className = 'vida-navbar-option-text';
    navbarOptionTextLink.textContent = text;

    navbarOptionIcon.appendChild(navbarOptionLink);
    navbarOptionLink.appendChild(navbarOptionImg);
    navbarOptionText.appendChild(navbarOptionTextLink);
    navbarOption.appendChild(navbarOptionIcon);
    navbarOption.appendChild(navbarOptionText);

    return navbarOption;
  }

  const exploreOption = createNavbarOption('https://www.vidaworld.com/products.html', '../../icons/explore_white_icon.svg', 'vida_navbar_option', 'Explore');
  const tryOption = createNavbarOption('https://www.vidaworld.com/test-ride.html', '../../icons/try_white_icon.svg', 'vida_navbar_option', 'Try');
  const buyOption = createNavbarOption('https://www.vidaworld.com/reserve.html', '../../icons/buy_white_icon.svg', 'vida_navbar_option', 'Buy');
  const loveOption = createNavbarOption('https://www.vidaworld.com/love.html', '../../icons/love_white_icon.svg', 'vida_navbar_option', 'Love');

  const hamburgerContainer = document.createElement('div');
  hamburgerContainer.className = 'vida-hamburger-container';

  const hamburgerLine1 = document.createElement('div');
  hamburgerLine1.className = 'vida-hamburger-line';

  const hamburgerLine2 = document.createElement('div');
  hamburgerLine2.className = 'vida-hamburger-line';

  const hamburgerLine3 = document.createElement('div');
  hamburgerLine3.className = 'vida-hamburger-line';

  // Assembling elements
  logoLink.appendChild(logoImg);
  logoContainer.appendChild(logoLink);

  backIconLink.appendChild(backIconImg);
  backIconContainer.appendChild(backIconLink);

  headerTitle.appendChild(headerH1);

  headerTitleFlexContainer.appendChild(backIconContainer);
  headerTitleFlexContainer.appendChild(headerTitle);

  headerTitleContainer.appendChild(headerTitleFlexContainer);

  navbarContainer.appendChild(exploreOption);
  navbarContainer.appendChild(tryOption);
  navbarContainer.appendChild(buyOption);
  navbarContainer.appendChild(loveOption);

  hamburgerContainer.appendChild(hamburgerLine1);
  hamburgerContainer.appendChild(hamburgerLine2);
  hamburgerContainer.appendChild(hamburgerLine3);

  navbarContainer.appendChild(hamburgerContainer);

  headerContainer.appendChild(logoContainer);
  headerContainer.appendChild(headerTitleContainer);
  headerContainer.appendChild(navbarContainer);

  headerWrapper.appendChild(headerContainer);
}
