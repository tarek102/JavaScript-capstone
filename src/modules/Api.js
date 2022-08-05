export default class Api {
  constructor (url) {
    this.url = url;
  }

  getData = async(url) => {
    const response = await fetch (url, {
      method: 'GET',
    });
    const res = await response.json();
    const responseArr = await res;
    return responseArr;
  }

  getDataInvolvement = async(invUrl) => {
    const response = await fetch(invUrl, {
      method: 'GET',
    });
    const res = await response.json();
    const invResArray = await res;
    return invResArray;
  };

  postDataInvolvement = async (id) => {
   const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/udzCgymaPppgGj4gkx49/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({item_id: id}),
    });
    const post = await response.text();
    return post;
    
  };
}