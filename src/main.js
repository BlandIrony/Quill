// Libraries
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import barba from '@barba/core'

// Other imports
import { Item } from "./scripts/items.js";
import { preloadImages } from "./scripts/utils.js";
import { products } from "./scripts/db.js";

// Declarations
const navigation = document.querySelector('nav')
const linksWrapper = document.querySelector('[data-item="links-wrapper"]')
const links = linksWrapper.getElementsByTagName('li')
const anchors = document.querySelectorAll('[data-item="link"]')
const gallery = document.querySelector('.gallery')

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

export default class Initialize {
  constructor () {
    this.init()
    this.hoverAnimation()
  }

  init () {
    const tl = gsap.timeline()

    tl.set('.exit', {
      zIndex: 30,
      top: 'unset',
      bottom: 0
    })
    .to('.exit', {
      height: window.innerHeight,
      duration: 1.25,
      ease: 'expo.inOut'
    })
    .set('.exit', { top: 0, bottom: 'unset' })
    .from('.exit-span', {
      yPercent: 100,
      duration: 1,
      skewY: 5,
      stagger: {
        amount: 0.1
      },
      ease: 'power2.out'
    }, '-=.5')
    .to('.exit-span', {
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to('.exit', {
      height: 0,
      duration: 1.5,
      ease: 'expo.inOut'
    }, '-=1')
    .to(navigation, {
      y: '0',
      duration: .75,
      ease: 'power2.inOut'
    }, '-=.75')
    .to('[data-item="link"]', {
      y: 0,
      duration: 1.75,
      ease: 'expo.inOut',
      // delay: 0.045 * i
      stagger: 0.04
    }, '-=.5')

    // gsap.utils.toArray('[data-item="link"]').forEach((el, i) => {
    // })
  }

  hoverAnimation () {
    // Links animation and associated animations
    Array.from(links).forEach((link, index) => {
      link.addEventListener('mouseover', () => {
        this.showImages(index)
        Array.from(links).forEach(li => {
          if(li === link) {
            li.style.color = 'var(--color-black)'
            li.style.fontStyle = 'italic'
          } else {
            li.style.color = 'var(--color-gray)'
          }
        })
      })
      
      link.addEventListener('mouseout', () => {
        this.removeImages()
        Array.from(links).forEach(li => {
          li.style.color = 'var(--color-black)'
          li.style.fontStyle = 'unset'
        })
      })
    })
  }

  showImages (elemIndex) {

    for (let index = 0; index <= 2; index++) {
      // Create outer container
      const outer = document.createElement('div')
      outer.style.gridArea = `${products[elemIndex][`rc${index + 1}`][0]}/${products[elemIndex][`rc${index + 1}`][1]}`
      
      // Create image wrapper
      const imageWrapper = document.createElement('div')
      imageWrapper.style.width = '100%'
      imageWrapper.style.height = '100%'
      imageWrapper.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'

      // Create Image div
      const image = document.createElement('div')
      image.style.width = '100%'
      image.style.height = '100%'
      image.style.background = `url('${products[elemIndex].imageURLs[index]}')`
      image.style.backgroundPosition = 'center'
      image.style.backgroundSize = 'cover'
      image.style.backgroundRepeat = 'no-repeat'

      // Append Image to wrapper
      imageWrapper.appendChild(image)

      // Append wrapper to Outer Container
      outer.appendChild(imageWrapper)

      // Splay image on grid container
      gallery.appendChild(outer)
      
      const tl = gsap.timeline()

      // Animate Images
      tl.addLabel('start', 0)
      .to(imageWrapper, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        duration: .75,
        ease: 'power3.out',
        delay: 0.15 * index
      })
      .fromTo(image, { scaleX: 1.12, scaleY: 1.15 }, { scale: 1, duration: .25, ease: 'power2.inOut' }, 'start-=.5')

      console.log(`${products[elemIndex].imageURLs[index]}`);
    }

  }

  removeImages() {
    const images = gallery.children;
  
    // Animate out each image before removing it
    Array.from(images).forEach((imageWrapper, index) => {
      gsap.to(imageWrapper.firstChild, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        duration: 0.25,
        ease: 'power3.in',
        onComplete: () => {
          imageWrapper.remove(); // Remove from DOM after animation
        }
      });
    });
  }
  
}

new Initialize()