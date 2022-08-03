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
    console.log(invResArray);
  }
}