"use server";

import { createClient } from "@/lib/supabase/supabase-ssr-client";
import { cookies } from "next/headers";

const getUserAction = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default getUserAction;
