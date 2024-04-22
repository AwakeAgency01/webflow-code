function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

gsap.registerPlugin(DrawSVGPlugin);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer_logo_wrapper",
    start: "top 70%", // Animation starts when the top of ".footer_logo" hits the center of the viewport
    toggleActions: "play none none none", // Defines what happens when scrolling forward and backward
  },
  ease: "power2.inOut",
  drawSVG: 0,
  stagger: 0.1,
});
tl.from(
  ".footer_logo line, circle",
  {
    duration: 0.8,
  },
  0
);
tl.from(
  ".footer_logo path",
  {
    duration: 1,
  },
  1
);

function animNumber(e, t, o) {
  var a = t,
    n = e,
    l = !1;
  function i() {
    a.prop("Counter", 0).animate(
      { Counter: n },
      {
        duration: n > 50 ? 600 : 900,
        easing: "swing",
        step: function (e) {
          var t;
          (t = e < 10 ? e.toFixed(0) : parseInt(e).toLocaleString("en")),
            a.text(t + (e <= 20 ? "" : ""));
        },
        complete: function () {},
      }
    );
  }
  function r(e) {
    var t = e.getBoundingClientRect();
    return (
      t.top >= 0 &&
      t.left >= 0 &&
      t.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      t.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  $(window).scroll(function () {
    r(a[0]) && !l && (i(), (l = !0));
  }),
    r(a[0]) && (i(), (l = !0));
}

animNumber(10, $("#animNum1"), "");
animNumber(100, $("#animNum2"), "");

const osLinesAnimation = document.querySelectorAll(".os_logo path");
const ollieLinesAnimation = document.querySelectorAll(".ollie_icon path");

osLinesAnimation.forEach((element) => {
  iconAnimation(element, 0.6);
});

ollieLinesAnimation.forEach((element) => {
  iconAnimation(element, 0.4);
});
function iconAnimation(element, duration) {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%", // Animation starts when the top of ".footer_logo" hits the center of the viewport
      toggleActions: "play none none none",
    },
    duration: duration,
    drawSVG: 0,
    ease: "power3.inOut",
    stagger: 1,
  });
}

function createScrollTrigger(triggerElement, timeline) {
  ScrollTrigger.refresh();
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top bottom",
  });
  // Play tl when scrolled into view (60% from top of screen)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: "top 80%",
    onEnter: () => timeline.play(),
  });
}
function headingAnimation(heading) {
  let typeSplit = new SplitType(heading, {
    types: "words, chars",
    tagName: "span",
  });
  $(".heading-style-h1").css("opacity", 1);
  $(heading).each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 120,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.out",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger($(this), tl);
  });
}
function animatePage() {
  headingAnimation("[words-slide-up]");

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  gsap.to(".nav_component", {
    y: "0",
    opacity: 1,
    duration: 1,
    ease: "power2.out",
  });
}

function desktopScripts() {
  var userAgent = navigator.userAgent.toLowerCase();
  var isMobileOrTablet =
    /iphone|ipod|android|ie|blackberry|fennec|tablet|ipad|playbook|silk/.test(
      userAgent
    );
  var isMobileScreen = window.matchMedia("(max-width: 991px)").matches;
  if (isMobileOrTablet && isMobileScreen) {
    console.log("Detected mobile/tablet device. Scripts will not be loaded.");
  } else {
    $(".footer_logo_mask").click(() => {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1500,
        "easeInOutSine"
      );
    });

    $("[data-btn='container']").each(function () {
      let durationSetting;
      durationSetting = 0.5;

      const clipEl = $(this)
        .find("[data-btn='clip']")
        .attr("aria-hidden", "true");

      const easeSetting = "power1.inOut";

      function getPercentTop(el, e) {
        let elTop = el.offset().top - $(window).scrollTop();
        let mouseTop = e.pageY - $(window).scrollTop() - elTop;
        return (mouseTop / el.innerHeight()) * 100;
      }
      function getPercentLeft(el, e) {
        let elLeft = el.offset().left;
        let mouseLeft = e.pageX - elLeft;
        return (mouseLeft / el.innerWidth()) * 100;
      }
      $(this).on("mouseenter", function (e) {
        let percentTop = getPercentTop($(this), e);
        let percentLeft = getPercentLeft($(this), e);
        gsap.set(clipEl, { display: "flex" });
        gsap.fromTo(
          clipEl,
          { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
          {
            clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
            duration: durationSetting,
            ease: easeSetting,
          }
        );
      });
      $(this).on("mouseleave", function (e) {
        let percentTop = getPercentTop($(this), e);
        let percentLeft = getPercentLeft($(this), e);
        gsap.to(clipEl, {
          clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
          overwrite: true,
          duration: durationSetting,
          ease: easeSetting,
        });
      });
    });
    $("[data-btn='container']").each(function () {
      let durationSetting;
      durationSetting = 0.5;

      const clipEl = $(this)
        .find("[data-btn='clip']")
        .attr("aria-hidden", "true");

      const easeSetting = "power1.inOut";

      function getPercentTop(el, e) {
        let elTop = el.offset().top - $(window).scrollTop();
        let mouseTop = e.pageY - $(window).scrollTop() - elTop;
        return (mouseTop / el.innerHeight()) * 100;
      }
      function getPercentLeft(el, e) {
        let elLeft = el.offset().left;
        let mouseLeft = e.pageX - elLeft;
        return (mouseLeft / el.innerWidth()) * 100;
      }
      $(this).on("mouseenter", function (e) {
        let percentTop = getPercentTop($(this), e);
        let percentLeft = getPercentLeft($(this), e);
        gsap.set(clipEl, { display: "flex" });
        gsap.fromTo(
          clipEl,
          { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
          {
            clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
            duration: durationSetting,
            ease: easeSetting,
          }
        );
      });
      $(this).on("mouseleave", function (e) {
        let percentTop = getPercentTop($(this), e);
        let percentLeft = getPercentLeft($(this), e);
        gsap.to(clipEl, {
          clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
          overwrite: true,
          duration: durationSetting,
          ease: easeSetting,
        });
      });
    });
  }
}

window.onload = desktopScripts;

function disableScroll() {
  document.addEventListener("touchmove", preventDefault, { passive: false });
  document.addEventListener("wheel", preventDefault, { passive: false });
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.removeEventListener("touchmove", preventDefault);
  document.removeEventListener("wheel", preventDefault);
  document.body.style.overflow = "auto";
}

function preventDefault(e) {
  e.preventDefault();
}

$(window).on("resize", function () {
  enableScroll();
}),
  $(".menu_open").click(function () {
    disableScroll();
    gsap.fromTo(
      ".nav_menu_link",
      {
        y: "3rem",
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "power3.inOut",
      },
      {
        y: "0rem",
        opacity: 1,
        stagger: 0.1,
        duration: 0.3,
        ease: "power3.inOut",
      }
    );
  });
$(".menu_close").click(function () {
  enableScroll();
  gsap.to(".nav_menu_link", {
    y: "3rem",
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
    ease: "power3.inOut",
  });
});
