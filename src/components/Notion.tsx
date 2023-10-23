"use client";

import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);

export default function Notion({ data, pageId }: any) {
  return (
    <NotionRenderer
      disableHeader
      recordMap={data}
      fullPage={false}
      darkMode={false}
      rootPageId={pageId}
      components={{
        Collection,
        Code,
      }}
    />
  );
}
