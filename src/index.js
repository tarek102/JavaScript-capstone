import _ from 'lodash';
import './style.css';
import Api from './modules/api';
//import pic from '../src/img/movie-time-cinema-logo.png';



// Variables
const logo = document.querySelector('.logo');
const url = 'https://api.tvmaze.com/shows';
const moviesList = document.querySelector('.movies-list');

const api = new Api(url);
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QfxZoPPt8C2jqpp5GvRx/likes';
const apiInv = new Api(involvementApiUrl);






// Displaying 9 elements from the Api

window.addEventListener('DOMContentLoaded', async() => {
  const list = await api.getData(url);
  const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);
  console.log(apiInvList);

  apiInv.postDataInvolvement(involvementApiUrl, 2, 3);
  // console.log(list);
  for (let i = 0; i < 9; i++) {
    
    // add like to invApi



    // console.log(list[i]);
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
        <i class="material-icons">favorite</i>
          <span class="likes-number">${apiInvList[0].likes} likes</span>
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




// close.addEventListener('click', ()=> {
  
// })

moviesList.addEventListener('click', (e) => {
  let counter = 0;
  if (e.target.classList.contains("comments")) {
  popup.classList.remove('visible');
  };

  if (e.target.classList.contains('material-icons')) {
    
    counter++;
    console.log(counter);
    // const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);
    
  }
});



// Add likes to invApi

