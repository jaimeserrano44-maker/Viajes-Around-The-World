console.log('Main.js loaded');

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    hover: true // disable smooth scroll on hover elements? No, usually fine.
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate GSAP with Lenis handles? 
// Not strictly necessary for basic usage unless pinning is heavy, but good practice to sync if needed.
// For now, standard RAF loop is enough.

// 2. Initial Page Load Animation
const tl = gsap.timeline();

// Reveal Body
tl.to("body", {
    duration: 0.5,
    autoAlpha: 1
})
    // Hero Title Stagger
    .to(".hero-title .line", {
        y: "0%",
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.2")
    // Hero Subtitle & Indicator
    .to(".hero-subtitle, .hero-scroll-indicator", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");


// 3. Scroll Animations

// Hero Image Parallax (Background moves slower than scroll)
gsap.to(".hero-bg", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    yPercent: 30, // Move image down slightly while scrolling
    scale: 1, // Optional: zoom out effect
    ease: "none"
});

// Intro Text Reveal
gsap.from(".intro-heading", {
    scrollTrigger: {
        trigger: ".intro",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1
    },
    opacity: 0.5,
    y: 50,
    duration: 1
});

// Destination Cards Stagger
const cards = document.querySelectorAll(".destination-card");
if (cards.length > 0) {
    gsap.from(cards, {
        scrollTrigger: {
            trigger: ".destinations",
            start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2, // 0.2s delay between each card
        ease: "power3.out"
    });
}

// Parallax Quote Background
gsap.to(".parallax-bg", {
    scrollTrigger: {
        trigger: ".quote-parallax",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    yPercent: -20, // Move background up
    ease: "none"
});

// Navbar Color Change on Scroll (Optional polish)
// Change nav text color when passing light/dark sections?
// For now, keep it simple mix-blend-mode or fixed.
