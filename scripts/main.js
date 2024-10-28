let icon1 = document.getElementById('icon1');
let icon2 = document.getElementById('icon2');
let icon3 = document.getElementById('icon3');
let icon4 = document.getElementById('icon4');
let icon5 = document.getElementById('icon5');

window.addEventListener('scroll', ()=>{
    let value = window.scrollY;
    icon2.style.left = value * 2.5 + 'px';
    icon3.style.left = value * -2.5 + 'px';
    icon4.style.left = value * 2.5 + 'px';
    icon5.style.left = value * -2.5 + 'px';
})