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

  postDataInvolvement = async (invUrl, likes, like_id) => {
    await fetch(invUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ likes , like_id}),
    })
    .then((response) => response.json());
  };
}