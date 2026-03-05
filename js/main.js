const nav = document.querySelector('.site-nav');
const hero = document.querySelector('.hero');
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

const body = document.body;
const sectionAnchors = document.querySelectorAll('a[href^="#"]');

let lastScrollY = window.scrollY;
let tickingScroll = false;

const setNavState = (scrollY) => {
  nav.classList.toggle('scrolled', scrollY > 80);

  if (scrollY < 10) {
    nav.classList.remove('nav-hidden');
    return;
  }

  if (scrollY > 200 && scrollY > lastScrollY) {
    nav.classList.add('nav-hidden');
  } else if (scrollY < lastScrollY) {
    nav.classList.remove('nav-hidden');
  }
};

const setHeroParallax = (scrollY) => {
  const maxRange = hero.offsetHeight;
  if (scrollY <= maxRange) {
    const shift = scrollY * 0.4;
    hero.style.backgroundPosition = `center calc(40% + ${shift}px)`;
  }
};

const projectItems = document.querySelectorAll('.project-item');
const projectImgs = document.querySelectorAll('.project-img');

const setProjectParallax = () => {
  projectImgs.forEach((img) => {
    const item = img.closest('.project-item');
    const rect = item.getBoundingClientRect();
    const winH = window.innerHeight;
    if (rect.bottom < 0 || rect.top > winH) return;
    const progress = (rect.top - winH) / (winH + rect.height);
    const shift = progress * winH * 0.28;
    const scale = item.dataset.hovered === '1' ? 1.04 : 1;
    img.style.transform = `translateY(${shift}px) scale(${scale})`;
  });
};

projectItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.dataset.hovered = '1';
    setProjectParallax();
  });

  item.addEventListener('mouseleave', () => {
    delete item.dataset.hovered;
    setProjectParallax();
  });
});

const onScroll = () => {
  const scrollY = window.scrollY;
  setNavState(scrollY);
  setHeroParallax(scrollY);
  setProjectParallax();
  lastScrollY = scrollY;
  tickingScroll = false;
};

window.addEventListener('scroll', () => {
  if (!tickingScroll) {
    window.requestAnimationFrame(onScroll);
    tickingScroll = true;
  }
});

const openMobileMenu = () => {
  mobileMenu.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
};

const closeMobileMenu = () => {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
};

menuToggle.addEventListener('click', openMobileMenu);
menuClose.addEventListener('click', closeMobileMenu);
mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

sectionAnchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    const navHeight = nav.getBoundingClientRect().height;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
  });
});

const revealGroups = document.querySelectorAll('[data-reveal-group]');
const standaloneReveals = document.querySelectorAll('.reveal:not([data-reveal])');

revealGroups.forEach((group) => {
  const children = group.querySelectorAll('[data-reveal]');
  children.forEach((child, index) => {
    child.classList.add('reveal');
    child.style.setProperty('--delay', `${index * 100}ms`);

    if (group.closest('.manifesto')) {
      child.style.transform = 'translateY(30px)';
    }
  });
});

standaloneReveals.forEach((item, index) => {
  item.style.setProperty('--delay', `${(index % 3) * 100}ms`);
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('is-visible');
        observer.unobserve(target);
      }
    });
  },
  {
    threshold: 0.3
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');
const pointerFine = window.matchMedia('(pointer: fine)').matches;
const desktopWidth = window.innerWidth > 768;

if (pointerFine && desktopWidth) {
  body.classList.add('custom-cursor-enabled');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outerX = mouseX;
  let outerY = mouseY;

  const renderCursor = () => {
    outerX += (mouseX - outerX) * 0.2;
    outerY += (mouseY - outerY) * 0.2;

    cursorOuter.style.left = `${outerX}px`;
    cursorOuter.style.top = `${outerY}px`;
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;

    window.requestAnimationFrame(renderCursor);
  };

  renderCursor();

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const projectCards = document.querySelectorAll('.project-item');
  const interactive = document.querySelectorAll('a, button');

  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('hover-project');
    });
    card.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('hover-project');
    });
  });

  interactive.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('hover-link');
    });
    node.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('hover-link');
    });
  });
}

const cards = Array.from(document.querySelectorAll('.project-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImgA = document.querySelector('.lightbox-image.lb-a');
const lightboxImgB = document.querySelector('.lightbox-image.lb-b');
const lightboxCounter = document.querySelector('.lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentGallery = [];
let currentAlt = '';
let currentIndex = 0;
let transitioning = false;
let exitTimerId = null;
let transitionToken = 0;
const preloadCache = new Set();
const preloadPromises = new Map();

const preloadImage = (src) => {
  if (!src) return Promise.resolve();
  if (preloadPromises.has(src)) return preloadPromises.get(src);

  const promise = new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const done = () => {
      if (settled) return;
      settled = true;
      preloadCache.add(src);
      resolve();
    };

    img.decoding = 'async';
    img.onload = done;
    img.onerror = done;
    img.src = src;

    if (img.complete) done();
  });

  preloadPromises.set(src, promise);
  return promise;
};

const preloadGallery = (images, limit = images.length) => {
  images.slice(0, limit).forEach((src) => {
    void preloadImage(src);
  });
};

const parseGallery = (card) => {
  let parsedGallery = [];
  try {
    parsedGallery = JSON.parse(card.dataset.gallery || '[]');
  } catch (_) {
    parsedGallery = [];
  }

  if (!Array.isArray(parsedGallery) || parsedGallery.length === 0) {
    const fallbackSrc = card.querySelector('.project-img')?.getAttribute('src');
    parsedGallery = fallbackSrc ? [fallbackSrc] : [];
  }

  return parsedGallery;
};

const updateCounter = () => {
  if (currentGallery.length <= 1) {
    lightboxCounter.style.display = 'none';
    lightboxCounter.textContent = '';
    return;
  }

  lightboxCounter.style.display = 'block';
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
};

const getActiveImage = () => {
  if (lightboxImgA.classList.contains('active')) return lightboxImgA;
  if (lightboxImgB.classList.contains('active')) return lightboxImgB;
  return lightboxImgA;
};

const renderLightbox = (index, direction) => {
  if (!currentGallery.length) return;

  const nextSrc = currentGallery[index];
  const currentToken = ++transitionToken;

  if (exitTimerId) {
    clearTimeout(exitTimerId);
    exitTimerId = null;
  }

  if (direction === 'initial') {
    transitioning = false;

    [lightboxImgA, lightboxImgB].forEach((img) => {
      img.style.transition = 'none';
      img.classList.remove('active', 'exit');
      img.src = '';
      img.alt = '';
    });

    lightboxImgA.src = nextSrc;
    lightboxImgA.alt = currentAlt;
    lightboxImgA.classList.add('active');

    requestAnimationFrame(() => {
      lightboxImgA.style.transition = '';
      lightboxImgB.style.transition = '';
    });

    updateCounter();
    return;
  }

  if (transitioning) return;
  transitioning = true;
  void preloadImage(nextSrc).then(() => {
    if (currentToken !== transitionToken || !lightbox.classList.contains('open')) {
      transitioning = false;
      return;
    }

    const activeImage = getActiveImage();
    const inactiveImage = activeImage === lightboxImgA ? lightboxImgB : lightboxImgA;

    activeImage.classList.remove('active');
    activeImage.classList.add('exit');

    inactiveImage.classList.remove('exit', 'active');
    inactiveImage.src = nextSrc;
    inactiveImage.alt = currentAlt;

    requestAnimationFrame(() => {
      inactiveImage.classList.add('active');
      updateCounter();
    });

    exitTimerId = window.setTimeout(() => {
      activeImage.classList.remove('exit');
      activeImage.src = '';
      activeImage.alt = '';
      transitioning = false;
      exitTimerId = null;
    }, 520);
  });
};

const openLightbox = (card) => {
  currentGallery = parseGallery(card);
  currentAlt = card.querySelector('.project-img')?.getAttribute('alt') || 'Project image';
  currentIndex = 0;
  preloadGallery(currentGallery);
  renderLightbox(currentIndex, 'initial');

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  transitionToken += 1;
  if (exitTimerId) {
    clearTimeout(exitTimerId);
    exitTimerId = null;
  }
  transitioning = false;
  currentGallery = [];
  currentIndex = 0;

  [lightboxImgA, lightboxImgB].forEach((img) => {
    img.classList.remove('active', 'exit');
    img.src = '';
    img.alt = '';
    img.style.transition = '';
  });
  lightboxImgA.classList.add('active');
  updateCounter();

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
};

const showNext = () => {
  if (!currentGallery.length || transitioning || currentGallery.length === 1) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  renderLightbox(currentIndex, 'next');
};

const showPrev = () => {
  if (!currentGallery.length || transitioning || currentGallery.length === 1) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  renderLightbox(currentIndex, 'prev');
};

cards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(card));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNext);
lightboxPrev.addEventListener('click', showPrev);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    showNext();
  }

  if (event.key === 'ArrowLeft') {
    showPrev();
  }
});

cards.forEach((item) => {
  const primeGallery = () => {
    preloadGallery(parseGallery(item), 8);
  };

  item.addEventListener('mouseenter', primeGallery);
  item.addEventListener('focusin', primeGallery);
  item.addEventListener('touchstart', primeGallery, { passive: true });
});

const initServicesAccordion = () => {
  const accordion = document.querySelector('.services-accordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.service-item'));
  if (!items.length) return;

  const closeItem = (item) => {
    const trigger = item.querySelector('.service-trigger');
    const panel = item.querySelector('.service-panel');
    if (!trigger || !panel) return;

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.maxHeight = '0px';
    panel.style.opacity = '0';
  };

  const openItem = (item) => {
    const trigger = item.querySelector('.service-trigger');
    const panel = item.querySelector('.service-panel');
    if (!trigger || !panel) return;

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    panel.style.opacity = '1';
  };

  items.forEach((item) => {
    closeItem(item);

    const trigger = item.querySelector('.service-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((otherItem) => {
        if (otherItem !== item) closeItem(otherItem);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  openItem(items[0]);

  window.addEventListener('resize', () => {
    const openPanelItem = accordion.querySelector('.service-item.is-open');
    if (!openPanelItem) return;
    const openPanel = openPanelItem.querySelector('.service-panel');
    if (!openPanel) return;
    openPanel.style.maxHeight = `${openPanel.scrollHeight}px`;
  });
};

initServicesAccordion();
onScroll();
setProjectParallax();
