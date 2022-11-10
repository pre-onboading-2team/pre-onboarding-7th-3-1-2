import BASE_URL from "./BASE_URL";

const getKeywords = async (keyword) => {
  const url = `${BASE_URL}/?q=${keyword}`;
  const cacheStorage = await caches.open("sick-data");
  const storedCache = await cacheStorage.match(url);

  try {
    if (storedCache) {
      const data = await storedCache.json();
      return data;
    }

    console.log("api 호출: ", keyword);
    const res = await fetch(url);

    await cacheStorage.put(url, res.clone());

    const data = await res.json();
    return data;
  } catch (e) {
    console.log("에러", e);
  }
};

export default getKeywords;
