import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

const allCards = document.querySelectorAll('.statistics__card');

export const mobileScrollTriggers = ()=> {
    console.log('scroll');

    gsap.from('.form', {
        scrollTrigger: {
            trigger: '.form',
            start: 'center center'
        },
        rotate: 90, 
        opacity: 0, 
        x: -100, 
        display: 'none',
        transformOrigin: 'right', 
        duration: 1.35, 
        ease:"bounce.out"
    });  
    
    document.querySelectorAll('.links-container').forEach((link)=>{
        gsap.from(link, {
            scrollTrigger: {
                trigger:link,
                start: '-200px center'
                },
            transformOrigin: 'top',
            opacity: 0,
            duration: 1,
            y: 50,
            ease:"bounce.out"})
    });

    gsap.from('.heading-secondary--main', {
        scrollTrigger: {
            trigger: '.section-statistics',
            start: '-100px center'
        },
        opacity:0,
        x:50,
        duration: 1
        });

    
    gsap.from('.heading-secondary--sub', {
        scrollTrigger: {
            trigger: '.section-statistics',
             start: '-100px center'
        },
        opacity:0,
        x: -50,
        duration: 1
    });

    allCards.forEach((link)=>{
        gsap.from(link, {
            scrollTrigger: {
                trigger:link,
                start: '-200px center'
                },
            transformOrigin: 'top',
            opacity: 0,
            duration: 1,
            y: 80,
            ease:"bounce.out"})
    });

    gsap.from('.statistics__details',{
        scrollTrigger: {
            trigger: '.statistics__details',
            start: 'center center'
        },
            '--scaleY': '0%',
            duration:1,
            delay: 0.6
    }); 

    gsap.from('.section-cta, .footer', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: '-200px center'
        },
        rotateX:'-25deg',
        transformOrigin: 'top',
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out"
    });

    gsap.from('.footer__logo-box, .footer__list, .footer__icons-link', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top center'
        },
        opacity: 0,       
        duration: 2, 
        stagger: 0.15
    })
}

export const desktopScrollTriggers = ()=> {
    document.querySelectorAll('.links-container').forEach((link,i)=>{
        gsap.from(link, {
            scrollTrigger: {
                trigger:link,
                start: '-200px center'
                },
                        
            rotationX: '-90deg',
            transformOrigin: 'top',
            opacity: 0,
            duration: 1,
            ease:"bounce.out"})
    })

    gsap.from('.heading-secondary--main', {
        scrollTrigger: {
            trigger: '.section-statistics',
            start: '-100px center'
        },
        opacity:0,
        x:50,
        duration: 1
    });

        
    gsap.from('.heading-secondary--sub', {
        scrollTrigger: {
            trigger: '.section-statistics',
            start: '-100px center'
        },
        opacity:0,
        x: -50,
        duration: 1
    });

    gsap.from('.statistics__card', {  
        scrollTrigger: {
            trigger: '.statistics__card',
            start: 'top center'                        
        },                  
        opacity: 0,
        y: -130,
        rotate:'-3deg',
        duration: 0.7, 
        stagger: 0.2,                    
    })

    gsap.from('.statistics__details',{
         scrollTrigger: {
            trigger: '.statistics__details',
            start: '-100px center'
        },
             '--scaleX': '0%',
            duration:1,
            delay: 0.6
    }); 
    
    gsap.from('.section-cta', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top center'
        },
        rotateX:'-45deg',
        transformOrigin: 'top',
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out"
    })

    gsap.from('.footer__logo-box, .footer__list, .footer__icons-link', {
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top center'
        },
        opacity: 0,
        y: -100,
        rotate:'-7deg',
        duration: 0.5, 
        stagger: 0.15
    })
}