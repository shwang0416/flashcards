/**
 * array를 받아서 랜덤으로 섞어서 돌려줌
 * https://ko.javascript.info/task/shuffle
 */

const shuffleArray = (array: string[]) => {
  const newArray = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
};

export default shuffleArray;
