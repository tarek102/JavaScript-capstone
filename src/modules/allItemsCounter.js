export default () => {
  const moviesList = document.querySelector('.movies-list');
  let listNum = 0;
  if (moviesList.children) {
    listNum = moviesList.children.length - 1;
  }
  return listNum;
};