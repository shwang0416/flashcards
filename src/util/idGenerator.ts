import { randomBase58 } from "./base58";

export function generateId(length: number): string {
  return `${randomBase58(length)}`;
}
