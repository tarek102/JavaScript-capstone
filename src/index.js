import _ from 'lodash';
import './style.css';
import Api from './modules/api';



// Variables

const url = 'https://api.tvmaze.com/shows';
const moviesList = document.querySelector('.movies-list');

const api = new Api(url);




// Displaying 9 elements from the Api

window.addEventListener('DOMContentLoaded', async() => {
  const list = await api.getData(url);
  console.log(list);

  for (let i = 0; i < 9; i++) {
    console.log(list[i]);
    const movieBox = document.createElement('div');
    movieBox.classList.add('col-4');
    movieBox.classList.add('movie-box');
    movieBox.innerHTML = `
      <div class="">
      <img src="${list[i].image.medium}">
      </div>
      <div class="show-info">
        <h4>${list[i].name}</h4>
        <div>
          <span class="like"></span>
          <span class="likes-number">5 likes</span>
        </div>
      </div>
      <button class="comments">Comments</button>
    `;
    moviesList.appendChild(movieBox)
  }
})

// movieList.forEach(movie => {
  
// });

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

