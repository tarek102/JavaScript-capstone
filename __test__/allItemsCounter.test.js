import allItemsCounter from '../src/modules/allItemsCounter.js';

describe('Items counter test', () => {
  document.body.innerHTML = `
  <div class="row movies-list">
    <p>Under the Dome</p>
    <p>Person of Interest</p>
    <p>Bitten</p>
    <p>Arrow</p>
    <p>True Detective</p>
  </div>
  `;

  test('items number: ', () => {
    const moviesList = document.querySelector('.movies-list');
    allItemsCounter();
    expect(moviesList.children.length).toEqual(5);
  });
});