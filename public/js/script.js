let totalSlides = document.querySelectorAll('.slider--item').length;
let sliderWidth = document.querySelector('.slider').clientWidth;
let currentSlide = 0;

const body = document.querySelector('body')
const buttonEnter = document.querySelector('.button-enter')
const buttonCloseModal = document.querySelector('.modal-login-home-close')
const backgroundModalHome = document.querySelector('.modal-login-home')
const modalHome = document.querySelector('.modal-login-home-content-close')

document.querySelector('.slider--width').style.width = 
    `${sliderWidth * totalSlides}px`;

document.querySelector('.slider--controls').style.width = 
    `${sliderWidth}px`;
document.querySelector('.slider--controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`;

function goPrev() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateMargin();
}
function goNext() {
    currentSlide++;
    if(currentSlide > (totalSlides-1)) {
        currentSlide = 0;
    }
    updateMargin();
}

function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = 
        `-${newMargin}px`;
}

setInterval(goNext, 5000);

buttonEnter.addEventListener('click', item => openModal(item))
modalHome.addEventListener('click', closeModal)
buttonCloseModal.addEventListener('click', closeModal)

function openModal(item) {
  item.preventDefault();
  body.style.overflow = 'hidden'
  backgroundModalHome.style.display = 'flex'
  setTimeout( ()=>{
    backgroundModalHome.style.opacity = 1
}, 400);
}
function closeModal() {
  body.style.overflow = 'auto'
  backgroundModalHome.style.opacity = 0
  setTimeout( ()=>{
    backgroundModalHome.style.display = 'none'
}, 400);
}