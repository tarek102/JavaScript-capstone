import _ from 'lodash';
import './style.css';

const btnComments = document.querySelectorAll('.comments');
const popup = document.querySelector('.popup');
const close = document.querySelector('.closeBtn');

btnComments.forEach(btn => {
  btn.addEventListener('click', () => {
    popup.classList.remove('visible');
    console.log("clicked");
  });
});

close.addEventListener('click', ()=> {
  
})



// document.body.appendChild(component());