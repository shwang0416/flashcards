"use server";

import supabase from "@/lib/supabase/supabase-ssr-client";

const getUserAction = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default getUserAction;
