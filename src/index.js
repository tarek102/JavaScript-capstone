import _, { get } from 'lodash';
import './style.css';
import Api from './modules/api';



// Variables
const logo = document.querySelector('.logo');
const url = 'https://api.tvmaze.com/shows';
const moviesList = document.querySelector('.movies-list');

const api = new Api(url);
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/e5ZZUp1Dru5ZzFGEqAeR/likes';
// console.log(involvementApiUrl);
const apiInv = new Api(involvementApiUrl);

const btnComments = document.querySelectorAll('.comments');
const popup = document.querySelector('.popup');
const close = document.querySelector('.closeBtn');

// Displaying 9 elements from the Api

window.addEventListener('DOMContentLoaded', async() => {
  const list = await api.getData(url);
  console.log(list);
  const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);
  console.log(involvementApiUrl);

  for (let i = 0; i < 15; i++) {
  
    // console.log(apiInvList[i]);
    const movieBox = document.createElement('div');
    movieBox.classList.add('col-3');
    movieBox.classList.add('movie-box');
    movieBox.innerHTML = `
      <div class="image-box">
      <img src="${list[i].image.medium}">
      </div>
      <div class="show-info">
        <h4>${list[i].name}</h4>
        <div>
        <i data-id="${list[i].id}" class="material-icons">favorite</i>
          <span class="likes-number">${apiInvList[i].likes}</span>
        </div>
      </div>
      <button id=${list[i].id} class="comments">Comments</button>
    `;
    // console.log(apiInvList[i].item_id);
  
    moviesList.appendChild(movieBox)
  }
})

const showPopup = async(i) => {
  i -= 1;
  const list = await api.getData(url);
  popup.innerHTML = `
    <div class="back"></div>
    <div class="content">
      <div class="closeBtn">x</div>
      <ul class="insidePopup">
      <li>
      <img src="${list[i].image.medium}">
      </li>
      <li>
      <h1>${list[i].name}</h1>
      <ul class="movieDescription">
        <li><strong>language:</strong> ${list[i].language}</li>
        <li><strong>rating:</strong> (average : ${list[i].rating.average})</li>
        <li><strong>genres:</strong> ${list[i].genres[0]}, ${list[i].genres[1]}</li>
        <li><strong>average run time:</strong> ${list[i].averageRuntime}</li>
      </ul>
      </li>
    </div>
  `;
};

moviesList.addEventListener('click', (e) => {



  if (e.target.classList.contains("comments")) {
  showPopup(e.target.id);

  popup.classList.remove('visible');
  };

  // Add likes to invApi
  if (e.target.classList.contains('material-icons')) {
      const likesNum = e.target.nextElementSibling;
      const itemID = `item${e.target.dataset.id}`;
      const getLikes = async () => {
      const list = await api.getData(url);
      const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);
      
      apiInvList.forEach(movie => {
        if(movie.item_id == itemID){
          likesNum.innerHTML = `${movie.likes + 1}`
        }
        
       
      });

    }
    const postLikes = () => {
      apiInv.postDataInvolvement(itemID);
    }
    getLikes();
    postLikes();
  }
});

popup.addEventListener('click', (e) => {
  if (e.target.classList.contains("closeBtn")) {
    popup.classList.add('visible');
  }
});

