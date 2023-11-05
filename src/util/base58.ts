export const charset =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

export function randomBase58(length: number): string {
  let result = "";
  for (let i = 0; i < length; ++i) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
