"use server";

import { Card } from "@/entity/Pair";
import notion from "@/lib/notionhq";

const getAllCards = async (): Promise<Card[]> => {
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  if (!DATABASE_ID) throw new Error("notion env is missing!!!");

  const query = (
    await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "ValidFrom",
        date: {
          on_or_before: new Date().toISOString(),
        },
      },
    })
  ).results;

  // FIXME: 노션 데이터베이스 타입스크립트 필드 지정 어떻게?
  const cardsMapper = (results: any): Promise<Card[]> => {
    return results.map((column: any) => {
      const { id, properties } = column;
      console.log(properties.Title);
      const playCount = properties.playCount?.number ?? 0;
      const tags = properties.Tags?.multi_select ?? [];
      const title = properties.Title.title[0].text.content;
      return {
        id,
        title,
        playCount,
        tags,
      };
    });
  };

  return cardsMapper(query);
};

export default getAllCards;
