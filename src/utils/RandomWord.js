const RandomWord = () => {
  const words = ["sugar", "coffee", "milk", "lemonade", "juice"];
  return words[Math.floor(Math.random() * words.length)];
};
export default RandomWord;
