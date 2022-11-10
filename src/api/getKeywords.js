import BASE_URL from "./BASE_URL";

const getKeywords = async (keyword) => {
  const res = await fetch(`${BASE_URL}/?q=${keyword}`);
  const data = await res.json();
  return data;
};

export default getKeywords;
