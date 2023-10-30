"use server";

import { Pair } from "@/entity/Pair";
import notion from "@/lib/notionhq";

const getPairs = async (): Promise<Pair[]> => {
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  if (!DATABASE_ID) throw new Error("notion env is missing!!!");

  const query = (
    await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "ValidFrom",
        date: {
          on_or_after: new Date().toISOString(),
        },
      },
    })
  ).results;

  // FIXME: 노션 데이터베이스 타입스크립트 필드 지정 어떻게?
  const pairMapper = (results: any): Promise<Pair[]> => {
    return results.map((column: any) => {
      const { id, properties } = column;

      const title = properties.title.title[0].text.content;
      const TagSatisfactionStatus =
        properties.TagSatisfactionStatus.select.name;
      const playCount = properties.playCount.number;
      const cardIds = properties.cardIds.relation.map((data: any) => data.id);
      const tags = properties.tags.multi_select;

      return {
        id,
        title,
        TagSatisfactionStatus,
        playCount,
        cardIds,
        tags,
      };
    });
  };

  return pairMapper(query);
};

export default getPairs;
