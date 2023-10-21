"use server";

import notion from "@/lib/notion-client";

const getCardById = async (id: string) => {
  return await notion.getPage(id);
};

export default getCardById;
