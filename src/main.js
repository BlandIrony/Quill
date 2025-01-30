import { Item } from "./scripts/items.js";
import { preloadImages } from "./scripts/utils.js";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import barba from '@barba/core'

const linksWrapper = document.querySelector('[data-item="links-wrapper"]')
const links = linksWrapper.getElementsByTagName('li')

gsap.registerPlugin(ScrollTrigger);

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

Array.from(links).forEach(link => {
  link.addEventListener('mouseover', () => {
    Array.from(links).forEach(li => {
      if(li === link) {
        li.style.color = '#151515'
      } else {
        li.style.color = '#a7a7a7'
      }
    })
  })

  link.addEventListener('mouseout', () => {
    Array.from(links).forEach(li => {
      li.style.color = '#151515'
    })
  })
})
