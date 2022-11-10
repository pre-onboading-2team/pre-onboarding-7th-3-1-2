/* eslint-disable arrow-parens */
const BASE_URL = 'http://localhost:4000/sick';

const keywordApi = keyword => {
  return fetch(`${BASE_URL}/?q=${keyword}`)
    .then(res => res.json())
    .then(data => {
      if (data) {
        localStorage.setItem('api', JSON.stringify(data));
      }
      console.info('calling api');
    });
};

export default keywordApi;
