export const divideByKeyword = (target: string, keyword: string) => {
  const preIdx = target.indexOf(keyword);
  const postIdx = preIdx + keyword.length;
  const prefix = target.slice(0, preIdx);
  const postfix = target.slice(postIdx);

  return [prefix, postfix];
};
