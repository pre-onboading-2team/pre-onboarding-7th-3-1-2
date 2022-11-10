const replaceWithBold = (word, sentence) => {
  return sentence.replace(word, `<b>${word}</b>`);
};

export default replaceWithBold;
