export default function debounce(func, delay = 0) {
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => func.apply(context, arguments), delay);
  };
}
