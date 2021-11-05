import { nanoid } from "nanoid";
export function createShortURL(): string {
  return nanoid(7).toLowerCase();
}
