import fetch from 'node-fetch';
import '../src/style.css';
import Api from './modules/Api';
import { postComment, getComment } from './modules/comment';
import allItemsCounter from './modules/allItemsCounter';

// Variables
// const logo = document.querySelector('.logo');
const url = 'https://api.tvmaze.com/shows';
const moviesList = document.querySelector('.movies-list');

const api = new Api(url);
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/udzCgymaPppgGj4gkx49/likes';
const apiInv = new Api(involvementApiUrl);
const popup = document.querySelector('.popup');
const moviesCount = document.querySelector('.movies-count');
// const apiInvList = apiInv.getDataInvolvement(involvementApiUrl);

// Displaying 9 elements from the Api

window.addEventListener('DOMContentLoaded', async () => {
  const list = await api.getData(url);

  const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);

  for (let i = 0; i < 12; i += 1) {
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
    moviesList.appendChild(movieBox);
  }
  moviesCount.innerHTML = `
    Movies(${allItemsCounter()})
  `;
});

const countComments = (arr) => (arr.length);

const display = async (i) => {
  const domComment = document.querySelector('.comments');
  domComment.innerHTML = '';
  const comments = await getComment(i);
  const h5 = document.createElement('h5');
  h5.innerHTML = `Comments (${countComments(comments)})`;
  domComment.appendChild(h5);
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
    domComment.appendChild(li);
  });
};

const showPopup = async (i) => {
  i -= 1;
  const list = await api.getData(url);
  popup.innerHTML = `
    <div class="back"></div>
    <div class="content">
      <div class="closeBtn">✖️</div>
      <ul class="insidePopup">
        <li class="image">
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
          <ul class="comments"></ul>
          <div class="addComments">
            <h5>Add a comment</h5>
            <form>
            <input class="inputName" type="text" id="name" name="name" placeholder="Your name"><br>
            <input class="inputComment" type="text" id="comment" name="comment" placeholder="Your insights"><br>
            <input class="submit" id=${list[i + 1].id} type="submit" value="Comment">
            </form>
          </div>
        </li>
      </ul>
    </div>
  `;
  display(i + 1);
};

moviesList.addEventListener('click', (e) => {
  if (e.target.classList.contains('comments')) {
    showPopup(e.target.id);

    popup.classList.remove('visible');
  }

  // Add likes to invApi
  if (e.target.classList.contains('material-icons')) {
    const likesNum = e.target.nextElementSibling;
    const itemID = `item${e.target.dataset.id}`;
    const getLikes = async () => {
      const apiInvList = await apiInv.getDataInvolvement(involvementApiUrl);

      apiInvList.forEach((movie) => {
        if (movie.item_id === itemID) {
          likesNum.innerHTML = `${movie.likes + 1}`;
        }
      });
    };
    const postLikes = () => {
      apiInv.postDataInvolvement(itemID);
    };
    getLikes();
    postLikes();
  }
});

popup.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('closeBtn')) {
    popup.classList.add('visible');
  }
  if (e.target.classList.contains('submit')) {
    const nameInput = document.querySelector('.inputName');
    const commentInput = document.querySelector('.inputComment');
    if (nameInput.value === '' || commentInput.value === '') {
      nameInput.placeholder = 'Please fill your name';
      commentInput.placeholder = 'Please fill your comment';
    } else {
      postComment(e.target.id - 1, nameInput.value, commentInput.value)
        .then(() => (getComment(e.target.id - 1)).then(() => display(e.target.id - 1)));
      nameInput.value = '';
      commentInput.value = '';
    }
  }
});
