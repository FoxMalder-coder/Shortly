import { gsap } from "gsap";

const tl=gsap.timeline();

//Making sure that logo lands on the right spot after initial animation
const logoBoxPosition = ()=>{
    return {
        x: document.querySelector('.nav').getBoundingClientRect().x,
        y: document.querySelector('.nav__logo-box').getBoundingClientRect().y + window.scrollY
    }
}

const removeLogoAnimation=()=>{
    document.querySelector('.nav__logo').classList.remove('intro-animation');    
}

let logoBox = logoBoxPosition();

export const introDesktopAnimation = () => {
    tl.to('.nav__logo', { strokeDashoffset: 0, duration:6, animationFillMode:'forwards', animationTimingFunction:'linear'})        
        .to('.nav__logo', {fill:'black', duration: 1, strokeOpacity:0},'>-=3.7')     
        .to('.nav__logo', {top:logoBox.y, left:logoBox.x, x:0, y:0,scale:1, rotation:360,duration:1},'<+=0.8')        
        .call(removeLogoAnimation)
        .set('body',{overflowY:'visible', paddingRight:'0'})
        .from('.nav__item', {y: -120, rotate:'-15deg',duration: 0.7, stagger: 0.3},'<-=2.2')
        .from('.header__text-content',{x:400, scale:0.5, opacity:0, duration:0.8},'<+=1.7')
        .from('.header__image', {x: -400, scale: 0.5, opacity:0, duration:0.8},'<')
        .set('.header__image',{clearProps:'transform'},'<')
        .from('.form', {rotate: 90, x:600, display:'none', transformOrigin: 'right', duration: 1.35, ease:"bounce.out"},'<+=40%')   
}

export const introMobileAnimation = () => {
    tl.to('.nav__logo', { strokeDashoffset: 0, duration:6, animationFillMode:'forwards', animationTimingFunction:'linear'})        
        .to('.nav__logo', {fill:'black', duration: 1, strokeOpacity:0},'>-=3.7')     
        .to('.nav__logo', {top:logoBox.y, left:logoBox.x, x:0, y:0,scale:1, rotation:360,duration:1},'<+=0.8')  
        .from('.nav__mobile-icon', {opacity: 0 ,duration: 0.5},'>')
        .call(removeLogoAnimation)
        .set('body',{overflowY:'visible', paddingRight:'0'}, '<-=1.5')
        .from('.header__text-content',{x:400, scale:0.5, opacity:0, duration:0.8},'>')
        .from('.header__image', {x: -400, scale: 0.5, opacity:0, duration:0.8},'<')
        .set('.header__image',{clearProps:'transform'})
}

export const heroImgLoop = () => {
    gsap.to("#leaf-right", {rotation: 5, transformOrigin:'bottom', duration: 3, repeat: -1, yoyo:true, yoyoEase:"power4.inOut"})
    gsap.to("#leaf-left", {rotation: -9, transformOrigin:'bottom', duration: 5, repeat:-1, yoyo: true, });  
    
    const legsTl = gsap.timeline( {repeat: -1, repeatDelay:6} );
    const handsTl = gsap.timeline( {repeat: -1, repeatDelay:3} );

    legsTl.from("#leg-right", {rotation: -8, transformOrigin:'top left', duration: 0.2, repeat:4,  yoyo: true })
        .from("#leg-left", {rotation: 8, transformOrigin:'top left', duration: 0.2, repeat:3,  yoyo: true },'>+=1')
        
    handsTl.from("#hand-right", {rotation: 8, transformOrigin:'top left', duration: 0.2, repeat:1, repeatDelay:1,  yoyo: true })
            .from("#hand-left", {rotation: 3, transformOrigin:'top right', duration: 0.2, repeat:5, repeatDelay:0.1,  yoyo: true },'>+=1');
}