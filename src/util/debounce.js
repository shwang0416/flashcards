export default function debounce(func, delay = 0, ...args) {
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => func.apply(this, ...args), delay);
  };
}
