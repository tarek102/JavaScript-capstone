import allItemsCounter from '../src/modules/allItemsCounter';

describe('Items counter test', () => {
  document.body.innerHTML = `
  <div class="row movies-list">
    <h2 class="movies-count"></h2>
  </div>
  `;

  test('items number: ', () => {
    const moviesList = document.querySelector('.movies-list');
    allItemsCounter();
    expect(moviesList.children.length).toEqual(9);
  });
});