export type Pair = {
  id: string;
  cardIds: CardId[];
  title: string;
  tags: Tag[];
  TagSatisfactionStatus?: "satisfiesAtLeastOneTag" | "satisfiesAllTags";
  playCount: number;
};

type Tag = {
  id: string;
  name: string;
  color: string;
};

type CardId = string;
