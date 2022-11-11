const replaceWithBold = (word, sentence) => {
  return sentence.replaceAll(word, `<b>${word}</b>`);
};

export default replaceWithBold;
