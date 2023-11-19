export default function timer(seconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // 3초 후에 Promise를 해결(resolve)
    }, seconds);
  });
}
