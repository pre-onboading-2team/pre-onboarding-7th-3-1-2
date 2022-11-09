import BASE_URL from "./BASE_URL";

const getKeywords = (keyword) => {
  return fetch(`${BASE_URL}/?q=${keyword}`);
};

export default getKeywords;
