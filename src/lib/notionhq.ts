import { Client } from "@notionhq/client";

const API_KEY = process.env.NOTION_KEY;
if (!API_KEY) throw new Error("NOTION_API_KEY is missing");

const notion = new Client({ auth: API_KEY });

export default notion;
