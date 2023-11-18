import { TagStatus } from "@/entity/Tag";
import { Card } from "../Card";

export const tagStatusToTags = (src: TagStatus) =>
  Object.keys(src).filter((tag) => !!src[tag]);

export const cardsToTags = (src: { tags: string[] }[]) => {
  const tagSet = src.reduce((acc, { tags }) => {
    if (tags && tags.length > 0) tags.forEach((t: string) => acc.add(t));
    return acc;
  }, new Set<string>());

  return [...tagSet];
};

export const filterCardsByTags = (cards: Card[], tags: string[]) =>
  cards.filter((card) =>
    tags.some(
      (tag) => card.tags && card.tags.length > 0 && card.tags.includes(tag),
    ),
  );

export const setAllTagStatus = (tags: string[], status: boolean): TagStatus =>
  tags.reduce((acc: TagStatus, tag: string) => {
    acc[tag] = status;
    return acc;
  }, {});
