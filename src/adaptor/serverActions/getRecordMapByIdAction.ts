"use server";

import notion from "@/lib/notion-client";

const getRecordMapById = async (id: string) => {
  return await notion.getPage(id);
};

export default getRecordMapById;