const total_slides = document.querySelectorAll('.slide').length; 
const slides = document.querySelector('.slides');

let index = 0; 


function slide_navigation() {
    slides.style.marginLeft = `-${index * 700}px`;
    index++;
    if (index >= total_slides) {
        index = 0; 
    }
}

setInterval(slide_navigation, 2000);
