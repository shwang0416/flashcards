"use server";

import notion from "@/lib/notionhq";

const updateCardById = async (
  pageId: string,
  properties: any,
): Promise<any> => {
  const result = await notion.pages.update({ page_id: pageId, properties });

  return result;
};

export default updateCardById;
