import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { mobileScrollTriggers, desktopScrollTriggers } from './gsapScrollTriggers';
import { introDesktopAnimation, introMobileAnimation, heroImgLoop } from './gsapAnimations';
import { linkHtml, linkContainer, spinner } from './views';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

const form = document.querySelector('.form');
const formLabel = document.querySelector('.form__label');
const sectionInput = document.querySelector('.section-input');
const sectionInputContainer = document.querySelector('.section-input .container');

const footerLogoBox = document.querySelector('.footer__logo-box');
const allLis = document.querySelectorAll('li a');
const allFooterIcons = document.querySelectorAll('.footer__icons-link');
const allHeroBtns = document.querySelectorAll('.btn--hero');

const sectionCta = document.querySelector('.section-cta');
const footer = document.querySelector('.footer');
const sectionStatistics = document.querySelector('.section-statistics');

const navList = document.querySelector('.nav__list');
const navRightSide = document.querySelector('.nav--right-side');
const headerHero = document.querySelector('.header__hero-section');
const navMobileMenu = document.querySelector('.nav__mobile-menu');

const screenWidth = window.innerWidth;

//IIFE that gets called only once, it gets data from the local storage and puts it into DOM
(function () {
    const data = JSON.parse(window.localStorage.getItem('linksData'));

    if (!data) return;
    
    data.forEach((el,i) => {
        form.insertAdjacentHTML('afterend', linkContainer(el,i));
    })        
})();

//Setting smooth scroll to top for all anchor elements and buttons which don't have any funcionality
footerLogoBox.addEventListener('click', () =>{     
    gsap.to(window, {scrollTo:0, duration:0.5})
});

[...allLis, ...allFooterIcons, ...allHeroBtns].forEach(el=>{
    el.addEventListener('click', e=>{   
        e.preventDefault();
        gsap.to(window, {scrollTo:0, duration:0.5})
    })
})

//Logic for deleting a single link
sectionInputContainer.addEventListener('click', async function(e) {
    //Event listener is set on the entire section input, if delete button wasn't pressed, function returns imidiatelly
    if(!e.target.closest('.link__delete-btn')) return;

    //Finding an index of a deleted element
    const delIndex = e.target.closest('.links-content').dataset.index;
    //Selecting deleted element in a DOM tree, for animating purposes
    const linksArray = Array.from(document.querySelectorAll('.links-container'));    
    const deletedLink = linksArray.find(link=>link.firstElementChild.dataset.index === delIndex);

    //Deleting animation - animating height and margin to 0
    //There was a little twitch when the last element was deleted, it was due to margin of a new last element
    //being set to 0 after deletion
    if(linksArray.indexOf(deletedLink) === linksArray.length - 1){
        const tl = gsap.timeline();
        await tl.to(deletedLink, {height: 0, margin:0, overflow:'hidden', duration: 0.4})
            .to(linksArray[linksArray.length - 2], {marginBottom: 0, duration: 0.4}, '<');
    }else {
        await gsap.to(deletedLink, {height: 0, margin:0, overflow:'hidden', duration: 0.4})
    }

    //Getting all data, removing all of the elements from a DOM tree, filtering data array
    const data = JSON.parse(window.localStorage.getItem('linksData'));

    document.querySelectorAll('.links-container').forEach(e=>e.remove())

    const newData = data.filter((_,i)=> i !== +delIndex);

    //Setting new data in local storage
    if(newData.length) window.localStorage.setItem('linksData', JSON.stringify(newData));    
    else window.localStorage.clear();  
    
    //Adding new data to DOM 
    newData.forEach((el,i) => {
        form.insertAdjacentHTML('afterend', linkContainer(el,i));
        document.querySelectorAll('.links-container').forEach(link=>link.classList.remove('intro-hide')); 
    })  

    //Refreshing scroll trigger, if elements were being deleted elements before all scroll animations had run
    //some subsequent animations didn't run, mostly section-cta and footer animations
    ScrollTrigger.refresh(true);
})

//Copy to clipboard logic, found on stack overflow
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const setLocalStorageData = result => {
    let data = JSON.parse(window.localStorage.getItem('linksData'));

    if (!data) data = [];
    
    window.localStorage.clear();

    const obj = {
        originalLink: result.original_link,
        shortLink: result.full_short_link
    }

    data.push(obj);
    window.localStorage.setItem('linksData', JSON.stringify(data));
    return data;
}

//Making sure there isn't error message label while making a new input
form.addEventListener('input', e => {
    e.preventDefault();
    form.classList.remove('form__error');
})

//Making a request for a short link
form.addEventListener('submit', async(e) => {
    e.preventDefault();

    //Error message in case there is no entry
    if (e.target[0].value === '') {
        form.classList.add('form__error');
        formLabel.innerHTML = `<i>Please add a link</i>`
        return;
    }
    
    //Loading spinner
    form.insertAdjacentHTML('afterend', spinner);

    const newLink = document.querySelector('.links-container');

    //Scrolling to new element
    gsap.to(window, {scrollTo: screenWidth <= 800 ? 1200 : 700, duration:0.5});

    //Animating new element's height
    //There was a subtle bug with inline styles, gsap sets height inside inline styles,
    //that's why newly added elements had their height declared inside of an inline style tag,
    //which had prevented change of height in case that screen size had changed.
    //That's why clearProps: 'height' was needed

    const tl = gsap.timeline();

    tl.from(newLink, {height:0, duration:0.4}) 
        .set(newLink, {clearProps:'height'}); 

    //Removing error message if there was one
    form.classList.remove('form__error');

    const url = `https://api.shrtco.de/v2/shorten?url=${e.target[0].value}`;

    e.target[0].value = '';

    //Fetch function for getting a short link
    //I usually use async/await, but I decided to use fetch API for practise purposes
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Please enter a valid URL');
            return res.json()
        })
        .then(res => {
            const data = setLocalStorageData(res.result);
            //Selecting first links-container and replacing spinner html with a new element html
            document.querySelector('.links-container').innerHTML =  linkHtml(res.result.original_link, res.result.full_short_link, data.length-1);
            
            //Removing classes, .intro-hide was there for animation purposes, .loader-1 remained after spinner html was removed
            document.querySelectorAll('.links-container').forEach(link=>link.classList.remove('intro-hide','loader-1')); 
            return res.result.full_short_link;
        })
        .catch(err => {
            //Displaying error message
            form.classList.add('form__error');
            formLabel.innerHTML = `<i>${err.message}</i>`;
            //Animating spinner's container height to 0 and removing it from a DOM tree
            const errorContainer = form.nextSibling.nextElementSibling;
            gsap.to(errorContainer, {height:0, margin:0, duration:0.4, overflow:'hidden'}).then((res)=>{
                sectionInputContainer.removeChild(errorContainer);
            });
        })        
});

//Copying to clipboard logic
sectionInput.addEventListener('click', e => {

    if (e.target.classList.contains('link__btn')) {
        e.preventDefault();

        //Making sure that none of copy buttons doesn't have .link__btn--copied class
        //and that they all display the same text
        document.querySelectorAll('.link__btn').forEach(btn => {
            btn.classList.remove('link__btn--copied');
            btn.innerText = 'Copy';
        })

        //Setting style and text content for a copied button
        e.target.classList.add('link__btn--copied');
        e.target.innerText = 'Copied!';
        //Copying a short link to clipboard
        const copiedLink = e.target.closest('.links-content').dataset.shortlink;
        copyToClipboard(copiedLink);
    }
})

//Open/close of mobile menu
document.querySelector('.nav__mobile-icon').addEventListener('click', ()=>{
    navMobileMenu.classList.toggle('show-mobile-menu');
})

//Closing mobile menu if user clickes outside of menu
window.addEventListener('click', e=>{
    if(e.target.closest('.nav__mobile-menu') || e.target.closest('.nav__mobile-icon')) return
    navMobileMenu.classList.remove('show-mobile-menu');
})

//Initial loading animation
window.addEventListener('load',()=>{    

    //Removing .intro-hide class from some elements and setting scroll trigger functions
    setTimeout(()=>{
        document.querySelectorAll('.links-container').forEach(link=>link.classList.remove('intro-hide'));         
        footer.classList.remove('intro-hide');  
        sectionStatistics.classList.remove('intro-hide');  
        sectionCta.classList.remove('intro-hide');         
        sectionInput.classList.remove('intro-hide');
                
        if(screenWidth<849) mobileScrollTriggers()
        else desktopScrollTriggers();
        
    }, 500)

    /* document.querySelectorAll('.links-container').forEach(link=>link.classList.remove('intro-hide'));         
        footer.classList.remove('intro-hide');  
        sectionStatistics.classList.remove('intro-hide');         
        sectionInput.classList.remove('intro-hide'); */
                

    //Scrolling to top of the page in case of refresh
    gsap.to(window, {scrollTo: {x:0, y:0}, duration:0.5});
    //Making sure there is no side bar and that there is no twitch 
    //when a side bar appears
    gsap.set('body',{overflowY:'hidden', maxWidth:'100vw', paddingRight:'17px'});
    
    navList.classList.remove('intro-hide');
    navRightSide.classList.remove('intro-hide');
    headerHero.classList.remove('intro-hide');  
        
    //Selecting intro animation based on a screen width
    if(screenWidth<849) introMobileAnimation() 
    else introDesktopAnimation()

    //Looping animation for a hero image
    heroImgLoop()
})

