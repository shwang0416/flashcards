export default function debounce(func, delay = 0) {
  let timer = null;

  return function () {
    const args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
