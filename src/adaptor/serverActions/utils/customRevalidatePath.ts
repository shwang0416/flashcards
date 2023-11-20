"use server";

import { revalidatePath } from "next/cache";

const customRevalidatePath = (path: string) => {
  revalidatePath(path);
};

export default customRevalidatePath;
