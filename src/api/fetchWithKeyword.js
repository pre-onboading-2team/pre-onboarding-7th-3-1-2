import BASE_URL from "./BASE_URL";

const fetchWithKeyword = (keyword) => {
  return fetch(`${BASE_URL}/?q=${keyword}`);
};

export default fetchWithKeyword;
