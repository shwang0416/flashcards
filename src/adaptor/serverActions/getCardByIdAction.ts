"use server";

import notion from "@/lib/notionhq";

const getCardById = async (pageId: string): Promise<any> => {
  return await notion.pages.retrieve({ page_id: pageId });
};

export default getCardById;
