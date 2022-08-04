import './style.css';
import Api from './modules/api';
import {postComment, getComment} from './modules/comment.js';

// Variables
const logo = document.querySelector('.logo');
const url = 'https://api.tvmaze.com/shows';
const moviesList = document.querySelector('.movies-list');

const api = new Api(url);
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QfxZoPPt8C2jqpp5GvRx/likes';
const apiInv = new Api(involvementApiUrl);
const popup = document.querySelector('.popup');
const apiInvList = apiInv.getDataInvolvement(involvementApiUrl);


// Displaying 9 elements from the Api

window.addEventListener('DOMContentLoaded', async() => {
  const list = await api.getData(url);

  for (let i = 0; i < 9; i++) {
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
          <span class="likes-number">5 likes</span>
        </div>
      </div>
      <button id=${list[i].id} class="comments">Comments</button>
    `;
    moviesList.appendChild(movieBox)
  }
})

const display = async(i) => {
  const domComment = document.querySelector('.comments');
  domComment.innerHTML = '';
  const comments = await getComment(i);
  const h5 = document.createElement('h5');
  h5.innerHTML =`Comments (${comments.length})`;
  domComment.appendChild(h5)
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
    domComment.appendChild(li)
  });

}

const showPopup = async(i) => {
  i -= 1;
  const list = await api.getData(url);
  popup.innerHTML = `
    <div class="back"></div>
    <div class="content">
      <div class="closeBtn">✖️</div>
      <ul class="insidePopup">
        <li>
          <img src="${list[i].image.medium}">
        </li>
        <li>
          <h1>${list[i].name}</h1>
          <ul class="movieDescription">
            <li>language: ${list[i].language}</li>
            <li>rating: (average : ${list[i].rating.average})</li>
            <li>genres: ${list[i].genres[0]}, ${list[i].genres[1]}</li>
            <li>average run time: ${list[i].averageRuntime}</li>
          </ul>
          <ul class="comments"></ul>
          <div class="addComments">
            <h5>Add a comment</h5>
            <form>
            <input class="inputName" type="text" id="name" name="name" placeholder="Your name"><br>
            <input class="inputComment" type="text" id="comment" name="comment" placeholder="Your insights"><br>
            <input class="submit" id=${list[i+1].id} type="submit" value="Comment">
            </form>
          </div>
        </li>
      </ul>
    </div>
  `;

  const domComment = document.querySelector('.comments');
  domComment.innerHTML = '';
  const comments = await getComment(i+1);
  const h5 = document.createElement('h5');
  h5.innerHTML =`Comments (${comments.length})`;
  domComment.appendChild(h5)
  comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
    domComment.appendChild(li)
  });

};

moviesList.addEventListener('click', (e) => {
if (e.target.classList.contains("comments")) {
  showPopup(e.target.id);
  popup.classList.remove('visible');
  };
});

popup.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains("closeBtn")) {
    popup.classList.add('visible');
  }
  if (e.target.classList.contains("submit")) {
    const nameInput = document.querySelector('.inputName');
    const commentInput = document.querySelector('.inputComment');
    if (nameInput.value === '' ||commentInput.value === ''){
      nameInput.placeholder = "Please fill your name";
      commentInput.placeholder = "Please fill your comment";
    }
    else {
      postComment(e.target.id-1, nameInput.value, commentInput.value);
      display(e.target.id-1);
      nameInput.value = '';
      commentInput.value = '';
    }
  }
});



