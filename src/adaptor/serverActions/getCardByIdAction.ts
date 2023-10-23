import notion from "@/lib/notionhq";

const getCardById = async (pageId: string): Promise<any> => {
  // const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  // if (!DATABASE_ID) throw new Error("notion env is missing!!!");

  return await notion.pages.retrieve({ page_id: pageId });
  // console.log(JSON.stringify(query));
};

export default getCardById;
