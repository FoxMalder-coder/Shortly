# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

https://ibb.co/5YQhbvq

### Links

- Solution URL: [GitHub](https://github.com/miroslavdurin/Shortly/tree/main)
- Live Site URL: [Live Site on Netlify](https://shortly-mdurin.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- SCSS modules and mixins
- Flexbox
- GSAP
- Parcel
- Fetch API and async/await

### What I learned

I've learned a lot in this project. It started as a simple project at first, but I came up with some interesting ideas. Even though they seemed daunting at first, after some time I managed to put them all to life.

The biggest challenge was to put all gsap animations to work smoothly. Even though it seemed simple at first, there were quite some challenges that emerged. Most of the challenges came from trying to make things responsive on all devices.

I've created 2 sets of animations, one for a desktop, and the other one for screens smaller then 850px. Probably the toughest challenge was to overcome the fact that mobile devices don't take {overflow: hidden} into account if it is set on a body or html tag. I realized that after I uploaded the site on Netlify.

I have also added a delete button which appears from the right side on big devices, and is set on the top right corner on smaller devices.

What I'm mostly proud of is that site is running smoothly without any noticable major bug. There might be some issues which I'll tackle later.

What I'm not most proud of is code quality. I have a feeling that the code could have some improvements, even though I've put lots of comments, mainly in js files.

### Continued development

There is a subttle bug with initial animation. In case that screen gets resized during a logo fill, it will probably land on a wrong spot, that's because it uses getBoundingClientRect() function to get x and y coordinates, which is being read at the initial load. I'll probably write resize event listener function to fix that.

I also feel that the script.js code is a little bit "spaghetti", I will try to implement MVC architecture soon.

### Useful resources

- [Udemy - Jonas Schmedtmann course](https://www.udemy.com/course/advanced-css-and-sass/) - This is a course that thought me most of what I know about HTML and CSS/SCSS.

- [Udemy - Jonas Schmedtmann course](https://www.udemy.com/course/the-complete-javascript-course/) - This is one of courses which thought me most of what I know about JS.

- [Udemy - Colt Steele and Stephen Grider course](https://www.udemy.com/course/javascript-beginners-complete-tutorial/) - Another JS course that was very usefull in developing my JS skills, I've learned some NodeJs here as well.

- [DevEd's course](https://developedbyed.com/p/the-ultimate-javascript-animation-course) - This is a course I've bought that thought me most of GSAP animations, especially how to animate svg's.

- [Net Ninja YouTube channel](https://www.youtube.com/c/TheNetNinja) - Great YouTube channel with a lot of interesting content.

- [DevEd YouTube channel](https://www.youtube.com/c/DevEd) - Another great YouTube channel with lots of frontend dev content.

- [WrongAkram YouTube channel](https://www.youtube.com/c/WrongAkram) - This YouTube channel has a little bit more advanced content, mostly using React along with GSAP or Framer Motion libraries.

## Author

- Website - [My GitHub Page](https://github.com/miroslavdurin)
- Frontend Mentor - [https://www.frontendmentor.io/profile/miroslavdurin]

