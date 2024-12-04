// --- GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- PAPER TIGET SIGNATURE
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// --- CURRENT YEAR
const currentYear = document.querySelector('[current-year]');
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- LIGHT SECTIONS REVEAL
function lightSection() {
  const sections = document.querySelectorAll(".c-section[section-theme='light']");

  sections.forEach((section) => {
    const tl = gsap.timeline({ paused: true });

    gsap.set(section, { opacity: 0 });

    tl.to(section, {
      opacity: 1,
      ease: "power2.out",
      duration: 1.2,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onToggle: (self) => {
        if (self.isActive) {
          tl.play();
        } else {
          tl.reverse();
        }
      },
    });
  });
}

// --- HEADER BG
function headerBg() {
  const header = document.querySelector(".c-header");

  ScrollTrigger.create({
    trigger: "body",
    start: "100 top",
    onToggle: (self) => {
      if (self.isActive) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// --- HEADER VISIBILITY
function headerScrollVisibility() {
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const header = document.querySelector(".c-header");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      if (!header.classList.contains('not-visible')) {
        // Header
        header.classList.add('not-visible');
        gsap.to(header, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" });
      }
    } else {
      if (header.classList.contains('not-visible')) {
        // Header
        header.classList.remove('not-visible');
        gsap.to(header, { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" });
      }
    }

    lastScrollTop = scrollTop;
  });
}

// --- GLOBAL - FADE
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: "5em" });

  ScrollTrigger.batch(fadeElements, {
    once: true,
    start: "top 95%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
        stagger: 0.2,
        y: 0
      }),
  });
}

// --- TABBER
function tabber() {
  const panels = document.querySelectorAll(".c-img-contain.tab-visual");
  const tabs = document.querySelectorAll(".c-tab-item");
  const track = document.querySelector(".c-section.tab");

  if (panels.length === 0) return;

  ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      const panelIndex = Math.floor(progress * panels
        .length);

      panels.forEach((panel, index) => {
        if (index === panelIndex || (progress === 1 && index === panels.length - 1)) {
          panel.classList.add("is-active");
          tabs[index].classList.add("is-active");

        } else {
          panel.classList.remove("is-active");
          tabs[index].classList.remove("is-active");

        }
      });
    }
  });
}

function drawLine() {
  // Draw line
  gsap.set("[draw-line]", {
    opacity: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        markers: true,
      }),
  });
}

// --- ACCORDIONS
function accordions() {
  const accordions = document.querySelectorAll(".c-ac-item");
  let active = null;

  if (accordions.length === 0) return;

  accordions.forEach(accordion => {
    const question = accordion.querySelector(".c-ac-question");
    const response = accordion.querySelector(".c-ac-response");
    const arrow = accordion.querySelector(".c-icon.ac-arrow");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.inOut",
        duration: 0.5
      }
    });

    tl.to(response, { height: "auto" });
    tl.to(arrow, { rotation: 135 }, 0);

    accordion.tl = tl;

    question.addEventListener("click", function () {
      if (active === accordion) {
        tl.reverse();
        active = null;
      } else {
        if (active) active.tl.reverse();
        tl.play();
        active = accordion;
      }
    });
  });
}

// --- HEADER MOBILE
function headerMobile() {
  let header = document.querySelector(".c-header");
  let headerBtn = document.querySelector(".c-nav-btn");
  let headerNav = document.querySelector(".c-header-nav");
  let menuLine1 = document.querySelectorAll(".c-nav-bar.is-1");
  let menuLine2 = document.querySelectorAll(".c-nav-bar.is-2");
  let menuLine3 = document.querySelectorAll(".c-nav-bar.is-3");

  let tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut", duration: 1 } });

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.to(headerNav, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(menuLine1, { rotation: 45, y: 5 }, 0);
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -5, width: 24 }, 0);

  headerBtn.addEventListener("click", function () {
    header.classList.toggle("is-open");
    if (header.classList.contains("is-open")) {
      lenis.stop();
      tl.restart();
    } else {
      lenis.start();
      tl.reverse();
    }
  });
}

// --- FADE PAGE LOAD
function simpleLoader() {
  let tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.4, delay: 0.1 },
  });

  tl.to(".o-wrapper", { autoAlpha: 1 });
}

function homeCtaPin() {
  const section = document.querySelector(".c-hero-cta-wrap");
  const buttonsWrap = document.querySelector(".c-btn-wrap.hm-hero");
  const heroScrollTxt = document.querySelector(".c-hero-scroll");

  if (!section || !buttonsWrap) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom center",
    pin: true,
    onLeave: () => {
      gsap.to([buttonsWrap, heroScrollTxt], { autoAlpha: 0 });
    },
    onEnterBack: () => {
      gsap.to([buttonsWrap, heroScrollTxt], { autoAlpha: 1 });
    }
  });
}

// --- PARALLAX
function parallax() {
  let parallaxEl = document.querySelectorAll("[parallax]");

  parallaxEl.forEach(item => {
    let parallaxY = parseFloat(item.getAttribute("data-parallax-y")) || 0;
    let screenWidth = window.innerWidth;

    if (item.getAttribute("parallax") !== "mobile-false" || screenWidth > 991) {
      let tl = gsap.timeline({
        defaults: { ease: "none" }
      });

      tl.to(item, {
        yPercent: parallaxY,
        scrollTrigger: {
          trigger: item,
          start: "clamp(top bottom)",
          end: "clamp(bottom center)",
          scrub: 1,
        }
      });
    }
  });
}

function footerAnimation() {
  const footer = document.querySelector(".c-section.footer");
  const circle = document.querySelector(".c-img-contain.footer-bg");

  gsap.set(circle, { y: "75em" });

  ScrollTrigger.create({
    trigger: footer,
    start: "top center",
    // markers: true,
    onEnter: () => {
      gsap.to(circle, { y: "32.25em", duration: 2, ease: "expo.out" });
    }
  });
}

// function homeHeroVideo() {
//   const video = document.querySelector(".c-video.hm-hero");
//   console.log(video);

//   ScrollTrigger.create({
//     trigger: video,
//     start: "center 80%",
//     end: "bottom top",
//     onEnter: () => {
//       video.play();
//     },
//     onLeaveBack: () => {
//       if (video.ended) {
//         video.play();
//       }
//     },
//   });
// }

function homeHeroVideo() {
  const video = document.querySelector(".c-video.hm-hero");

  if (video) {
    // Log video progress as percentage
    video.addEventListener("timeupdate", () => {
      const percentage = ((video.currentTime / video.duration) * 100).toFixed(2);

      // Stop video at 95%
      if (percentage >= 95) {
        video.pause();
        video.currentTime = video.duration * 0.95;
      }
    });
  }

  ScrollTrigger.create({
    trigger: video,
    start: "center 80%",
    end: "bottom top",
    onEnter: () => {
      video.play();
    },
    onLeaveBack: () => {
      const percentage = ((video.currentTime / video.duration) * 100).toFixed(2);
      if (percentage >= 95) {
        video.currentTime = 0;
        video.play();
      }
    },
  });
}

const homepage = document.querySelector("[data-page='home']");

// --- INIT
function init() {
  headerBg();
  tabber();
  headerScrollVisibility();
  accordions();
  simpleLoader();
  if (homepage) {
    homeHeroVideo();
  }
}

init();

const headerFinalLocation = document.querySelector(".c-header-nav");
const headerInitialLocation = document.querySelector(".c-header-inner");
const headerBtnWrap = document.querySelector(".c-header_rt");

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  lightSection();
  fade();
  drawLine();
  homeCtaPin();
  parallax();
  footerAnimation();
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerMobile();
  headerFinalLocation.appendChild(headerBtnWrap);
  gsap.set(headerBtnWrap, { display: "block" });
  return () => {
    headerInitialLocation.appendChild(headerBtnWrap);
  };
});
